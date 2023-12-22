package action

import (
	"fmt"
	"net/http"
	"signaling/src/framework"
)

type xrtcClientPushAction struct {
}

func (a *xrtcClientPushAction) Execute(w http.ResponseWriter, cr *framework.ComRequest) {
	fmt.Println("hello xrtcClient push action")
}

func NewXrtcClientPushAction() *xrtcClientPushAction {
	return &xrtcClientPushAction{}
}
