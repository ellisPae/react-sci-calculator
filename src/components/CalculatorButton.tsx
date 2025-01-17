import React from "react";

export type ButtonVariant =
  | "function"
  | "operator"
  | "active"
  | "second"
  | "default"
  | "placeholder";

interface CalculatorButtonProps {
  label: string;
  variant: ButtonVariant;
  onClick: (label: string) => void;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  variant,
  onClick,
}) => {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <button className={`calc-btn ${variant}`} onClick={handleClick}>
      {label}
    </button>
  );
};

export default CalculatorButton;
