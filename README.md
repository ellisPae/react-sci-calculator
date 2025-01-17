# React Scientific Calculator

A **React + TypeScript** scientific calculator that mimics the look and functionality of the Apple Scientific Calculator. Includes keyboard support, memory functions, and various scientific operations.


## Features
- **Scientific Layout** with a 10-column grid for Apple-like alignment.
- **Toggle for “2nd”** to switch between standard and advanced functions (e.g., sin ↔ sin⁻¹).
- **Memory Functions**: mc, m+, m−, mr.
- **Common Scientific Operations** (exponents, factorial, logs, trig, etc.).
- **Placeholder Buttons** to maintain alignment and match the Apple aesthetic.
- **Keyboard Support** (optional) so users can type digits and operators.

## Installation

You can use either **npm** or **yarn** for your package manager.

`npm install`
`npm install`

(Optional) If you don’t have it already, install mathjs for secure math evaluation:
`npm install math.js`
or
`yarn add math.js`

## Running Locally
`npm start`
or
`yarn start`

Open http://localhost:3000 to view the app in your browser.
The page will reload if you make edits, and you will see any lint errors in the console.

## Files Overview
	•	`src/components/Calculator.tsx`
Core logic for the calculator, including the layout (rows/columns), button definitions, and main state (display value, memory, second-function toggle).
	•	`src/components/CalculatorButton.tsx`
A reusable button component. It accepts label, variant, and a click callback.
	•	`src/styles/Calculator.scss`
SCSS styles for the calculator layout, button variants (function/operator/placeholder), and the main display.
	•	`src/App.tsx`
A simple wrapper that renders `<Calculator />`.

## Customizing the Layout
	•	To change button labels or re-position them, edit the row arrays (e.g., row1, row2, etc.) in Calculator.tsx.
	•	Ensure each row has 10 items if you’re using a 10-column grid, including placeholder buttons to align operators on the far right.

Known Limitations
	•	Some advanced scientific functions (like custom log base, degrees vs. radians) may need additional handling in code.
	•	eval-like calls are replaced by mathjs for safer parsing, but partial expressions can still throw errors.

Contributing
	•	Fork this repo, create a new branch for your feature/fix, and open a pull request.
	•	Keep an eye on lint warnings and code style.



Enjoy your React Scientific Calculator! Feel free to expand it with more functions, better styling, or even a “dark/light” mode toggle.
