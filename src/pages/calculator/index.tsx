import React from "react";
import useCalculator from "./useCalculator.ts";
import CalculatorButton from "./CalculatorButton.tsx";

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
    <div className="calculator-page">
      <div className="calculator">
        <div className="calculator-display">
          <div className="calculator-display-text">{displayValue}</div>
        </div>
        <div className="calculator-keypad">
          <CalculatorButton onClick={() => handleClear()}>AC</CalculatorButton>
          <CalculatorButton onClick={() => handleNegate()}>+/-</CalculatorButton> {/* 正负取反按钮 */}
          <CalculatorButton onClick={() => handlePercentage()}>%</CalculatorButton>
          <CalculatorButton onClick={() => handleOperator("/")}>÷</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("7")}>7</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("8")}>8</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("9")}>9</CalculatorButton>
          <CalculatorButton onClick={() => handleOperator("*")}>×</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("4")}>4</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("5")}>5</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("6")}>6</CalculatorButton>
          <CalculatorButton onClick={() => handleOperator("-")}>-</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("1")}>1</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("2")}>2</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("3")}>3</CalculatorButton>
          <CalculatorButton onClick={() => handleOperator("+")}>+</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit("0")} className="zero">
            0
          </CalculatorButton>
          <CalculatorButton onClick={() => inputDecimal()}>.</CalculatorButton>
          <CalculatorButton onClick={() => handleEquals()}>=</CalculatorButton>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
