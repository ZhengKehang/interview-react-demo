// utils.ts

// todo 浮点数和显示精度问题处理

const multiplier = 1e14; // 选择一个合适的乘数

export const isFloat = (num: number): boolean => {
  return !Number.isInteger(num); // 如果不是整数，则为浮点数
};

export const add = (a: number, b: number): number => {
  // 检查是否需要浮点数处理
  if (isFloat(a) || isFloat(b)) {
    return (Math.round(a * multiplier) + Math.round(b * multiplier)) / multiplier;
  }
  return a + b; // 直接加法
};

export const subtract = (a: number, b: number): number => {
  // 检查是否需要浮点数处理
  if (isFloat(a) || isFloat(b)) {
    return (Math.round(a * multiplier) - Math.round(b * multiplier)) / multiplier;
  }
  return a - b; // 直接减法
};
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => (b !== 0 ? a / b : NaN);
export const percentage = (a: number): number => divide(a, 100);
export const negate = (a: number): number => -a;

export const formatNumber = (value: number): string => {
  if (Math.abs(value) > 1e14) {
    return value.toExponential(5).replace('+', ''); // 超过 14 位，使用科学计数法，保留 5 位小数
  }
  return String(value); // 否则返回正常格式
};
