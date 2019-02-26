// 探测运行环境并标记各个全局环境变量
/*eslint-disable*/
const { userAgent: UA, platform: PLATFORM } = navigator;

export const IS_MQQ = UA.match(/QQ\/([\d.]+)/i) && (UA.match(/QQ\/([\d.]+)/i) || [])[1] || null;
export const IS_WEIXIN =
  UA.match(/MicroMessenger\/([\d.]+)/i) &&
  (UA.match(/MicroMessenger\/([\d.]+)/i) || [])[1] || null;
export const IS_ZXG =
  UA.match(/qqstock\/([\d.]+)/i) && (UA.match(/qqstock\/([\d.]+)/i) || [])[1] || null;

// @ts-ignore
export const IS_WKWEBVIEW = window.__wxjs_is_wkwebview; // 是否微信wkwebview
export const IS_PCWEIXIN = /WindowsWechat/.test(UA); // 是否是PC微信客户端
// @ts-ignore
export const IS_MINIPROGRAM = window.__wxjs_environment === 'miniprogram'; // 是否为小程序

export const IS_QQNEWS = UA.match(/qqnews\/([\d.]+)/i);

let os:any = {},
  browser:any = {};

let webkit = UA.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
  android = UA.match(/(Android);?[\s\/]+([\d.]+)?/),
  osx = !!UA.match(/\(Macintosh\; Intel /),
  ipad = UA.match(/(iPad).*OS\s([\d_]+)/),
  ipod = UA.match(/(iPod)(.*OS\s([\d_]+))?/),
  iphone = !ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/),
  webos = UA.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
  win = /Win\d{2}|Windows/.test(PLATFORM),
  wp = UA.match(/Windows Phone ([\d.]+)/),
  touchpad = webos && UA.match(/TouchPad/),
  kindle = UA.match(/Kindle\/([\d.]+)/),
  silk = UA.match(/Silk\/([\d._]+)/),
  blackberry = UA.match(/(BlackBerry).*Version\/([\d.]+)/),
  bb10 = UA.match(/(BB10).*Version\/([\d.]+)/),
  rimtabletos = UA.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
  playbook = UA.match(/PlayBook/),
  chrome = UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/),
  firefox = UA.match(/Firefox\/([\d.]+)/),
  firefoxos = UA.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
  ie =
    UA.match(/MSIE\s([\d.]+)/) ||
    UA.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
  webview = !chrome && UA.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
  safari =
    webview ||
    UA.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

if ((browser.webkit = !!webkit)) {browser.version = (<string[]>webkit)[1];}

if (android) {(os.android = true), (os.version = android[2]);}
if (iphone && !ipod)
{(os.ios = os.iphone = true), (os.version = iphone[2].replace(/_/g, '.'));}
if (ipad) {(os.ios = os.ipad = true), (os.version = ipad[2].replace(/_/g, '.'));}
if (ipod)
{(os.ios = os.ipod = true),
(os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null);}
if (wp) {(os.wp = true), (os.version = wp[1]);}
if (webos) {(os.webos = true), (os.version = webos[2]);}
if (touchpad) {os.touchpad = true;}
if (blackberry) {(os.blackberry = true), (os.version = blackberry[2]);}
if (bb10) {(os.bb10 = true), (os.version = bb10[2]);}
if (rimtabletos) {(os.rimtabletos = true), (os.version = rimtabletos[2]);}
if (playbook) {browser.playbook = true;}
if (kindle) {(os.kindle = true), (os.version = kindle[1]);}
if (silk) {(browser.silk = true), (browser.version = silk[1]);}
if (!silk && os.android && UA.match(/Kindle Fire/)) {browser.silk = true;}
if (chrome) {(browser.chrome = true), (browser.version = chrome[1]);}
if (firefox) {(browser.firefox = true), (browser.version = firefox[1]);}
if (firefoxos) {(os.firefoxos = true), (os.version = firefoxos[1]);}
if (ie) {(browser.ie = true), (browser.version = ie[1]);}
if (safari && (osx || os.ios || win)) {
  browser.safari = true;
  if (!os.ios) {browser.version = safari[1];}
}
if (webview) {browser.webview = true;}

os.tablet = !!(
  ipad ||
  playbook ||
  (android && !UA.match(/Mobile/)) ||
  (firefox && UA.match(/Tablet/)) ||
  (ie && !UA.match(/Phone/) && UA.match(/Touch/))
);
os.phone = !!(
  !os.tablet &&
  !os.ipod &&
  (android ||
    iphone ||
    webos ||
    blackberry ||
    bb10 ||
    (chrome && UA.match(/Android/)) ||
    (chrome && UA.match(/CriOS\/([\d.]+)/)) ||
    (firefox && UA.match(/Mobile/)) ||
    (ie && UA.match(/Touch/)))
);

export { os, browser };
let IS_IPHONEX = false;
if (os.ios) {
  if (screen.height == 812 && screen.width == 375) {
    IS_IPHONEX = true;
  }
}

export { IS_IPHONEX };
