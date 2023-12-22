package framework

import "signaling/glog"

func Init() error {
	glog.SetLogDir("./log")
	glog.SetLogFileName("signaling")
	glog.SetLogToStderr(true)
	glog.SetLogLevel("DEBUG")
	return nil
}
