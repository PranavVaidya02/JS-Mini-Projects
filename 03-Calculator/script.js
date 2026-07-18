// ======================
// Select Elements
// ======================

const display = document.querySelector(".display-value");
const expression = document.querySelector(".expression");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const actionButtons = document.querySelectorAll(".action");

// ======================
// Calculator State
// ======================

let currentNumber = "";
let previousNumber = "";
let operator = "";

display.textContent = "0";
expression.textContent = "";

// ======================
// Helper Functions
// ======================

function updateDisplay() {
    display.textContent = currentNumber === "" ? "0" : currentNumber;
}

function getOperatorSymbol(op) {
    switch (op) {
        case "*":
            return "×";
        case "/":
            return "÷";
        case "mod":
            return "MOD";
        default:
            return op;
    }
}

function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === "") return;

    const prev = Number(previousNumber);
    const curr = Number(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = prev + curr;
            break;

        case "-":
            result = prev - curr;
            break;

        case "*":
            result = prev * curr;
            break;

        case "/":

            if (curr === 0) {

                display.textContent = "Error";

                currentNumber = "";
                previousNumber = "";
                operator = "";
                expression.textContent = "";

                return;

            }

            result = prev / curr;
            break;

        case "mod":
            result = prev % curr;
            break;

        default:
            return;

    }

    currentNumber = result.toString();
    previousNumber = "";
    operator = "";

    expression.textContent = "";

    updateDisplay();

}

// ======================
// Number Buttons
// ======================

numberButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if (value === "." && currentNumber.includes(".")) return;

        if (value === ".") {

            if (currentNumber === "") {
                currentNumber = "0.";
            } else {
                currentNumber += ".";
            }

        } else {

            currentNumber += value;

        }

        updateDisplay();

        if (operator !== "") {

            expression.textContent =
                `${previousNumber} ${getOperatorSymbol(operator)} ${currentNumber}`;

        }

    });

});

// ======================
// Operator Buttons
// ======================

operatorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (currentNumber === "") return;

        if (previousNumber !== "" && operator !== "") {

            calculate();

        }

        previousNumber = currentNumber;
        operator = button.dataset.operator;

        expression.textContent =
            `${previousNumber} ${button.textContent}`;

        currentNumber = "";

    });

});

// ======================
// Action Buttons
// ======================

actionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        if (action === "clear") {

            currentNumber = "";
            previousNumber = "";
            operator = "";

            expression.textContent = "";
            updateDisplay();

        }

        else if (action === "delete") {

            currentNumber = currentNumber.slice(0, -1);

            updateDisplay();

            if (operator !== "") {

                expression.textContent =
                    `${previousNumber} ${getOperatorSymbol(operator)} ${currentNumber}`;

            }

        }

        else if (action === "calculate") {

            calculate();

        }

    });

});