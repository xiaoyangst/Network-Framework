#include <iostream>
#include <string>
#include <fstream>
#include "yaml-cpp/yaml.h"
#include "src/base/conf.h"
#include "src/base/log.h"


xrtc::GeneralConf* g_conf = nullptr;
xrtc::XrtcLog* g_log = nullptr;
//xrtc::SignalingServer* g_signaling_server = nullptr;
//xrtc::RtcServer* g_rtc_server = nullptr;

using namespace std;


int init_general_conf(const char* filename){
  if (!filename){
    fprintf(stderr, "filename is nullptr\n");
    return -1;
  }

  g_conf = new xrtc::GeneralConf();

  int ret = load_general_conf(filename,g_conf);
  if (ret != 0) {
    fprintf(stderr, "load %s config file failed\n", filename);
    return -1;
  }
  return 0;
}

int init_log(const std::string& log_dir, const std::string& log_name,
             const std::string& log_level){
  g_log = new xrtc::XrtcLog(log_dir,log_name,log_level);


  int ret = g_log->init();

  if (ret != 0){
    fprintf(stderr,"init log failed\n");
    return -1;
  }

  //初始化没有问题，就代表文件打开流正常，可以正常启用日志系统

  g_log->start();

  return 0;
}



int main() {

  const char* filename = "./conf/xy.yaml";
  int ret = init_general_conf(filename);
  if (ret != 0) return -1;

  ret = init_log(g_conf->log_dir,g_conf->log_name,g_conf->log_level);
  if (ret != 0) return -1;

  g_log->set_log_to_stderr(g_conf->log_to_stderr);

  RTC_LOG(LS_VERBOSE)<<"hello world";
  RTC_LOG(LS_WARNING)<<"Warning test";

  g_log->join();  //日志系统内部调用着死循环，你必须让他join，否则主程序提前结束导致日志系统无法正常运行

  return 0;
}

