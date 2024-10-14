// utils.ts

export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => (b !== 0 ? a / b : NaN);
export const percentage = (a: number): number => a / 100;
export const negate = (a: number): number => -a;
