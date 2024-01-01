package framework

import (
	"signaling/src/glog"
)

var gconf *FrameworkConf

func Init(confFile string) error {

	var err error

	gconf, err = loadConf(confFile)

	if err != nil {
		return err
	}

	glog.SetLogDir(gconf.logDir)
	glog.SetLogFileName(gconf.logFile)
	glog.SetLogToStderr(gconf.logToStderr)
	glog.SetLogLevel(gconf.logLevel)
	return nil
}
