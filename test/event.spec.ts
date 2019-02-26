import { JSDOM } from 'jsdom';
import { os } from '../src/detect';

/**
 * 获取body的scrollTop
 * @param document 整个HTML文档
 */
function getScrollTop(document: any){
  console.log("document.documentElement.scrollTop: "+document.body.scrollTop);
  return ( document.documentElement && document.documentElement.scrollTop ) || document.body.scrollTop;
}

/**
 * 测试公有方法体
 * @param inputType 类型
 * @param t 回调值
 */
function testUtil(inputType:any, t:any){
  return new Promise((resolve, reject)=>{
    console.log('进入testUtil');
    const htmlContent = '<!DOCTYPE HTML>'+
    '<html>'+
    '<head>'+
    '<title>event-测试用例-修复系统键盘导致页面整体上移</title>'+
    '<meta charset="UTF-8"/>'+
    '<style>'+
    'body {'+
    'background: red;'+
    '}'+
    '</style>'+
    '</head>'+
    '<body>'+
    '手机号：<input type="tel"/>'+
    '数字：<input type="number"/>'+
    '文本：<input type="text"/>'+
    '文本：<input type="date"/>'+
    '<script src="../src/event.js"></script>'+
    '</body>'+
    '</html>';
    // 获取html里的document
    const { document } = (new JSDOM(htmlContent)).window;
    let tempTop:any = 0;
    let telDom:any = document.querySelectorAll('input[type="'+inputType+'"]')[0];
    telDom.focus();
    if(os.android){
      tempTop = getScrollTop(document);
    }else if(os.ios){
      tempTop = getScrollTop(document);
    }
    // focus前和后做对比。
    telDom.addEventListener('blur',()=>{
      console.log('进入blur');
      if(tempTop === getScrollTop(document)){
        t.true(tempTop === getScrollTop(document), '整体上移修复成功！');
        resolve('整体上移修复成功！');
      }else{
        t.not(tempTop, getScrollTop(document), '整体上移修复失败！');
        reject('整体上移修复失败！');
      }
    });
  });
}

describe.skip('event', () => {
  /**
   * 测试_手机输入框
   */
  describe('测试_手机输入框_修复系统键盘导致页面整体上移', () =>{
    // testUtil('tel', t);
  });

  /**
   * 测试_数字输入框
   */
  describe('测试_数字输入框_修复系统键盘导致页面整体上移', () =>{
    // testUtil('number', t);
  });

  /**
   * 测试_文本输入框
   */
  describe('测试_文本输入框_修复系统键盘导致页面整体上移', () => {
    // testUtil('text', t);
  });
});


