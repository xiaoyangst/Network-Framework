/**
 * 存放通信间的指令含义
 **/

let logger = require("./Log").logger;

let CMDNO_PUSH = 1
let CMDNO_PULL = 2
let CMDNO_ANSWER = 3
let CMDNO_STOP_PUSH = 4
let CMDNO_STOP_PULL = 5

class ComHttpResp {
    constructor(ErrNo, ErrMsg, Data) {
        this.errNo = ErrNo;
        this.errMsg = ErrMsg;
        this.data = Data;
    }
}


function writeJsonErrorResponse(cerr, res) {
    logger.error("errNo: " + cerr.geterrno());
    logger.error("errMsg:" + cerr.geterr());
    logger.warn("request process failed");

    let comHttpResp = {
        ErrNo: cerr.geterrno(),
        ErrMsg: "process error",
    }

    res.send(comHttpResp);
}

module.exports.writeJsonErrorResponse = writeJsonErrorResponse;
module.exports.CMDNO_PUSH = CMDNO_PUSH;
