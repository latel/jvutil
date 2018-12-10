import { throttle } from 'lodash';
import { os } from './detect';
export function KeyboardH5Adapter() {
    // [BUG修复]调起系统键盘挤压窗口变形,页面整体上移
    // [ANDROID]窗口发生变化，比如：调起系统键盘挤压窗口变形
    let originalHeight = ( document.documentElement && document.documentElement.clientHeight ) || document.body.clientHeight;
    window.onresize = throttle(function() {
        // 键盘弹起与隐藏都会引起窗口的高度发生变化
        let resizeHeight = ( document.documentElement && document.documentElement.clientHeight ) || document.body.clientHeight;
        if (resizeHeight < originalHeight) {
        // 当软键盘弹起，在此处操作
            console.log('ANDROID软键盘弹出!');
        } else {
        // 当软键盘收起，在此处操作
            console.log('ANDROID软键盘收起!');
            let tempTop = ( document.documentElement && document.documentElement.scrollTop ) || document.body.scrollTop || 0;
            console.log('页面上移了' + tempTop);
            window.scrollTo( 0, -tempTop );
        }
    }, 500);
    // [iOS]focusin和focusout支持冒泡，对应focus和blur, 使用focusin和focusout的原因是focusin和focusout可以冒泡，focus和blur不会冒泡，这样就可以使用事件代理，处理多个输入框存在的情况。
    document.body.addEventListener('focusin', () => {
        // 软键盘弹出的事件处理
        if (os.ios) {
            console.log('IOS软键盘弹出!');
        }
    });
    document.body.addEventListener('focusout', () => {
        // 软键盘收起的事件处理
        if (os.ios) {
            console.log('IOS软键盘收起!');
            let tempTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop || 0;
            console.log('页面上移了' + tempTop);
            window.scrollTo( 0, -tempTop );
        }
    });
}