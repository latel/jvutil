/**
 * 元单位转换为分单位
 * @param val 需要转换的数字
 */
export declare const yuan2fen: (val: number | string) => string;
/**
 * 分单位转换为元单位
 * @param val 需要转换的数字
 */
export declare const fen2yuan: (val: number | string) => string;
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
export declare const toText: (value: number | string, decimal?: number, options?: ToTextOptions | undefined) => string | number;
/**
 * 转换为常用货币展示格式，按千分割数字，如：-12345.6 => -12,345.60
 *
 * *如果收到异常数据，则会原样返回*
 * @param val 需要转换的数字
 * @param decimal 需要保留的小数位个数，默认2位，切割时遵循四舍五入
 * @param strip 是否去除结尾多余的0，如12345.10 => 12,345.1，默认去除
 */
export declare const toCurrency: (val: number | string, decimal?: number, strip?: boolean) => string;
declare const _default: {
    fen2yuan: (val: string | number) => string;
    yuan2fen: (val: string | number) => string;
    toText: (value: string | number, decimal?: number, options?: ToTextOptions | undefined) => string | number;
    toCurrency: (val: string | number, decimal?: number, strip?: boolean) => string;
};
export default _default;
