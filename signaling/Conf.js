/**
 * 解析json文件格式的配置文件
 * 每个具体的配置用相应的结构体存储
 **/

let fs = require("fs");


let webInfo;
let logInfo;

try {

    let Conf = JSON.parse(fs.readFileSync("conf/WebServer.json", "utf-8"));

    //WebServer解析
    webInfo = {
        HttpPort : Conf.WebServer.HTTP.PORT,
        HttpsPort : Conf.WebServer.HTTPS.PORT,
        HttpsKey : Conf.WebServer.HTTPS.KEY,
        HttpsCERT : Conf.WebServer.HTTPS.CERT,
    };

    //Log解析
    logInfo = {
        Path : Conf.Log.PATH,
        MinLevel: Conf.Log.LOGLEVEL,
    };

}catch (e){
    console.log("open conf file err = " + e.message);
}


module.exports.webInfo = webInfo;
module.exports.logInfo = logInfo;