"use strict";
exports.__esModule = true;
var REGEX_A_NUMBER = /^(-|\+)?[\d.]+$/;
/**
 * 元单位转换为分单位
 * @param val 需要转换的数字
 */
exports.yuan2fen = function (val) {
    // 强制转换成字符串
    val = String(val);
    return REGEX_A_NUMBER.test(val) ? (parseFloat(val) * 100).toFixed(2) : "0.00";
};
/**
 * 分单位转换为元单位
 * @param val 需要转换的数字
 */
exports.fen2yuan = function (val) {
    // 强制转换成字符串
    val = String(val);
    return REGEX_A_NUMBER.test(val) ? (parseFloat(val) / 100).toFixed(2) : "0.00";
};
/**
 * 格式化大数为指定的单位，如：12345.67 => 1.23万
 * @param value 需要转换的数字
 * @param decimal 需要保留的小数位个数，默认两位，切割时遵循四舍五入
 * @param options 额外参数
 */
exports.toText = function (value, decimal, options) {
    if (decimal === void 0) { decimal = 2; }
    var _a = options || {}, _b = _a.unit /* 默认单位为空 */, unit = _b === void 0 ? "" : _b /* 默认单位为空 */, _c = _a.baseline /* 默认转换万以上的数字 */, baseline = _c === void 0 ? 10000 : _c /* 默认转换万以上的数字 */, _d = _a.strip /* 默认去除多余的尾部0，如1.20万->1.2万 */, strip = _d === void 0 ? false : _d /* 默认去除多余的尾部0，如1.20万->1.2万 */;
    var val = +value;
    var ret = String(val);
    // 不对异常数据处理
    if (isNaN(val)) {
        return value;
    }
    var absVal = Math.abs(val);
    if (absVal < Math.pow(10, 4) || absVal < baseline) {
        ret = val.toFixed(decimal);
    }
    else if (absVal >= Math.pow(10, 4) && absVal < Math.pow(10, 8)) {
        ret = (val / 10000).toFixed(decimal) + "万";
    }
    else if (absVal >= Math.pow(10, 8) && absVal < Math.pow(10, 11)) {
        ret = (val / 100000000).toFixed(decimal) + "亿";
    }
    ret = strip ? ret.replace(/\.?0+([万亿]?)$/, "$1") : ret;
    return ret + unit;
};
/**
 * 转换为常用货币展示格式，按千分割数字，如：-12345.6 => -12,345.60
 *
 * *如果收到异常数据，则会原样返回*
 * @param val 需要转换的数字
 * @param decimal 需要保留的小数位个数，默认2位，切割时遵循四舍五入
 * @param strip 是否去除结尾多余的0，如12345.10 => 12,345.1，默认去除
 */
exports.toCurrency = function (val, decimal, strip) {
    if (decimal === void 0) { decimal = 2; }
    if (strip === void 0) { strip = false; }
    val = String(val) || '';
    if (!/^(\-?)(\d+)(\.\d+)?$/.exec(val)) {
        return val;
    }
    var valStr = Number(val).toFixed(decimal);
    valStr = valStr.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    valStr = strip ? valStr.replace(/\.?0+$/, '') : valStr;
    return valStr;
};
exports["default"] = {
    fen2yuan: exports.fen2yuan,
    yuan2fen: exports.yuan2fen,
    toText: exports.toText,
    toCurrency: exports.toCurrency
};
