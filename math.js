"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.lt = exports.gt = exports.eq = exports.div = exports.mul = exports.reduce = exports.add = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 浮点数安全的计算模块
// TODO: 表达式支持，math.eval('?/(?*?)', 4.4, 1, 2.2);
// TODO: 试着链式调用避免一定要主动调用value()方法
// 数字相加
var _add = function add(arg1, arg2) {
  var r1, r2, m, c;
  var s1 = arg1.toString(),
      s2 = arg2.toString();

  try {
    r1 = s1.split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = s2.split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));

  if (c > 0) {
    var cm = Math.pow(10, c);

    if (r1 > r2) {
      arg1 = Number(s1.replace(".", ""));
      arg2 = Number(s2.replace(".", "")) * cm;
    } else {
      arg1 = Number(s1.replace(".", "")) * cm;
      arg2 = Number(s2.replace(".", ""));
    }
  } else {
    arg1 = Number(s1.replace(".", ""));
    arg2 = Number(s2.replace(".", ""));
  }

  return (arg1 + arg2) / m;
}; // 数字相减


exports.add = _add;

var _reduce = function reduce(arg1, arg2) {
  var r1, r2, m, c;

  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  c = Math.max(r1, r2);
  m = Math.pow(10, c);
  return +((arg1 * m - arg2 * m) / m).toFixed(c);
}; // 数字相乘


exports.reduce = _reduce;

var _mul = function mul(arg1, arg2) {
  var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();

  try {
    m += s1.split(".")[1].length;
  } catch (e) {}

  try {
    m += s2.split(".")[1].length;
  } catch (e) {}

  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}; // 数字相除


exports.mul = _mul;

var _div = function div(arg1, arg2) {
  var t1 = 0,
      t2 = 0,
      r1,
      r2,
      c;

  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}

  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}

  c = Math.max(t1, t2);
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return +(r1 / r2 * Math.pow(10, t2 - t1)).toFixed(c);
}; // 判断两个数字是否相等


exports.div = _div;

var _eq = function eq(a, b) {
  // @ts-ignore
  a = parseFloat(a); // @ts-ignore

  b = parseFloat(b);

  if (typeof a === "number" && typeof b === "number" && !isNaN(a) && !isNaN(b)) {
    return a === b;
  }
}; // 判断前一个数是否大于后一个数


exports.eq = _eq;

var _gt = function gt(a, b) {
  // @ts-ignore
  a = parseFloat(a); // @ts-ignore

  b = parseFloat(b);

  if (typeof a === "number" && typeof b === "number" && !isNaN(a) && !isNaN(b)) {
    return a > b;
  }
}; // 判断前一个数是否小于第二个数


exports.gt = _gt;

var _lt = function lt(a, b) {
  // @ts-ignore
  a = parseFloat(a); // @ts-ignore

  b = parseFloat(b);

  if (typeof a === "number" && typeof b === "number" && !isNaN(a) && !isNaN(b)) {
    return a < b;
  }
}; // 链式调用支持


exports.lt = _lt;

var AccMath =
/*#__PURE__*/
function () {
  function AccMath(initialValue) {
    _classCallCheck(this, AccMath);

    _defineProperty(this, "val", void 0);

    this.val = initialValue || 0;
  }

  _createClass(AccMath, [{
    key: "add",
    value: function add(a) {
      this.val = _add(this.val, a);
      return this;
    }
  }, {
    key: "reduce",
    value: function reduce(a) {
      this.val = _reduce(this.val, a);
      return this;
    }
  }, {
    key: "div",
    value: function div(a) {
      this.val = _div(this.val, a);
      return this;
    }
  }, {
    key: "mul",
    value: function mul(a) {
      this.val = _mul(this.val, a);
      return this;
    }
  }, {
    key: "eq",
    value: function eq(a) {
      return _eq(this.val, a);
    }
  }, {
    key: "gt",
    value: function gt(a) {
      return _gt(this.val, a);
    }
  }, {
    key: "lt",
    value: function lt(a) {
      return _lt(this.val, a);
    }
  }, {
    key: "value",
    value: function value() {
      return this.val;
    }
  }]);

  return AccMath;
}();

function math(initialValue) {
  return new AccMath(initialValue);
}

var _default = math;
exports.default = _default;