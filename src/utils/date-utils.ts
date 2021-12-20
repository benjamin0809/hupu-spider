/*
 * @Author: your name
 * @Date: 2021-12-20 21:10:01
 * @LastEditTime: 2021-12-20 21:14:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\utils\date-utils.ts
 */

const translateHupuTime = (time: string) => {
  let result = new Date();
  if (/分钟/.test(time)) {
    const mins = parseInt(time);
    result = new Date(new Date().getTime() - mins * 60 * 1000);
  } else if (/小时/.test(time)) {
    const hours = parseInt(time);
    result = new Date(new Date().getTime() - hours * 60 * 60 * 1000);
  } else if (/阅读/.test(time)) {
    time += '#';
    time = time.replace(/阅读.*?#/g, '');
  } else {
    time = new Date().getFullYear() + '-' + time;
    result = new Date(time);
  }
  //console.log(time,result)
  return getCurrentTime(result);
};

//获取当前时间
const getCurrentTime = (time) => {
  const today = !time ? new Date() : new Date(time);
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const hours = today.getHours();
  const minutes =
    today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
  const seconds =
    today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
  const timeString =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;
  return timeString;
};

export default {
  getCurrentTime,
  translateHupuTime,
};
