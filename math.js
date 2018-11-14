"use strict";
// 浮点数安全的计算模块
// TODO: 表达式支持，math.eval('?/(?*?)', 4.4, 1, 2.2);
// TODO: 试着链式调用避免一定要主动调用value()方法
exports.__esModule = true;
// 数字相加
var add = function (arg1, arg2) {
    var r1, r2, m, c;
    var s1 = arg1.toString(), s2 = arg2.toString();
    try {
        r1 = s1.split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = s2.split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(s1.replace(".", ""));
            arg2 = Number(s2.replace(".", "")) * cm;
        }
        else {
            arg1 = Number(s1.replace(".", "")) * cm;
            arg2 = Number(s2.replace(".", ""));
        }
    }
    else {
        arg1 = Number(s1.replace(".", ""));
        arg2 = Number(s2.replace(".", ""));
    }
    return (arg1 + arg2) / m;
};
exports.add = add;
// 数字相减
var reduce = function (arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.max(r1, r2);
    m = Math.pow(10, c);
    return +((arg1 * m - arg2 * m) / m).toFixed(c);
};
exports.reduce = reduce;
// 数字相乘
var mul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) { }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) { }
    return ((Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m));
};
exports.mul = mul;
// 数字相除
var div = function (arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2, c;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) { }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) { }
    c = Math.max(t1, t2);
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return +((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(c);
};
exports.div = div;
// 判断两个数字是否相等
var eq = function (a, b) {
    // 确保在非ts下也是一个数字
    // @ts-ignore
    a = parseFloat(a);
    // @ts-ignore
    b = parseFloat(b);
    if (!isNaN(a) &&
        !isNaN(b)) {
        return a === b;
    }
    else {
        throw 'must provide two numbers to make a comparison';
    }
};
exports.eq = eq;
// 判断前一个数是否大于后一个数
var gt = function (a, b) {
    // 确保在非ts下也是一个数字
    // @ts-ignore
    a = parseFloat(a);
    // @ts-ignore
    b = parseFloat(b);
    if (!isNaN(a) &&
        !isNaN(b)) {
        return a > b;
    }
    else {
        throw 'must provide two numbers to make a comparison';
    }
};
exports.gt = gt;
// 判断前一个数是否小于第二个数
var lt = function (a, b) {
    // 确保在非ts下也是一个数字
    // @ts-ignore
    a = parseFloat(a);
    // @ts-ignore
    b = parseFloat(b);
    if (!isNaN(a) &&
        !isNaN(b)) {
        return a < b;
    }
    else {
        throw 'must provide two numbers to make a comparison';
    }
};
exports.lt = lt;
// 链式调用支持
var AccMath = /** @class */ (function () {
    function AccMath(initialValue) {
        this.val = initialValue || 0;
    }
    AccMath.prototype.add = function (a) {
        this.val = add(this.val, a);
        return this;
    };
    AccMath.prototype.reduce = function (a) {
        this.val = reduce(this.val, a);
        return this;
    };
    AccMath.prototype.div = function (a) {
        this.val = div(this.val, a);
        return this;
    };
    AccMath.prototype.mul = function (a) {
        this.val = mul(this.val, a);
        return this;
    };
    AccMath.prototype.eq = function (a) {
        return eq(this.val, a);
    };
    AccMath.prototype.gt = function (a) {
        return gt(this.val, a);
    };
    AccMath.prototype.lt = function (a) {
        return lt(this.val, a);
    };
    AccMath.prototype.value = function () {
        return this.val;
    };
    return AccMath;
}());
function math(initialValue) {
    return new AccMath(initialValue);
}
exports["default"] = math;
