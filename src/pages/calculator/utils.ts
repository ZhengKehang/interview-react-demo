// utils.ts
import Decimal from 'decimal.js';

export const add = (a: number, b: number): number => {
  return new Decimal(a).plus(b).toNumber();
};

export const subtract = (a: number, b: number): number => {
  return new Decimal(a).minus(b).toNumber();
};

export const multiply = (a: number, b: number): number => {
  return new Decimal(a).times(b).toNumber();
};

export const divide = (a: number, b: number): number => {
  return b !== 0 ? new Decimal(a).div(b).toNumber() : NaN;
};

export const percentage = (a: number): number => {
  return divide(a, 100);
};

export const negate = (a: number): number => {
  return new Decimal(a).negated().toNumber();
};

export const formatNumber = (value: number): string => {
  const decimalValue = new Decimal(value);
  if (decimalValue.abs().gt(1e14)) {
    return decimalValue.toExponential(5).replace('+', ''); // 超过 14 位，使用科学计数法，保留 5 位小数
  }
  return decimalValue.toString(); // 否则返回正常格式
};
