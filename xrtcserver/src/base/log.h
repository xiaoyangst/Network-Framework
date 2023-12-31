
//
// Created by xy on 2023-12-18.
//

#ifndef NETWORK_FRAMEWORK_XRTCSERVER_SRC_BASE_LOG_H_
#define NETWORK_FRAMEWORK_XRTCSERVER_SRC_BASE_LOG_H_

#include <fstream>
#include <queue>
#include <mutex>
#include <thread>

#include <rtc_base/logging.h>

namespace xrtc {

class XrtcLog : public rtc::LogSink {
 public:
  XrtcLog(const std::string& log_dir,
          const std::string& log_name,
          const std::string& log_level);
  ~XrtcLog() override;

  int init();
  void set_log_to_stderr(bool on);

  //日志系统的启动和停止
  bool start();
  void stop();
  void join();

  void OnLogMessage(const std::string& message, rtc::LoggingSeverity severity) override;
  void OnLogMessage(const std::string& message) override;

 private:
  std::string _log_dir;
  std::string _log_name;
  std::string _log_level;
  std::string _log_file;
  std::string _log_file_wf;


  std::ofstream _out_file;
  std::ofstream _out_file_wf;

  std::queue<std::string> _log_queue;
  std::mutex _mtx;

  std::queue<std::string> _log_queue_wf;
  std::mutex _mtx_wf;

  std::thread* _thread = nullptr;
  std::atomic<bool> _running{false};  //监测日志系统运行状态
};

} // namespace xrtc

#endif //NETWORK_FRAMEWORK_XRTCSERVER_SRC_BASE_LOG_H_
