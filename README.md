## jv函数辅助库

包括:

+ math: 提供小数点精确的计算，加减乘除和取模
+ amount: 用于格式化金额数字为常用的金融需要的格式，如1,234.00
+ detect: 用于判断系统、平台和机型

使用文档可以暂时参考测试文件，位于源码的test目录下

### 安装

```bash
tnpm i -S @jv/xxxx;
```

### 引用

```javascript
import math from '@jv/xxxx/math';

console.log(math.add(.002, .003));
```


### amount

#### amount#toCurrency

转换为常用货币展示格式，按千分割数字，如：12345.67 => 12,345.67

```javascript
import { toCurrency } from '@jv/xxxx/amount';

// 默认两位小数
toCurrency(12345); // => 12,345.00
// 限制小数位数
toCurrency(12345, 3); // => 12,345.000
toCurrency(12345.1, 3); // => 12,345.100
toCurrency(12345, 0); // => 12,345
// 保留指定个小数时，遵循四舍五入原则
toCurrency(12345.618, 1); // => 12,345.6
toCurrency(12345.618, 2); // => 12,345.62
// 尽可能的去除末尾多余的0
toCurrency(12345, 3); // => 12,345.000
toCurrency(12345, 3, true); // => 12,345
toCurrency(12345.1, 3, true); // => 12,345.1
```

#### amount#toText

格式化大数为指定的单位，如：12345.67 => 1.23万

```javascript
import { toText } from '@jv/xxxx/amount';

// 自带万和亿两个档位的级别，默认2位小数
toText(123456789); // => 1.23亿
toText(12345); // => 12.35万
// 限制接受转换的起始金额
toText(12345); // => 1.23万
toText(12345, 2, { baseline: 100000 }); // => 12345.00
toText(123456, 2, { baseline: 100000 }); // => 12.35.00万
// 保留固定位数的小数（遵循四舍五入）
toText(123446789, 0); // => 1亿
toText(123446789, 3); // => 1.234亿
toText(123446789, 4); // => 1.2345亿
// 指定附加单位
toText(12345, 2, { unit: '手' }); // => 1.23万手
toText(12345, 2, { unit: '张' }); // => 1.23万张
// 尽可能的去除末尾多余的0
toText(100000); // => 10.00万
toText(100000, 2, { strip: true }); // => 10万
toText(101000, 3); // => 10.100万
toText(101000, 3, { strip: true }); // => 10.1万
```
