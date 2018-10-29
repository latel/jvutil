## 快速上手

### 安装

```bash
tnpm i -S @tencent/stockfe-util;
```

### 引用

```javascript
import math from '@tencent/stockfe-util/math';

console.log(math.add(.002, .003));
```

## 这个大礼包包含什么内容

[参阅本模块的wiki](http://git.code.oa.com/westock/stockutil/wikis/home)


## 开发准则

### 按需引入

为了保证业务方代码尽可能精简，支持按需引入，源码组织需按目录整理

### 函数式

只允许无副作用的纯函数式方法

### MR

鉴于基础库需要保证稳定性，所有修订必须走MR

### Typescript

为了确保基础库的安全，我们建议使用ts来编写函数库，但是仅限于基础的typescript基础语法和类型注释，不允许使用ts的高级特性

### 测试

所以函数库必须编写测试用例，新的版本发布时会自动跑自动化测试
