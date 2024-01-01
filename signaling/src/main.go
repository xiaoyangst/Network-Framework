package main

import (
	"flag"
	"signaling/src/framework"
)

func main() {

	flag.Parse()

	err := framework.Init("./conf/framework.conf")
	if err != nil {
		panic(err)
	}

	// 静态资源处理 /static
	framework.RegisterStaticUrl()

	//启动http server    异步执行，不阻塞main函数的执行
	go startHttp()

	//启动https server	前面http server异步执行，这样https server就可以与它同时执行启动（并发运行）
	startHttps()

}

func startHttp() {
	err := framework.StartHttp()
	if err != nil {
		panic(err)
	}
}

func startHttps() {
	err := framework.StartHttps()
	if err != nil {
		panic(err)
	}
}
