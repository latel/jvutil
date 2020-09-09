const REGEX_A_NUMBER = /^(-|\+)?[\d.]+$/;
/**
 * 元单位转换为分单位
 * @param val 需要转换的数字
 */
export const yuan2fen = (val: number | string): string => {
  // 强制转换成字符串
  val = String(val);
  return REGEX_A_NUMBER.test(val) ? (parseFloat(val) * 100).toFixed(2) : "0.00";
};

/**
 * 分单位转换为元单位
 * @param val 需要转换的数字
 */
export const fen2yuan = (val: number | string): string => {
  // 强制转换成字符串
  val = String(val);
  return REGEX_A_NUMBER.test(val) ? (parseFloat(val) / 100).toFixed(2) : "0.00";
};

interface ToTextOptions {
  /** 单位（股/手/张等） */
  unit?: string;
  /** 接受转换最低金额，如指定超过10万才处理转换 */
  baseline?: number;
  /** 是否尽可能的去除尾部多余的0，如1.200张->1.2张，默认去除 */
  strip?: boolean;
}

/**
 * 格式化大数为指定的单位，如：12345.67 => 1.23万
 * @param value 需要转换的数字
 * @param decimal 需要保留的小数位个数，默认两位，切割时遵循四舍五入
 * @param options 额外参数
 */
export const toText = (
  value: number | string,
  decimal = 2,
  options?: ToTextOptions
): string | number => {
  const {
    unit = "" /* 默认单位为空 */,
    baseline = 10000 /* 默认转换万以上的数字 */,
    strip = false /* 默认去除多余的尾部0，如1.20万->1.2万 */,
  } = options || {};
  let val: number = +value;
  let ret: string = String(val);
  // 不对异常数据处理
  if (isNaN(val)) {
    return value;
  }
  let absVal = Math.abs(val);
  if (absVal < Math.pow(10, 4) || absVal < baseline) {
    ret = val.toFixed(decimal);
  } else if (absVal >= Math.pow(10, 4) && absVal < Math.pow(10, 8)) {
    ret = (val / 10000).toFixed(decimal) + "万";
  } else if (absVal >= Math.pow(10, 8) && absVal < Math.pow(10, 11)) {
    ret = (val / 100000000).toFixed(decimal) + "亿";
  }
  ret = strip ? ret.replace(/\.?0+([万亿]?)$/, "$1") : ret;
  return ret + unit;
};

/**
 * 转换为常用货币展示格式，按千分割数字，如：12345.67 => 12,345.67
 * @param val 需要转换的数字
 * @param decimal 需要保留的小数位个数，默认2位，切割时遵循四舍五入
 * @param strip 去除结尾多余的0，如12345.00 => 12,345.00，默认去除
 */
export const toCurrency = (val: number | string, decimal = 2, strip = false): string => {
  val = String(val) || "";
  var pattern = /^(\-?)(\d+)(\.\d+)?$/,
    macher = pattern.exec(val);
  if (macher === null) {
    return val;
  }
  var sign = null != macher ? RegExp.$1 || "" : "",
    integer = null != macher ? RegExp.$2 || "0" : "0",
    bit = null != macher ? RegExp.$3 || ".00" : ".00",
    size = integer.length,
    mod = size > 3 ? size % 3 : 0,
    tmp = "",
    start = 0 == mod ? "" : integer.substr(0, mod) + ",",
    flag = 0;
  if (decimal == 0) {
    bit = "";
  } else if (bit.length >= decimal + 1) {
    bit = bit.substr(0, decimal + 1);
  } else {
    bit = (bit + new Array(decimal + 1 - bit.length + 1).join("0")).substr(
      0,
      decimal + 1
    );
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

export default {
  fen2yuan,
  yuan2fen,
  toText,
  toCurrency,
};
