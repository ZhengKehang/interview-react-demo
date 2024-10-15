import dayjs from 'dayjs';

export const WeekNames = Array.from({ length: 7 }, (_, i) => dayjs().day(i).format('ddd'));

export function getMonthDatesArray(firstDayOfMonth?: string): string[] {
  // 如果传入了日期，使用传入的日期，否则默认为当前月
  const startOfMonth = firstDayOfMonth ? dayjs(firstDayOfMonth).startOf('month') : dayjs().startOf('month');
  const endOfMonth = startOfMonth.endOf('month'); // 计算对应月份的最后一天

  // 获取该月份第一天所在的周的周日
  const startOfWeek = startOfMonth.startOf('week');

  // 获取该月份最后一天所在的周的周六
  const endOfWeek = endOfMonth.endOf('week');

  const datesArray: string[] = [];

  let currentDate = startOfWeek;

  // 从周日开始，依次推算到周六，构造日期数组
  while (currentDate.isBefore(endOfWeek) || currentDate.isSame(endOfWeek)) {
    datesArray.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return datesArray;
}

export function getMonthList(locale?: string): string[] {
  // 设置dayjs语言环境
  locale && dayjs.locale(locale);

  const monthsArray: string[] = [];

  // 从1月到12月，获取月份名称
  for (let i = 0; i < 12; i++) {
    const monthName = dayjs().month(i).format('MMMM');
    monthsArray.push(monthName);
  }

  return monthsArray;
}

// 示例使用
console.log(getMonthList('zh-cn')); // 中文月份列表

console.log(getMonthList('en')); // 英文月份列表
