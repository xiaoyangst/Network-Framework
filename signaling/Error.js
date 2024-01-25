// 定义错误码
const NoErr = 0;
const ParamErr = -1;
const NetworkErr = -2;

// 定义 Errors 类
class Errors {
    //构造函数
    constructor(errno, err) {
        this.errno = errno;
        this.err = err;
    }

    geterrno() {
        return this.errno;
    }

    geterr() {
        return this.err;
    }
}

// 定义 New 函数
function New(errno, err) {
    return new Errors(errno, err);
}

module.exports.NoErr = NoErr;
module.exports.ParamErr = ParamErr;
module.exports.NetworkErr = NetworkErr;

module.exports.Errors = Errors;
module.exports.NewErrors = New;

/*
示例：
// 创建错误对象
const errorInstance = New(ParamErr, "Invalid parameter");

// 使用错误对象的方法
console.log("Errno:", errorInstance.Errno());
console.log("Error:", errorInstance.Error());

 */


