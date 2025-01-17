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
import CalculatorButton, { ButtonVariant } from "./CalculatorButton";
import "../styles/Calculator.scss";
interface ButtonConfig {
  label: string;
  variant: ButtonVariant;
}

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [memoryValue, setMemoryValue] = useState<number | null>(null);
  const [secondFunctionActive, setSecondFunctionActive] = useState(false);

  const evaluateExpression = (expr: string): string => {
    try {
      const normalized = expr
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("−", "-");

      const result = evaluate(normalized);
      if (!isFinite(result)) return "Error";
      return typeof result === "number" ? String(result) : "Error";
    } catch {
      return "Error";
    }
  };

  const handleButtonClick = (label: string) => {
    switch (label) {
      case "AC":
        setDisplayValue("0");
        break;
      case "=":
        setDisplayValue((prev) => evaluateExpression(prev));
        break;
      case "±":
        setDisplayValue((prev) =>
          prev.startsWith("-") ? prev.slice(1) : "-" + prev
        );
        break;
      case "%": {
        const val = Number(evaluateExpression(displayValue));
        setDisplayValue(!isNaN(val) ? String(val / 100) : "Error");
        break;
      }
      case "2nd":
        setSecondFunctionActive(!secondFunctionActive);
        break;
      case "mc":
        setMemoryValue(null);
        break;
      case "m+":
        setMemoryValue((prevMem) => {
          const val = Number(evaluateExpression(displayValue));
          return (prevMem ?? 0) + val;
        });
        break;
      case "m-":
        setMemoryValue((prevMem) => {
          const val = Number(evaluateExpression(displayValue));
          return (prevMem ?? 0) - val;
        });
        break;
      case "mr":
        if (memoryValue !== null) {
          setDisplayValue(String(memoryValue));
        }
        break;
      case "x!": {
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(factorial(val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      }

      case "x²": {
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(pow(val, 2)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      }
      case "x³": {
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(pow(val, 3)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      }
      case "x^y":
        setDisplayValue((prev) => prev + "^");
        break;
      case "y^x":
        setDisplayValue((prev) => prev + "^");
        break;
      case "2^x":
      case "2ˣ":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(pow(2, val)));
        } catch {
          setDisplayValue("Error");
        }
        break;
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
      case "1/x":
        try {
          const val = Number(evaluateExpression(displayValue));
          if (val === 0) setDisplayValue("Error");
          else setDisplayValue(String(1 / val));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "e":
        setDisplayValue((prev) =>
          prev === "0" ? "2.718281828459045" : prev + "*2.718281828459045"
        );
        break;
      case "π":
        setDisplayValue((prev) =>
          prev === "0" ? "3.141592653589793" : prev + "*3.141592653589793"
        );
        break;
      case "EE":
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
      case "log2":
        try {
          const val = Number(evaluateExpression(displayValue));
          setDisplayValue(String(log(val, 2)));
        } catch {
          setDisplayValue("Error");
        }
        break;
      case "logy":
        setDisplayValue((prev) => prev + " log base ??? ");
        break;
      default:
        setDisplayValue((prev) => {
          if (prev === "0" && /\d/.test(label)) {
            return label;
          } else {
            return prev + label;
          }
        });
        break;
    }
  };

  const row1: ButtonConfig[] = [
    { label: "(", variant: "function" },
    { label: ")", variant: "function" },
    { label: "mc", variant: "function" },
    { label: "m+", variant: "function" },
    { label: "m-", variant: "function" },
    { label: "mr", variant: "function" },
    { label: "AC", variant: "function" },
    { label: "±", variant: "function" },
    { label: "%", variant: "function" },
    { label: "÷", variant: "operator" },
  ];

  const row2: ButtonConfig[] = [
    { label: "", variant: "placeholder" },
    { label: "2nd", variant: secondFunctionActive ? "active" : "second" },
    { label: secondFunctionActive ? "x³" : "x²", variant: "function" },
    { label: secondFunctionActive ? "x^y" : "x³", variant: "function" },
    { label: secondFunctionActive ? "y^x" : "x^y", variant: "function" },
    { label: secondFunctionActive ? "2^x" : "2ˣ", variant: "function" },
    { label: "7", variant: "default" },
    { label: "8", variant: "default" },
    { label: "9", variant: "default" },
    { label: "×", variant: "operator" },
  ];

  const row3: ButtonConfig[] = [
    { label: "1/x", variant: "function" },
    { label: "2√x", variant: "function" },
    { label: "3√x", variant: "function" },
    { label: "y√x", variant: "function" },
    { label: "logy", variant: "function" },
    { label: "log2", variant: "function" },
    { label: "4", variant: "default" },
    { label: "5", variant: "default" },
    { label: "6", variant: "default" },
    { label: "−", variant: "operator" },
  ];

  const row4: ButtonConfig[] = [
    { label: secondFunctionActive ? "x!" : "x!", variant: "function" },
    { label: secondFunctionActive ? "sin⁻¹" : "sin", variant: "function" },
    { label: secondFunctionActive ? "cos⁻¹" : "cos", variant: "function" },
    { label: secondFunctionActive ? "tan⁻¹" : "tan", variant: "function" },
    { label: "e", variant: "function" },
    { label: "EE", variant: "function" },
    { label: "1", variant: "default" },
    { label: "2", variant: "default" },
    { label: "3", variant: "default" },
    { label: "+", variant: "operator" },
  ];

  const row5: ButtonConfig[] = [
    { label: "", variant: "placeholder" },
    { label: "sinh⁻¹", variant: "function" },
    { label: "cosh⁻¹", variant: "function" },
    { label: "tanh⁻¹", variant: "function" },
    { label: "π", variant: "function" },
    { label: "Rad", variant: "function" },
    { label: "Rand", variant: "function" },
    { label: "0", variant: "default" },
    { label: ".", variant: "default" },
    { label: "=", variant: "operator" },
  ];

  const allRows = [row1, row2, row3, row4, row5];

  return (
    <div className="calculator-container">
      <div className="calculator-display">
        {memoryValue !== null && <div className="memory-indicator">M</div>}
        <div className="display-text">{displayValue}</div>
      </div>
      <div className="calculator-buttons">
        {allRows.map((row, rowIndex) =>
          row.map((btn, colIndex) => (
            <CalculatorButton
              key={`${rowIndex}-${colIndex}-${btn.label}`}
              label={btn.label}
              variant={btn.variant}
              onClick={handleButtonClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Calculator;
