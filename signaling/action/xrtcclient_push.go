package action

import (
	"fmt"
	"net/http"
)

type xrtcClientPushAction struct {
}

func (a *xrtcClientPushAction) Execute(w http.ResponseWriter, R *http.Request) {
	fmt.Println("hello xrtcClient push action")
}

func NewXrtcClientPushAction() *xrtcClientPushAction {
	return &xrtcClientPushAction{}
}
