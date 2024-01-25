"use strict";

let start_stream = document.querySelector('button#start_stream');
let stop_stream = document.querySelector('button#stop_stream');
let start_share = document.querySelector('button#start_share');
let stop_share = document.querySelector('button#stop_share');
let stream_video = document.querySelector('video#stream_video');
let share_video = document.querySelector('video#share_video');
let stream_audio = document.querySelector('audio#stream_audio');
let share_audio = document.querySelector('audio#share_audio');

let localStream;    //保存获取的本地流，停止推流的时候需要
let remoteStream;   //保存获取的远端流，停止拉流的时候需要

let localPc = new RTCPeerConnection();  //本地PC
let remotePc = new RTCPeerConnection();  //远端PC

start_stream.addEventListener('click',startStream)
stop_stream.addEventListener('click',stopStream)
start_share.addEventListener('click',startShare)
stop_share.addEventListener('click',stopShare)

//本地媒体协商信息的 Offer
const localOfferOptions = {
    offerToReceiveAudio: false,
    offerToReceiveVideo: true
};

//推流
function startStream() {
    console.log("function getScreen() run");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia){
        console.log("getDisplayMedia is not support!");
    }else{
        //配置约束
        const constraints = {
            video: true,
            audio: false,
        };
        navigator.mediaDevices.getDisplayMedia(constraints) //获取屏幕
            .then(handleSuccess)
            .catch(handleError)
    }
}

function handleSuccess(stream) {
    console.log("function handleSuccess() run");
    //屏幕共享流呈现到网页端
    stream_video.srcObject = stream;
    localStream = stream;

    // ICE 连接状态发生变化时，会触发 oniceconnectionstatechange 事件
    // 你可以为这个事件设置一个处理函数来处理连接状态的变化
    localPc.oniceconnectionstatechange = function (e) {
        onIceStateChange(localPc, e);
    }
    // 用于监听 ICE 候选项的生成
    // 在 WebRTC 中，ICE 候选项是用于建立对等连接的网络地址信息，通过这些候选项，两个端点能够找到对方并建立连接
    localPc.onicecandidate = function (e) {
        onIceCandidate(localPc, e);
    }

    //屏幕共享流加入到本地主机
    localPc.addStream(stream);

    //创建一个包含本地媒体协商信息的 Offer
    localPc.createOffer(localOfferOptions)
        .then(onCreateOfferSuccess)
        .catch(onCreateSessionDescriptionError)
}

function onCreateOfferSuccess(desc){
    console.log("create offer success");

    console.log("offer from localPc: \n"+ desc.sdp);

    console.log("localPc set local desc start")
    //设置LocalDescription
    localPc.setLocalDescription(desc)
        .then(onSetLocalSuccess)
        .catch(onSetSessionDescriptionError)

    //交换SDP
    remotePc.oniceconnectionstatechange = function (e) {
        onIceStateChange(remotePc,e);
    }

    remotePc.onicecandidate = function (e) {
        onIceCandidate(remotePc,e);
    }

    remotePc.onaddstream = function (e) {
        console.log('remotePc receive stream, stream_id: ' + e.stream.id);
        remoteStream = e.stream;
    }

    remotePc.setRemoteDescription(desc)
        .then(onSetRemoteSuccess)
        .catch(onSetSessionDescriptionError)
}

function onSetLocalSuccess(pc) {
    console.log(getPc(pc) + 'set local success');
}

function onSetRemoteSuccess(pc) {
    console.log(getPc(pc) + ' set local success');
}

function onCreateSessionDescriptionError(err){
    console.log("create Session Description error = " + err.message);
}

function onSetSessionDescriptionError(err) {
    console.log('set session description error: ' + err.toString());
}

function handleError(err) {
    console.log("getMediaStream error = " + err.message);
}

function onIceStateChange(pc, e) {
    console.log(getPc(pc) + ' ice state change: ' + pc.iceConnectionState);
}

function onIceCandidate(pc, e) {
    console.log(getPc(pc) + ' get new ice candidate: ' +
        (e.candidate ? e.candidate.candidate : '(null)'));

    getOtherPc(pc).addIceCandidate(e.candidate).then(
        function() {
            console.log(getPc(getOtherPc(pc)) + ' add ice candidate success');
        },
        function(err) {
            console.log(getPc(getOtherPc(pc)) + ' add ice candidate error: ' + err.toString());
        }
    );
}

//停止推流
function stopStream() {
    console.log("function stopStream() run");
    if (localPc){
        localPc.close();
        localPc = null;
    }
    if (localStream) {
        const tracks = localStream.getTracks();
        tracks.forEach(track => track.stop());
        localStream.srcObject = null;
    }

    //当你关闭共享的视频流时，你需要停止所有相关的流轨道（tracks）并将 srcObject 设置为 null
}

//拉流
function startShare(stream) {
    console.log("function startShare() run");
    share_video.srcObject = remoteStream;

    remotePc.createAnswer()
        .then(onCreateAnswerSuccess)
        .catch(onCreateSessionDescriptionError)
}

function onCreateAnswerSuccess(desc){
    console.log('answer from remotePc: \n' + desc.sdp);

    console.log('remotePc set local description start');

    remotePc.setLocalDescription(desc)
        .then(onSetLocalSuccess)
        .catch(onSetSessionDescriptionError)

    localPc.setRemoteDescription(desc)
        .then(onSetRemoteSuccess)
        .catch(onSetSessionDescriptionError)
}

//停止拉流
function stopShare() {
    console.log("function stopShare() run");
    if (remotePc){
        remotePc.close();
        remotePc = null;
    }
    if (remoteStream) {
        const tracks = remoteStream.getTracks();
        tracks.forEach(track => track.stop());
        remoteStream.srcObject = null;
    }
}


function getPc(pc){
    return pc === localPc ? 'localPc' : 'remotePc';
}

function getOtherPc(pc){
    return pc === localPc ? remotePc : localPc;
}