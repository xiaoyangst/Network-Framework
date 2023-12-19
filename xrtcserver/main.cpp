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
  printf("初始化XrtcLog构造函数\n");

  int ret = g_log->init();
  printf("调用g_log->init\n");

  if (ret != 0){
    fprintf(stderr,"init log failed\n");
    return -1;
  }

  return 0;
}


int main() {

  const char* filename = "./conf/xy.yaml";
  int ret = init_general_conf(filename);
  if (ret != 0) return -1;

  ret = init_log(g_conf->log_dir,g_conf->log_name,g_conf->log_level);
  if (ret != 0) return -1;

  RTC_LOG(LS_VERBOSE)<<"hello world";

  printf("main over\n");


  return 0;
}

