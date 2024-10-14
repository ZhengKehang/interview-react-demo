// useCalculator.ts
import { useState } from "react";
import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  negate,
  formatNumber,
} from "./utils";

const useCalculator = () => {
  // 状态管理
  const [displayValue, setDisplayValue] = useState<string>("0"); // 显示的当前值
  const [currentOperator, setCurrentOperator] = useState<string | null>(null); // 当前操作符
  const [firstOperand, setFirstOperand] = useState<number | null>(null); // 第一个操作数
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false); // 是否在等待第二个操作数

  // 输入数字
  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit); // 如果在等待第二个操作数，则更新显示值
      setWaitingForSecondOperand(false); // 重置状态
    } else {
      // 如果当前值为 0，替换为新输入的数字；否则，拼接新数字
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  // 输入小数点
  const inputDecimal = () => {
    if (displayValue.includes(".")) return; // 如果已有小数点则不再添加
    if (waitingForSecondOperand) {
      setDisplayValue("0."); // 如果在等待第二个操作数，初始化为 "0."
    } else {
      setDisplayValue(displayValue + "."); // 在当前显示值后添加小数点
    }
  };

  // 处理操作符
  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue); // 获取当前输入值

    if (isNaN(inputValue)) {
      setDisplayValue("Error"); // 输入值为 NaN，显示错误
      return;
    }

    if (firstOperand === null) {
      // 如果第一个操作数为空，则设置为当前输入值
      setFirstOperand(inputValue);
    } else if (currentOperator) {
      // 如果已经有第一个操作数和当前操作符，进行计算
      const result = performCalculation(currentOperator, firstOperand, inputValue);
      if (isNaN(result)) {
        setDisplayValue("Error"); // 计算结果为 NaN，显示错误
        return;
      }
      setDisplayValue(formatNumber(result)); // 更新显示值为计算结果（格式化）
      setFirstOperand(result); // 将结果设置为新的第一个操作数
    }

    setCurrentOperator(nextOperator); // 设置当前操作符
    setWaitingForSecondOperand(true); // 等待第二个操作数
  };

  // 执行计算
  const performCalculation = (operator: string, firstOperand: number, secondOperand: number): number => {
    switch (operator) {
      case "+":
        return add(firstOperand, secondOperand); // 加法
      case "-":
        return subtract(firstOperand, secondOperand); // 减法
      case "*":
        return multiply(firstOperand, secondOperand); // 乘法
      case "/":
        return divide(firstOperand, secondOperand); // 除法
      default:
        return secondOperand; // 默认返回第二个操作数
    }
  };

  // 处理百分比操作
  const handlePercentage = () => {
    const inputValue = parseFloat(displayValue);
    console.log('inputValue', inputValue)
    if (isNaN(inputValue)) {
      setDisplayValue("Error"); // 输入值为 NaN，显示错误
      return;
    }
    console.log('percentage(inputValue)', percentage(inputValue))
    setDisplayValue(formatNumber(percentage(inputValue))); // 计算并更新显示值为百分比（格式化）
  };

  // 清空计算器
  const handleClear = () => {
    setDisplayValue("0"); // 重置显示值
    setFirstOperand(null); // 清空第一个操作数
    setCurrentOperator(null); // 清空当前操作符
    setWaitingForSecondOperand(false); // 重置等待状态
  };

  // 处理等于操作
  const handleEquals = () => {
    if (currentOperator && firstOperand !== null) {
      const secondOperand = parseFloat(displayValue); // 获取第二个操作数
      if (isNaN(secondOperand)) {
        setDisplayValue("Error"); // 输入值为 NaN，显示错误
        setWaitingForSecondOperand(true); // 设置为等待状态，以便下次输入
        return;
      }
      const result = performCalculation(currentOperator, firstOperand, secondOperand); // 进行计算
      if (isNaN(result)) {
        setDisplayValue("Error"); // 计算结果为 NaN，显示错误
      } else {
        setDisplayValue(formatNumber(result)); // 更新显示值为计算结果（格式化）
      }
      setFirstOperand(null); // 清空第一个操作数
      setCurrentOperator(null); // 清空当前操作符
      setWaitingForSecondOperand(true); // 设置为等待状态，以便下次输入
    }
  };

  // 处理正负取反
  const handleNegate = () => {
    const currentValue = parseFloat(displayValue); // 获取当前值
    if (isNaN(currentValue)) {
      setDisplayValue("Error"); // 输入值为 NaN，显示错误
      setWaitingForSecondOperand(true); // 设置为等待状态，以便下次输入
      return;
    }
    setDisplayValue(formatNumber(negate(currentValue))); // 更新显示值为取反后的值（格式化）
  };

  // 返回 Hook 中的状态和函数
  return {
    displayValue,
    inputDigit,
    inputDecimal,
    handleOperator,
    handlePercentage,
    handleClear,
    handleEquals,
    handleNegate,
  };
};

export default useCalculator; // 导出 Hook
