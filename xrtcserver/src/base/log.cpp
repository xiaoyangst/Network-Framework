//
// Created by xy on 2023-12-18.
//

#include "log.h"
#include <iostream>

#include <sys/stat.h>

namespace xrtc {

XrtcLog::XrtcLog(const std::string &log_dir,
                 const std::string &log_name,
                 const std::string &log_level) :
    _log_dir(log_dir),
    _log_name(log_name),
    _log_level(log_level),
    _log_file(log_dir + "/" + log_name + ".log"),
    _log_file_wf(log_dir + "/" + log_name + ".log.wf") {

}

//该方法不对外提供，只供该类
//作用：获取当前日志级别
static rtc::LoggingSeverity get_log_severity(const std::string &level) {
  if ("verbose" == level) {
    return rtc::LS_VERBOSE;
  } else if ("info" == level) {
    return rtc::LS_INFO;
  } else if ("warning" == level) {
    return rtc::LS_WARNING;
  } else if ("error" == level) {
    return rtc::LS_ERROR;
  } else if ("none" == level) {
    return rtc::LS_NONE;
  }

  return rtc::LS_NONE;
}

int XrtcLog::init() {
  rtc::LogMessage::ConfigureLogging("thread tstamp");
  rtc::LogMessage::SetLogPathPrefix("/src");
  rtc::LogMessage::AddLogToStream(this, get_log_severity(_log_level));

  //创建文件夹
  int ret = mkdir(_log_dir.c_str(), 0755);
  if (ret != 0 && errno != EEXIST) {
    fprintf(stderr, "create log_dir[%s] failed\n", _log_dir.c_str());
    return -1;
  }

  //判断打开文件流是否成功
  _out_file.open(_log_file, std::ios::app);
  if (!_out_file.is_open()) {
    fprintf(stderr, "open log_file[%s] failed\n", _log_file.c_str());
    return -1;
  }

  _out_file_wf.open(_log_file_wf, std::ios::app);
  if (!_out_file_wf.is_open()) {
    fprintf(stderr, "open log_file[%s] failed\n", _log_file_wf.c_str());
    return -1;
  }

  return 0;
}
void XrtcLog::OnLogMessage(const std::string &message, rtc::LoggingSeverity severity) {
  if (severity >= rtc::LS_WARNING){
    std::unique_lock<std::mutex> lock(_mtx_wf);
    _log_queue_wf.push(message);
  }else{
    std::unique_lock<std::mutex> lock(_mtx);
    _log_queue.push(message);
  }
}
void XrtcLog::OnLogMessage(const std::string & /*message*/) {

}

XrtcLog::~XrtcLog() {
  stop();

  _out_file.close();
  _out_file_wf.close();
}

//可以设置是否启用日志输出到终端
void XrtcLog::set_log_to_stderr(bool on) {
  rtc::LogMessage::SetLogToStderr(on);
}
bool XrtcLog::start() {
  if (_running) {  //日志系统已经启动，无需重复启动，直接返回
    fprintf(stderr, "log thread already running\n");
    return false;
  }

  //开始启动日志系统
  _running = true;

  _thread = new std::thread([=]() {
    struct stat stat_data;  //stat_data存储文件的状态信息

    std::stringstream ss;

    while (_running) {
      //检查日志文件是否被删除或者移动
      if (stat(_log_file.c_str(), &stat_data)) {
        _out_file.close();
        _out_file.open(_log_file, std::ios::app);
      }

      if (stat(_log_file_wf.c_str(), &stat_data)) {
        _out_file_wf.close();
        _out_file_wf.open(_log_file_wf, std::ios::app);
      }

      //一系列安全检查之后，考虑写入日志到队列中
      //利用作用域保证写入日志的时候是安全的
      bool write_log = false;
      {
        std::unique_lock<std::mutex> lock(_mtx);
        if (!_log_queue.empty()) {
          write_log = true;
          while (!_log_queue.empty()) {
            ss << _log_queue.front();
            _log_queue.pop(); //写入之后就把日志逐步移除
          }
        }

      }

      if (write_log){
        _out_file << ss.str();
        _out_file.flush();
      }

      ss.str("");

      bool write_log_wf = false;
      {
        std::unique_lock<std::mutex> lock(_mtx_wf);
        if (!_log_queue_wf.empty()) {
          write_log_wf = true;
          while (!_log_queue_wf.empty()) {
            ss << _log_queue_wf.front();
            _log_queue_wf.pop(); //写入之后就把日志逐步移除
          }
        }

      }

      if (write_log_wf){
        _out_file_wf << ss.str();
        _out_file_wf.flush();
      }

      ss.str("");

      //如果不断循环的话，会占用很多CPU资源，设置一个时间会好很多

      std::this_thread::sleep_for(std::chrono::milliseconds(30));
    }

  });

  return true;
}
void XrtcLog::stop() {
  _running = false;

  if (_thread){
    if (_thread->joinable()){
      _thread->join();  //等待线程执行完毕
    }
    delete _thread;
    _thread = nullptr;
  }
}
void XrtcLog::join() {
  if (_thread && _thread->joinable()){
    _thread->join();
  }
}

}