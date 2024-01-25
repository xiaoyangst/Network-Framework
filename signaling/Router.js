/**
 * 添加路由并添加回调函数
 **/

let app = require('./WebServer').app;
let path = require('path')
let express = require('express');
require("./Log");
let errors = require("./Error");
let base = require("./Base");
let hbs = require("hbs");
const crypto = require('crypto');
const {logger, ComLog} = require("./Log");
app.use(express.urlencoded({ extended: true }));

//0-----初始化操作

app.set('view engine','html');          // 指定模板文件的后缀名为html
app.engine('html',hbs.__express);   // 运行hbs模块

const screenSharePath = path.join(__dirname, '..', 'ScreenShare', 'static');       //设置静态文件的绝对路径，保证访问到资源

app.set('views',screenSharePath);       //设置模板文件的绝对路径，保证能正确渲染

app.use('/screenshare', express.static(screenSharePath));   // 将 ScreenShare 文件夹下的内容作为静态资源提供


function getRealClientIP(req) {
    let ip = req.ip;

    const rip = req.get("X-Real-IP");
    if (rip) {
        ip = rip;
    } else {
        const forwardedIP = req.get("X-Forwarded-For");
        if (forwardedIP) {
            // X-Forwarded-For 可能包含多个 IP，第一个是原始客户端 IP
            ip = forwardedIP.split(",")[0];
        }
    }

    return ip;
}
function AddComLog(req) {
    const comlog = new ComLog();
    comlog.addNotice("logId",crypto.randomBytes(16).toString('hex'));
    comlog.addNotice("url",req.url);
    comlog.addNotice("referer",req.get("referer"));
    comlog.addNotice("cookie",req.get("cookie"));
    comlog.addNotice("User-Agent",req.get("User-Agent"));
    comlog.addNotice("clientIP",req.ip);
    comlog.addNotice("realClientIP",getRealClientIP(req));

    comlog.Infof(comlog);

}

//1-----添加路由

app.post('/signaling/push',Spush);      //信令服务器处理推流请求

app.get('/xrtcclient/push',Xpush);          //客户端推流



//2-----设置回调函数

function Spush(req,res) {
    AddComLog(req);
    //解析用户传递的请求参数
    //请求参数合理之后再返回相应的信息给请求的客户端
    // 获取 POST 请求的参数
    const uid = req.body.uid;

    if (uid == null || uid <= 0){
        const e1 = errors.NewErrors(errors.ParamErr,"parse uid error : " + Error);
        base.writeJsonErrorResponse(e1,res);
        return;
    }

    const streamName = req.body.streamName;

    if (streamName == null || streamName === ""){
        const e1 = errors.NewErrors(errors.ParamErr,"streamName is null");
        base.writeJsonErrorResponse(e1,res);
        return;
    }
    var audio = req.body.audio;
    if (audio == null || audio === "" || audio === 0){
        audio = 0;
    }else{
        audio = 1;
    }

    var video = req.body.video;

    if (video == null || video === "" || video === 0){
        video = 0;
    }else{
        video = 1;
    }

    let xrtcPushReq = {
        Cmdno:      base.CMDNO_PUSH,
        Uid:        uid,
        StreamName: streamName,
        Audio:      audio,
        Video:      video,
    }

    res.send(xrtcPushReq);

}

function Xpush(req, res) {
    AddComLog(req);

    //渲染HTML
    res.render('index',{
        uid : req.query.uid,
        streamName : req.query.streamName,
        audio : req.query.audio,
        video : req.query.video
    })
}
