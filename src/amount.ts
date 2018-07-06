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

/**
 * 格式化大数为指定的单位，如：12345.67 => 1.23万
 * @param val 需要转换的数字
 * @param unit 单位（股/手/张等）
 * @param decimal 需要保留的小数位个数
 * @param level 转换最低级别，如需要超过10万才转换
 */
export const toText = (
  val: number | string,
  decimal?: number,
  unit?: string,
  level?: number
): string => {
  val = Number(val) || 0;
  // 默认转换万以上的数字
  level = level || 10000;
  // 默认保留两位小数
  decimal = decimal === undefined ? 2 : decimal;
  // 默认单位为空
  unit = unit || "";
  if (val < Math.pow(10, 4) || val < level) {
    val = val.toFixed(decimal);
  } else if (val >= Math.pow(10, 4) && val < Math.pow(10, 6)) {
    val = (val / 10000).toFixed(decimal) + "万";
  } else if (val >= Math.pow(10, 6) && val < Math.pow(10, 8)) {
    val = (val / 1000000).toFixed(decimal) + "百万";
  } else if (val >= Math.pow(10, 8) && val < Math.pow(10, 11)) {
    val = (val / 100000000).toFixed(decimal) + "亿";
  } else if (val >= Math.pow(10, 11) && val < Math.pow(10, 12)) {
    val = (val / 100000000000).toFixed(decimal) + "千亿";
  } else if (val >= Math.pow(10, 12) && val < Math.pow(10, 16)) {
    val = (val / 1000000000000).toFixed(decimal) + "万亿";
  } else {
    val = (val / Math.pow(10, 16)).toFixed(decimal) + "兆";
  }
  return val + unit;
};

/**
 * 转换为常用货币展示格式，按千分割数字，如：12345.67 => 12,345.67
 * @param val 需要转换的数字
 * @param decimal 需要保留的小数位个数
 */
export const toCurrency = (val: number | string, decimal?: number): string => {
  val = String(val) || "";
  decimal = typeof decimal === "undefined" ? 2 : decimal;
  var pattern = /^(\-?)(\d+)(\.\d+)?$/,
    macher = pattern.exec(val),
    sign = null != macher ? RegExp.$1 || "" : "",
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
    bit = (
      bit + new Array(decimal + 1 - bit.length + 1).join("0")
    ).substr(0, decimal + 1);
  }
  for (var i = mod; i < size; i++) {
    tmp += integer.charAt(i);
    flag++;
    if (flag % 3 == 0 && i < size - 1) {
      tmp += ",";
      flag = 0;
    }
  }
  pattern = null;
  return sign + start + tmp + bit;
};

export default {
  fen2yuan,
  yuan2fen,
  toText,
  toCurrency
};
