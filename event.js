"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var detect_1 = require("./detect");
/**
 * 手机系统键盘弹出收起，页面上移后没能恢复到原来位置，导致热区上移，这里统一修复！
 */
function KeyboardH5Adapter() {
    // [ANDROID]窗口发生变化，比如：调起系统键盘挤压窗口变形
    var originalHeight = document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
    if (detect_1.os.android) {
        window.onresize = lodash_1.throttle(function () {
            // 键盘弹起与隐藏都会引起窗口的高度发生变化
            var resizeHeight = document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
            if (resizeHeight < originalHeight) {
                // 当软键盘弹起，在此处操作
            }
            else {
                // 当软键盘收起，在此处操作
                var tempTop = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, -tempTop);
            }
        }, 500);
    }
    // [iOS]focusin和focusout支持冒泡，对应focus和blur, 使用focusin和focusout的原因是focusin和focusout可以冒泡，focus和blur不会冒泡，这样就可以使用事件代理，处理多个输入框存在的情况。
    if (detect_1.os.ios) {
        document.body.addEventListener('focusout', function () {
            // 软键盘收起的事件处理
            var tempTop = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, -tempTop);
        });
    }
}
exports.KeyboardH5Adapter = KeyboardH5Adapter;
