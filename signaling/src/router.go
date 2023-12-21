package main

import (
	"signaling/action"
	"signaling/src/framework"
)

func init() {
	framework.GActionRouter["/xrtcclient/push"] = action.NewXrtcClientPushAction()
}
