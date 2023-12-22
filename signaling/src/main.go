package main

import (
	"flag"
	"signaling/glog"
	"signaling/src/framework"
)

func main() {

	flag.Parse()

	err := framework.Init()
	if err != nil {
		panic(err)
	}

	glog.Info("hello,world")

	err = framework.StartHttp()
	if err != nil {
		panic(err)
	}
}
