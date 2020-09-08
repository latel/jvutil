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
 * @param decimal 需要保留的小数位个数，默认两位
 * @param options 额外参数
 */
exports.toText = function (value, decimal, options) {
    if (decimal === void 0) { decimal = 2; }
    var _a = options || {}, _b = _a.unit /* 默认单位为空 */, unit = _b === void 0 ? "" : _b /* 默认单位为空 */, _c = _a.level /* 默认转换万以上的数字 */, level = _c === void 0 ? 10000 : _c /* 默认转换万以上的数字 */, _d = _a.strip /* 默认去除多余的尾部0，如1.20万->1.2万 */, strip = _d === void 0 ? true : _d /* 默认去除多余的尾部0，如1.20万->1.2万 */;
    var val = +value;
    var ret = String(val);
    // 不对异常数据处理
    if (isNaN(val)) {
        return value;
    }
    var absVal = Math.abs(val);
    if (absVal < Math.pow(10, 4) || absVal < level) {
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
 * 转换为常用货币展示格式，按千分割数字，如：12345.67 => 12,345.67
 * @param val 需要转换的数字
 * @param decimal 需要保留的小数位个数，默认2位
 * @param strip 去除结尾多余的0，如12345.00 => 12,345.00，默认去除
 */
exports.toCurrency = function (val, decimal, strip) {
    if (decimal === void 0) { decimal = 2; }
    if (strip === void 0) { strip = true; }
    val = String(val) || "";
    var pattern = /^(\-?)(\d+)(\.\d+)?$/, macher = pattern.exec(val);
    if (macher === null) {
        return val;
    }
    var sign = null != macher ? RegExp.$1 || "" : "", integer = null != macher ? RegExp.$2 || "0" : "0", bit = null != macher ? RegExp.$3 || ".00" : ".00", size = integer.length, mod = size > 3 ? size % 3 : 0, tmp = "", start = 0 == mod ? "" : integer.substr(0, mod) + ",", flag = 0;
    if (decimal == 0) {
        bit = "";
    }
    else if (bit.length >= decimal + 1) {
        bit = bit.substr(0, decimal + 1);
    }
    else {
        bit = (bit + new Array(decimal + 1 - bit.length + 1).join("0")).substr(0, decimal + 1);
    }
    for (var i = mod; i < size; i++) {
        tmp += integer.charAt(i);
        flag++;
        if (flag % 3 == 0 && i < size - 1) {
            tmp += ",";
            flag = 0;
        }
    }
    bit = strip ? bit.replace(/\.?0+$/, '') : bit;
    return sign + start + tmp + bit;
};
exports["default"] = {
    fen2yuan: exports.fen2yuan,
    yuan2fen: exports.yuan2fen,
    toText: exports.toText,
    toCurrency: exports.toCurrency
};
