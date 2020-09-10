// 浮点数安全的计算模块
// 数字相加
export const add = (arg1: number, arg2: number): number => {
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

// 数字相减
export const reduce = (arg1: number, arg2: number): number => {
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

// 数字相乘
export const mul = (arg1: number, arg2: number) => {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};

// 数字相除
export const div = (arg1: number, arg2: number, acc: number = 2): number => {
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
  c = Math.max(t1, t2, acc);
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  if (r2 === 0) {
    throw RangeError("no one can be dived by zero");
  }
  return +((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(c);
};

/**
 * 取模操作
 * @param dividend 目标数字
 * @param divisor 模
 * @returns 余数
 */
export const modulo = (dividend: number, divisor: number): number => {
  const dividendDecimalLen = (String(dividend).split(".")[1] || "").length || 0;
  const divisorDecimalLen = (String(divisor).split(".")[1] || "").length || 0;
  const decimalLen = Math.max(dividendDecimalLen, divisorDecimalLen);
  const a = mul(dividend, Math.pow(10, decimalLen));
  const b = mul(divisor, Math.pow(10, decimalLen));
  return a % b;
};
