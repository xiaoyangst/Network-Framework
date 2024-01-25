// 添加点击事件监听器
const pushBtn = document.querySelector('button#start_stream');
pushBtn.addEventListener("click", startPush);

// 处理推流操作
function startPush() {
    // 获取参数值
    const uid = $("#uid").val();
    const streamName = $("#streamName").val();
    const audio = $("#audio").val();
    const video = $("#video").val();

    console.log("send push: /signaling/push");

    // 发送推流请求给到信令服务器
    $.post("/signaling/push", {
        "uid": uid,
        "streamName": streamName,
        "audio": audio,
        "video": video
    }, function(data, textStatus) {     //该回调函数处理返回结果（json格式）
        console.log("push response: " + JSON.stringify(data));

        // 根据响应结果更新页面提示信息
        if ("success" === textStatus && 0 === data.errNo) {
            console.log("测试xy");
            $("#tips1").html("<font color='blue'>推流请求成功!</font>");
        } else {
            $("#tips1").html("<font color='red'>推流请求失败!</font>");
        }
    }, "json");
}
