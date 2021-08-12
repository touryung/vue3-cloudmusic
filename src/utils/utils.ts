/**
 * 防抖
 * @param func
 * @param delay
 * @returns
 */
export const debounce = function (func: any, delay: number) {
  let timer = null;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  };
};

/**
 * 数字转中文单位
 * @param count
 * @returns
 */
export const translateCount = (count: number) => {
  const BASE = 10000;
  const MAX = 100000;
  return count >= MAX ? `${Math.floor(count / BASE)}万` : count;
};

/**
 * 时间戳取整格式化
 * @param duration
 * @returns
 */
export const formatDuration = (duration: number) => {
  const time = (duration / 1000) | 0;
  const mins = ((time / 60) | 0).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${mins}:${seconds}`;
};

/**
 * 格式化日期
 * @param timeStamp
 * @param fmt
 * @returns
 */
export const formatDate = (timeStamp: number, fmt = "YYYY-MM-dd hh:mm:ss") => {
  const date = timeStamp ? new Date(timeStamp) : new Date();

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  let format = fmt;
  const trans = {
    "M+": month,
    "d+": day,
    "h+": hour,
    "m+": minute,
    "s+": second,
  };

  // 转换年份
  if (/([Yy]+)/.test(format)) {
    format = format.replace(RegExp.$1, year.substr(4 - RegExp.$1.length));
  }

  // 转换其它
  for (const key in trans) {
    if (new RegExp("(" + key + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        trans[key].substr(2 - RegExp.$1.length)
      );
    }
  }

  return format;
};

export const lazyLoad = (
  dom: HTMLElement,
  more: boolean,
  callback: Function
) => {
  // 当前滚动的高度
  const scrollTop = dom.scrollTop;
  // 所有内容高度
  const scrollHeight = dom.scrollHeight;
  // 可见区域高度
  const clientHeight = dom.clientHeight;
  // 滚轴距顶部距离 + 视窗高度 > 整个高度 - 10
  if (scrollTop + clientHeight > scrollHeight - 10 && more) callback();
};
