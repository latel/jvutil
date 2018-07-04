// 浮点数安全的计算模块
// TODO: 表达式支持，math.eval('?/(?*?)', 4.4, 1, 2.2);
// TODO: 链式调用支持 math(4.4).dived(math(1).multiply(2.2).value()).value();
const add = (arg1, arg2) => {
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
};

const reduce = (arg1, arg2) => {
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
};

const mul = (arg1, arg2) => {
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
};

const div = (arg1, arg2) => {
  var t1 = 0,
            t2 = 0,
            r1, r2, c;
        try {
            t1 = arg1.toString().split(".")[1].length;
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length;
        } catch (e) {}
        c = Math.max(t1, t2);
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return +((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(c);
};

const eq = (a, b) => {
  a = parseFloat(a);
        b = parseFloat(b);

        if (typeof a === 'number' && typeof b === 'number' && !isNaN(a) && !isNaN(b)) {
            return a === b;
        }
};

const gt = (a, b) => {
  a = parseFloat(a);
        b = parseFloat(b);

        if (typeof a === 'number' && typeof b === 'number' && !isNaN(a) && !isNaN(b)) {
            return a > b;
        }
};

const lt = (a, b) => {
  a = parseFloat(a);
        b = parseFloat(b);

        if (typeof a === 'number' && typeof b === 'number' && !isNaN(a) && !isNaN(b)) {
            return a < b;
        }
};


class AccMath{
  constructor(initialValue) {
    this.val = initialValue || 0;
  }

  add(a) {
    this.val = add(this.val, a);
    return this;
  }

  reduce(a) {
    this.val = reduce(this.val, a);
    return this;
  }

  div(a) {
    this.val = div(this.val, a);
    return this;
  }

  mul(a) {
    this.val = mul(this.val, a);
    return this;
  }

  eq(a) {
    return eq(this.val, a);
  }

  gt(a) {
    return gt(this.val, a);
  }

  lt(a) {
    return lt(this.val, a);
  }

  value() {
    return this.val;
  }
}


function math(initialValue) {
  return new AccMath(initialValue);
}

math.calc = function(expression, ...values) {
};



export { add, reduce, mul, div, eq, gt, lt };
export default math;