import React from "react";
import useCalculator from "./useCalculator.ts";

import './index.less'

const Calculator: React.FC = () => {
  const {
    displayValue,
    inputDigit,
    inputDecimal,
    handleOperator,
    handlePercentage,
    handleClear,
    handleEquals,
    handleNegate,
  } = useCalculator();

  return (
    <div className="calculator">
      <div className="calculator-display">{displayValue}</div>
      <div className="calculator-keypad">
        <button onClick={() => handleClear()}>AC</button>
        <button onClick={() => handleNegate()}>+/-</button> {/* 正负取反按钮 */}
        <button onClick={() => handlePercentage()}>%</button>
        <button onClick={() => handleOperator("/")}>÷</button>
        <button onClick={() => inputDigit("7")}>7</button>
        <button onClick={() => inputDigit("8")}>8</button>
        <button onClick={() => inputDigit("9")}>9</button>
        <button onClick={() => handleOperator("*")}>×</button>
        <button onClick={() => inputDigit("4")}>4</button>
        <button onClick={() => inputDigit("5")}>5</button>
        <button onClick={() => inputDigit("6")}>6</button>
        <button onClick={() => handleOperator("-")}>-</button>
        <button onClick={() => inputDigit("1")}>1</button>
        <button onClick={() => inputDigit("2")}>2</button>
        <button onClick={() => inputDigit("3")}>3</button>
        <button onClick={() => handleOperator("+")}>+</button>
        <button onClick={() => inputDigit("0")} className="zero">
          0
        </button>
        <button onClick={() => inputDecimal()}>.</button>
        <button onClick={() => handleEquals()}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
