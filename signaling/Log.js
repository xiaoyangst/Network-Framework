/**
 * 修改pino日志库默认配置，已实现符合自己的业务需求
 * DEBUG、INFO输出到一个文件，其余的WARNING、ERROR、FATAL输出到一个文件
 **/
const Conf = require("./Conf").logInfo;
const path = require("path");
const fs = require("fs");
const pino = require("pino");
const pretty = require("pino-pretty");

//配置pino日志库

const streams = [
    {stream: fs.createWriteStream(path.join(Conf.Path,'info.log'))},
    {stream: pretty({       //控制台输出美化
            colorize: true,
            customColors: 'err:red,info:green',
            customPrettifiers: {    //输出格式化
                pid: pid => `PID: ${pid}`,
                level: logLevel => `LEVEL: ${logLevel}`,
                time: timestamp => `🕰 ${timestamp}`,
            }
        })},
    {level: "debug", stream: fs.createWriteStream(path.join(Conf.Path,'info.log'))},
    {level: "warn", stream: fs.createWriteStream(path.join(Conf.Path,'warn.log'))},
    {level: "error", stream: fs.createWriteStream(path.join(Conf.Path,'warn.log'))},
    {level: "fatal", stream: fs.createWriteStream(path.join(Conf.Path,'warn.log'))},
];

const logger = pino(
    {
        level: Conf.MinLevel.toString(), // 只要等级低于此就不会被记录

        formatters: {        //打印级别时不为数字，而是标签
            level: (label) => {
                return {
                    level: label,
                }
            }
        }
    },
    pino.multistream(streams),
);



//封装日志打印函数

class ComLog{
    constructor() {
        this.mainLog = [];
        this.timeLog = [];
    }

    addNotice(key, value) {
        const item = {
            key: key,
            value: value,
        };

        this.mainLog.push(item);
    }

    timeBegin(key) {
        const item = {
            key: key,
            beginTime: Date.now(),
            endTime: 0,
        };

        this.timeLog.push(item);
    }

    timeEnd(key) {
        for (let i = 0; i < this.timeLog.length; i++) {
            const item = this.timeLog[i];
            if (item.key === key) {
                this.timeLog[i].endTime = Date.now();
                break;
            }
        }
    }

    getPrefixLog() {
        let prefixLog = "";

        // mainLog
        this.mainLog.forEach(item => {
            prefixLog += `${item.key}[${item.value}] `;
        });

        // timeLog
        this.timeLog.forEach(timeItem => {
            const diff = timeItem.endTime - timeItem.beginTime;
            if (diff < 0) {
                return;
            }

            const fdiff = diff / 1000.0;
            prefixLog += `${timeItem.key}[${fdiff.toFixed(3)}ms] `;
        });

        return prefixLog;
    }

    Infof(log){
        logger.info(this.getPrefixLog() + log);
    }
    Debugf(log){
        logger.debug(this.getPrefixLog() + log);
    }
    Warningf(log){
        logger.warn(this.getPrefixLog() + log);
    }
}

module.exports.logger = logger;
module.exports.ComLog = ComLog;