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
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
