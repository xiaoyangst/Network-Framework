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
    _log_file_wf(log_dir + "/" + log_name + ".log.wf"){

}

//该方法不对外提供，只供该类
//作用：获取当前日志级别
static rtc::LoggingSeverity get_log_severity(const std::string& level){
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
  rtc::LogMessage::AddLogToStream(this, rtc::LS_VERBOSE);
//  rtc::LogMessage::ConfigureLogging("thread tstamp");
//  rtc::LogMessage::SetLogPathPrefix("/src");
//  rtc::LogMessage::AddLogToStream(this, get_log_severity(_log_level));

  return 0;
}
void XrtcLog::OnLogMessage(const std::string &message, rtc::LoggingSeverity severity) {
  LogSink::OnLogMessage(message, severity);
}
void XrtcLog::OnLogMessage(const std::string &message) {
  std::cout<<message<<std::endl;
}
XrtcLog::~XrtcLog() {
  std::cout<<"析构"<<std::endl;
}

}