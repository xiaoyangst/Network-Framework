"use strict";

let initHttpAndHttps = require('./WebServer');

let logger = require('./Log').logger;

function initWebServer() {
    initHttpAndHttps.startHttp();
    initHttpAndHttps.startHttps();
}

function onRouter() {
    require('./Router');
}

//运行HTTP、HTTPS
initWebServer()
//处理路由请求
onRouter()