package framework

import (
	"fmt"
	"net/http"
)

// init函数是模块framework被加载之前自动调用
func init() {
	http.HandleFunc("/", entry)
}

// ActionInterface 定义一个通用的处理方法
type ActionInterface interface {
	Execute(w http.ResponseWriter, R *http.Request)
}

var GActionRouter map[string]ActionInterface = make(map[string]ActionInterface)

func responseError(w http.ResponseWriter, R *http.Request, status int, err string) {
	w.WriteHeader(status)
	w.Write([]byte(
		fmt.Sprintf("%d - %s", status, err)))
}

func entry(w http.ResponseWriter, R *http.Request) {

	//排除图标
	if "/favicon.ico" == R.URL.Path {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(""))
		return
	}
	fmt.Println("====================", R.URL.Path)

	if action, ok := GActionRouter[R.URL.Path]; ok {
		if action != nil { //不为空执行回调函数
			action.Execute(w, R)
		} else {
			responseError(w, R, http.StatusInternalServerError, "Internal Server Error!")
		}
	} else {
		responseError(w, R, http.StatusInternalServerError, "Not Found!")
	}

}

func StartHttp() error {
	fmt.Print("start http\n")
	return http.ListenAndServe(":9090", nil) //成功之后就会阻塞在这里，监听9090端口
}
