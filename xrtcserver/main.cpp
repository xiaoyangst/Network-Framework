#include <iostream>
#include <string>
#include <fstream>
#include "yaml-cpp/yaml.h"
#include "src/base/conf.h"

using namespace std;
using namespace YAML;
using namespace xrtc;

int main() {

  const char* filename = "./conf/xy.yaml";

  xrtc::GeneralConf* g_conf = new xrtc::GeneralConf();

  int ret = load_general_conf(filename,g_conf);
  if (ret != 0) {
    fprintf(stderr, "load %s config file failed\n", filename);
    return -1;
  }
  return 0;
}

