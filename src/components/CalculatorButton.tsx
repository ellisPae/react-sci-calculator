import React from "react";

interface CalculatorButtonProps {
  label: string;
  onClick: (label: string) => void;
  variant?: "default" | "operator" | "function" | "second" | "active";
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
  variant = "default",
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
