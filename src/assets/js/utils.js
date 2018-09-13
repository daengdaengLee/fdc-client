import { notification } from 'antd';

export function formatDigit(digit, num) {
  const q = Math.floor(num / 10) + 1;
  const zeroCount = digit - q;
  return zeroCount <= 0
    ? num
    : `${[...Array(zeroCount)].map(() => 0).join('')}${num}`;
}

export function getDateString(stamp) {
  const date = !stamp
    ? new Date()
    : stamp instanceof Date
      ? stamp
      : new Date(stamp);
  const year = date.getFullYear();
  const month = formatDigit(2, date.getMonth() + 1);
  const day = formatDigit(2, date.getDate());
  return `${year}-${month}-${day}`;
}

export function getTimeString(stamp) {
  const date = !stamp
    ? new Date()
    : stamp instanceof Date
      ? stamp
      : new Date(stamp);
  const year = date.getFullYear();
  const month = formatDigit(2, date.getMonth() + 1);
  const day = formatDigit(2, date.getDate());
  const hours = formatDigit(2, date.getHours());
  const minutes = formatDigit(2, date.getMinutes());
  const seconds = formatDigit(2, date.getSeconds());
  const milliseconds = formatDigit(3, date.getMilliseconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function getTodayString() {
  const stamp = new Date().getTime();
  const dateString = getDateString(stamp);
  return dateString;
}

export function getYesterdayString() {
  const todayStamp = new Date().getTime();
  const stamp = todayStamp - 1 * 24 * 60 * 60 * 1000;
  const dateString = getDateString(stamp);
  return dateString;
}

export function notiError(message, desc) {
  notification.error({
    message: message,
    description: desc,
    placement: 'bottomRight',
    style: {
      marginLeft: -260,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 0,
      bottom: 10,
      padding: '10px 24px',
    },
  });
}

export function greatestUnder(list, evaluator, validator) {
  const filterd = list.filter(obj => validator(evaluator(obj)));
  return !filterd.length
    ? undefined
    : filterd.reduce((acc, cur) => {
      const accEval = evaluator(acc);
      const curEval = evaluator(cur);
      return accEval < curEval ? cur : acc;
    });
}
