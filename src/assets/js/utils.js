export function getDateString(stamp) {
  const date = !stamp ? new Date() : new Date(stamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
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
