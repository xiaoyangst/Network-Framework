let fs = require('fs');
let express = require('express');
let path = require('path');
let https = require('https');
let conf = require('./Conf').webInfo;

//初始化配置信息
let app = express();
let HttpPort = conf.HttpPort;
let HttpsPort = conf.HttpsPort;
let options = {
    key: fs.readFileSync(conf.HttpsKey,"utf-8"),
    cert: fs.readFileSync(conf.HttpsCERT,"utf-8")
};

function initHttp() {
    app.listen(HttpPort, () => {
        console.log('HTTP 服务器运行在端口 ' + HttpPort);

    });
}

function initHttps() {
    let HttpsServer = https.createServer(options, app);
    HttpsServer.listen(HttpsPort, () => {
        console.log('HTTPS 服务器运行在端口 ' + HttpsPort);
    });
}

module.exports.startHttp = initHttp;
module.exports.startHttps = initHttps;
module.exports.app = app;