import React, { useState } from "react";
import {
  evaluate,
  factorial,
  pow,
  log,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
} from "mathjs";
import CalculatorButton from "./CalculatorButton";

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [memoryValue, setMemoryValue] = useState<number | null>(null);
  const [secondFunctionActive, setSecondFunctionActive] = useState(false);

  // Helper to safely evaluate a string expression using mathjs
  const evaluateExpression = (expr: string): string => {
    try {
      // mathjs evaluate
      const result = evaluate(expr);
      return typeof result === "number" ? String(result) : "Error";
    } catch {
      return "Error";
    }
  };

  // Main button click handler
  const handleButtonClick = (label: string) => {
    switch (label) {
      case "AC":
        setDisplayValue("0");
        break;
      case "C":
        // If you prefer "C" as partial clear, you could handle that differently
        setDisplayValue("0");
        break;
      case "mc":
        setMemoryValue(null);
        break;
      case "m+":
        {
          const currentVal = Number(evaluateExpression(displayValue));
          if (!isNaN(currentVal)) {
            setMemoryValue((prev) => (prev ?? 0) + currentVal);
          }
        }
        break;
      case "m-":
        {
          const currentVal = Number(evaluateExpression(displayValue));
          if (!isNaN(currentVal)) {
            setMemoryValue((prev) => (prev ?? 0) - currentVal);
          }
        }
        break;
      case "mr":
        if (memoryValue !== null) {
          setDisplayValue(String(memoryValue));
        }
        break;
      case "=":
        setDisplayValue((prev) => evaluateExpression(prev));
        break;
      case "+/-":
        setDisplayValue((prev) => {
          if (prev.startsWith("-")) return prev.slice(1);
          if (prev === "0") return "0";
          return "-" + prev;
        });
        break;
      case "2nd":
        setSecondFunctionActive(!secondFunctionActive);
        break;
      // handle factorial x!
      case "x!":
        try {
          const val = Number(evaluateExpression(displayValue));
          const result = factorial(val);
          setDisplayValue(String(result));
        } catch {
          setDisplayValue("Error");
        }
        break;
      // handle exponents like x^2, x^3, x^y, etc.
      case "x²":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(pow(val, 2)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "x³":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(pow(val, 3)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "x^y":
        // We’ll just insert ^ for the user to type next number
        setDisplayValue((prev) => prev + "^");
        break;
      // handle trigonometric
      case "sin":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(sin(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "sin⁻¹":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(asin(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "cos":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(cos(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "cos⁻¹":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(acos(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "tan":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(tan(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "tan⁻¹":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(atan(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "π":
        setDisplayValue((prev) =>
          prev === "0" ? "3.141592653589793" : prev + "*3.141592653589793"
        );
        break;
      case "e":
        setDisplayValue((prev) =>
          prev === "0" ? "2.718281828459045" : prev + "*2.718281828459045"
        );
        break;
      case "EE":
        // Insert "e" for scientific notation. Apple uses EE as well.
        setDisplayValue((prev) => prev + "e");
        break;
      case "log":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(log(val, 10)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "ln":
        try {
          // ln is log base e
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(log(val, Math.E)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "log₂":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(log(val, 2)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "%":
        // Typically % is currentVal / 100
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(val / 100));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "1/x":
        try {
          const val = Number(evaluateExpression(displayValue));
          if (val === 0) {
            setDisplayValue("Error");
          } else {
            setDisplayValue(String(1 / val));
          }
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "√":
        setDisplayValue((prev) => `sqrt(${prev})`);
        break;
      case "x^(1/2)":
        // If you prefer to directly evaluate the sqrt:
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(Math.sqrt(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "x^(1/3)":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(Math.cbrt(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "y√x":
        // This might require a second operand so let’s just do:
        setDisplayValue((prev) => `(${prev})^(1/`);
        break;
      case ".":
        setDisplayValue((prev) => (prev.includes(".") ? prev : prev + "."));
        break;
      default:
        // Number or operator
        setDisplayValue((prev) => {
          if (prev === "0" && label.match(/[0-9]/)) {
            // Replace leading zero with digit
            return label;
          } else {
            return prev + label;
          }
        });
        break;
    }
  };

  // Decide which buttons to show based on secondFunctionActive
  const firstRow = [
    { label: "(", variant: "function" },
    { label: ")", variant: "function" },
    { label: "mc", variant: "function" },
    { label: "m+", variant: "function" },
    { label: "m-", variant: "function" },
    { label: "mr", variant: "function" },
    { label: "AC", variant: "function" },
  ];

  const secondRow = [
    {
      label: "2nd",
      variant: secondFunctionActive ? "active" : "second",
    },
    {
      label: secondFunctionActive ? "x³" : "x²",
      variant: "function",
    },
    {
      label: secondFunctionActive ? "x^y" : "x³", // or x^y for advanced
      variant: "function",
    },
    {
      label: secondFunctionActive ? "y^x" : "x^y",
      variant: "function",
    },
    {
      label: secondFunctionActive ? "2^x" : "2ˣ",
      variant: "function",
    },
    { label: "7", variant: "default" },
    { label: "8", variant: "default" },
    { label: "9", variant: "default" },
    { label: "÷", variant: "operator" },
  ];

  const thirdRow = [
    { label: "1/x", variant: "function" },
    { label: "x^(1/2)", variant: "function" },
    { label: "x^(1/3)", variant: "function" },
    { label: "y√x", variant: "function" },
    { label: "log", variant: "function" },
    { label: "4", variant: "default" },
    { label: "5", variant: "default" },
    { label: "6", variant: "default" },
    { label: "×", variant: "operator" },
  ];

  const fourthRow = [
    {
      label: secondFunctionActive ? "x!" : "x!",
      variant: "function",
    },
    {
      label: secondFunctionActive ? "sin⁻¹" : "sin",
      variant: "function",
    },
    {
      label: secondFunctionActive ? "cos⁻¹" : "cos",
      variant: "function",
    },
    {
      label: secondFunctionActive ? "tan⁻¹" : "tan",
      variant: "function",
    },
    { label: "ln", variant: "function" },
    { label: "1", variant: "default" },
    { label: "2", variant: "default" },
    { label: "3", variant: "default" },
    { label: "−", variant: "operator" },
  ];

  const fifthRow = [
    { label: "EE", variant: "function" },
    { label: "Rad", variant: "function" }, // Not fully implemented
    { label: "Rand", variant: "function" }, // Not fully implemented
    { label: "π", variant: "function" },
    { label: "e", variant: "function" },
    { label: "0", variant: "default" },
    { label: ".", variant: "default" },
    { label: "%", variant: "function" },
    { label: "+", variant: "operator" },
  ];

  // The row for = (You can also integrate it in the row above)
  const sixthRow = [{ label: "=", variant: "operator" }];

  // Flatten all rows
  const allButtons = [
    ...firstRow,
    ...secondRow,
    ...thirdRow,
    ...fourthRow,
    ...fifthRow,
    ...sixthRow,
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-display">
        <div className="memory-indicator">
          {memoryValue !== null && <span>M</span>}
        </div>
        <div className="display-text">{displayValue}</div>
      </div>
      <div className="calculator-buttons">
        {allButtons.map((btn) => (
          <CalculatorButton
            key={btn.label}
            label={btn.label}
            variant={btn.variant as any}
            onClick={handleButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
