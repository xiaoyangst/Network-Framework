#include "conf.h"
#include "yaml-cpp/yaml.h"
#include <iostream>

using namespace YAML;
namespace xrtc{

int load_general_conf(const char* filename,GeneralConf* conf){
  //先检查参数的合法性
  if (!filename || !conf){
    std::cout<<"filename or conf is nullptr\n"<<std::endl;
    return -1;
  }

  //初始化传进来的结构体参数
  conf->log_dir = "./log";
  conf->log_name = "undefined";
  conf->log_level = "info";
  conf->log_to_stderr = false;

  //读取Yaml配置文件
  Node config = LoadFile(filename);

  try { //yaml-cpp的读取需要try-catch收集异常，避免访问方式的不正确出现错误
    conf->log_dir = config["log"]["log_dir"].as<std::string>();
    conf->log_name = config["log"]["log_name"].as<std::string>();
    conf->log_level = config["log"]["log_level"].as<std::string>();
    conf->log_to_stderr = config["log"]["log_to_stderr"].as<bool>();
  }catch (YAML::Exception& e){
    fprintf(stderr, "catch a YAML::Exception, line: %d, column: %d"
                    ", error:%s\n", e.mark.line + 1, e.mark.column + 1, e.msg.c_str());
    return -1;
  }
  return 0;
}

}//namespace xrtc