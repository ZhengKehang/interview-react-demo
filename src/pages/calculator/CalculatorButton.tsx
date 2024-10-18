import React from "react";
import {Button, ButtonProps} from "antd";

const CalculatorButton: React.FC<Partial<ButtonProps>> = ({className,...props}) => {
  return <Button className={`calculator-button ${className ? className : ''}`} {...props} />
}

export default CalculatorButton;
