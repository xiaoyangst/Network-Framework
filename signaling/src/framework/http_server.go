package framework

//轻量级http服务框架实现

import (
	"fmt"
	"net/http"
	"signaling/src/glog"
	"strconv"
)

// init函数是模块framework被加载之前自动调用
func init() {
	http.HandleFunc("/", entry)
}

// ActionInterface 接口
type ActionInterface interface {
	Execute(w http.ResponseWriter, cr *ComRequest) //使用该接口者可以实现该方法
}

// 全局变量，使用var声明
var GActionRouter map[string]ActionInterface = make(map[string]ActionInterface)

type ComRequest struct {
	R      *http.Request
	Logger *ComLog
	LogId  uint32
}

func responseError(w http.ResponseWriter, R *http.Request, status int, err string) {
	w.WriteHeader(status) //设置响应状态码
	w.Write([]byte(       //向客户端写入响应数据
		fmt.Sprintf("%d - %s", status, err)))
}

// 用于获取客户端真实的 IP 地址
func getRealClientIP(r *http.Request) string {
	ip := r.RemoteAddr

	if rip := r.Header.Get("X-Real-IP"); rip != "" {
		ip = rip
	} else if rip = r.Header.Get("X-Forwarded-IP"); rip != "" {
		ip = rip
	}

	return ip
}

func entry(w http.ResponseWriter, r *http.Request) {

	//排除图标
	if "/favicon.ico" == r.URL.Path {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(""))
		return
	}
	fmt.Println("====================", r.URL.Path)

	if action, ok := GActionRouter[r.URL.Path]; ok {
		if action != nil { //不为空执行回调函数

			//初始化ComRequest
			cr := &ComRequest{
				R:      r,
				Logger: &ComLog{},
				LogId:  GetLogId32(),
			}

			cr.Logger.AddNotice("logId", strconv.Itoa(int(cr.LogId)))
			cr.Logger.AddNotice("url", r.URL.Path)
			cr.Logger.AddNotice("referer", r.Header.Get("Referer"))
			cr.Logger.AddNotice("cookie", r.Header.Get("Cookie"))
			cr.Logger.AddNotice("ua", r.Header.Get("User-Agent"))
			cr.Logger.AddNotice("clientIP", r.RemoteAddr)
			cr.Logger.AddNotice("realClientIP", getRealClientIP(r))

			r.ParseForm() //解析HTTP请求的表单数据

			//获取请求参数（从表单中获取）到log中
			for k, v := range r.Form {
				cr.Logger.AddNotice(k, v[0])
			}

			//计算执行某个函数花费的时间
			cr.Logger.TimeBegin("totalCost")
			action.Execute(w, cr)
			cr.Logger.TimeEnd("totalCost")

			cr.Logger.Infof("")
		} else {
			responseError(w, r, http.StatusInternalServerError, "Internal Server Error!")
		}
	} else {
		responseError(w, r, http.StatusInternalServerError, "Not Found!")
	}

}

func RegisterStaticUrl() {
	fs := http.FileServer(http.Dir(gconf.httpStaticDir))
	http.Handle(gconf.httpStaticPrefix, http.StripPrefix(gconf.httpStaticPrefix, fs))
}

func StartHttp() error {
	glog.Infof("start http server on port:%d", gconf.httpPort)
	return http.ListenAndServe(fmt.Sprintf(":%d", gconf.httpPort), nil)
}

func StartHttps() error {
	glog.Infof("start https server on port:%d", gconf.httpsPort)
	return http.ListenAndServeTLS(fmt.Sprintf(":%d", gconf.httpsPort),
		gconf.httpsCert, gconf.httpsKey, nil)
}
