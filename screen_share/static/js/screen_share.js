"use strict";

let localVideo = document.querySelector("video#localVideo");
let remoteVideo = document.querySelector("video#remoteVideo");
let btnStartPush = document.querySelector("button#btnStartPush");
let btnStopPush = document.querySelector("button#btnStopPush");
let btnStartPull = document.querySelector("button#btnStartPull");
let btnStopPull = document.querySelector("button#btnStopPull");

let config = {};    //采用默认配置

let offerOptions = {
    offerToReceiveAudio: false,
    offerToReceiveVideo: false,
};

let pc1 = new RTCPeerConnection(config);    //本地
let pc2 = new RTCPeerConnection(config);    //远端

let remoteStream;

//************************获取屏幕共享视频流************************
//************************实现WebRTC推流************************

btnStartPush.addEventListener("click", StartPushScreenShare);

btnStartPull.addEventListener("click", StartPullScreenShare);

btnStopPush.addEventListener("click",StopPushScreenShare);

btnStopPull.addEventListener("click",StopPullScreenShare);


function StartPushScreenShare() {
    console.log("Start PUSH stream");

    //***************获取屏幕共享视频流的函数调用

    //先检查是否支持该方法

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        console.log("getDisplayMedia Failed!!!");
        return;
    }

    //设置约束
    let constraints = {
        video: true,
        audio: false,
    };

    navigator.mediaDevices.getDisplayMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
}

function handleError(err) {
    console.error("get screen stream failed:" + err);
}

function handleSuccess(stream) { //stream参数就是getDisplayMedia获取到的共享屏幕流
    console.log("get screen stream successful");

    localVideo.srcObject = stream;


    //当 ICE 连接状态发生变化时触发
    pc1.oniceconnectionstatechange = function (e) {
        onIceStateChange(pc1, e);
    };

    //当 ICE 候选项可用时触发
    pc1.onicecandidate = function (e) {
        onIceCandidate(pc1, e);
    };

    pc1.addStream(stream);

    pc1.createOffer(offerOptions)
        .then(
            onCreateOfferSuccess,   //成功时调用
            onCreateSessionDescriptionError     //出错时调用
        );
}

function getPC(pc) {
    return pc === pc1 ? "pc1" : "pc2";
}

function onIceStateChange(pc, e) {
    console.log(getPC(pc) + 'ice state change :' + pc.iceConnectionState);
}

function onIceCandidate(pc, e) {
    console.log(getPC(pc) + 'get new ice  Candidate:' +
        (e.candidate ? e.candidate.candidate : '(null)'));

    getOther(pc).addIceCandidate(e.candidate)
        .then(
            function () {
                console.log(getPC(getOther(pc)) + "add ice candidate success");
            }
        ),
        function(err){
            console.log(getPC(getOther(pc)) + "add ice candidate err:" + err.toString());
        }
}

function onCreateSessionDescriptionError(err) {
    console.error("create session description error: " + err.toString());
}

function onCreateOfferSuccess(desc) {
    console.log("offer from pc1 :\n" + desc.sdp);

    console.log("pc1 set local description start");
    pc1.setLocalDescription(desc)
        .then(
            function () {
                onSetLocalSuccess(pc1);
            },
            onSetSessionDescriptionError
        );

    //sdp交换
    pc2.oniceconnectionstatechange = function (e) {
        onIceStateChange(pc2, e);
    }


    pc2.onicecandidate = function (e) {
        onIceCandidate(pc2, e);
    }

    pc2.onaddstream= function (e) {
        console.log("pc2 receive stream ,stream_id:" + e.stream.id)
        remoteStream = e.stream;
    }


    pc2.setRemoteDescription(desc)
        .then(
            function () {
                onSetRemoteSuccess(pc2);
            },
            onSetSessionDescriptionError
        );
}

function onSetRemoteSuccess(pc) {
    console.log(getPC(pc) + "set remote success");
}

function onSetLocalSuccess(pc) {
    console.log(getPC(pc) + "set local success");
}

function onSetSessionDescriptionError(err) {
    console.error("set session description error: " + err.toString());
}


//************************实现WebRTC拉流************************

//因为没有实现信令服务器，就通过程序来实现交换


function StartPullScreenShare() {
    console.log("Start PULL stream");

    remoteVideo.srcObject = remoteStream;

    pc2.createAnswer().then(
        onCreateAnswerSuccess,
        onCreateSessionDescriptionError
    );
}

function onCreateAnswerSuccess(desc) {
    console.log("answer from pc2：\n" + desc.sdp);

    console.log("pc2 set local description start");
    pc2.setLocalDescription(desc)
        .then(
            function () {
                onSetLocalSuccess(pc2);
            },
            onSetSessionDescriptionError
        )

    //交换sdp

    pc1.setRemoteDescription(desc)
        .then(
            function (){
                onSetRemoteSuccess(pc1);
            },
            onSetSessionDescriptionError
        );
}

function getOther(pc){  //交换pc1和pc2
    return pc === pc1 ? pc2 : pc1;
}

function StopPushScreenShare() {
    console.log("pc1 stop push stream");

    if (pc1) {
        pc1.close();
        pc1 = null;
    }

    localVideo.srcObject = null;
}
function StopPullScreenShare() {
    console.log("pc2 stop pull stream");

    if (pc2) {
        pc2.close();
        pc2 = null;
    }

    remoteVideo.srcObject = null;
}












