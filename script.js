// =====================================
// Get Display Elements
// =====================================

const currentDisplay =
    document.getElementById("current-display");

const previousDisplay =
    document.getElementById("previous-display");


// =====================================
// Get Buttons
// =====================================

const numberButtons =
    document.querySelectorAll(".number");

const operatorButtons =
    document.querySelectorAll(".operator");

const clearButton =
    document.querySelector('[data-action="clear"]');

const deleteButton =
    document.querySelector('[data-action="delete"]');

const equalsButton =
    document.querySelector('[data-action="equals"]');


// =====================================
// Calculator Variables
// =====================================

let currentValue = "";

let previousValue = "";

let operation = null;

let shouldResetDisplay = false;


// =====================================
// Add Number
// =====================================

function addNumber(number) {

    // Don't allow multiple decimal points

    if (number === "." && currentValue.includes(".")) {
        return;
    }


    // If display needs reset

    if (shouldResetDisplay) {

        currentValue = "";

        shouldResetDisplay = false;
    }


    // Prevent unnecessary zero

    if (currentValue === "0" && number !== ".") {

        currentValue = number;

    } else {

        currentValue += number;
    }


    updateDisplay();
}


// =====================================
// Choose Operation
// =====================================

function chooseOperation(selectedOperation) {

    // Don't allow operation without number

    if (currentValue === "" &&
        previousValue === "") {
        return;
    }


    // If there is already a calculation

    if (previousValue !== "" &&
        currentValue !== "") {

        calculate();
    }


    operation = selectedOperation;

    previousValue = currentValue;

    currentValue = "";

    shouldResetDisplay = false;

    updateDisplay();
}


// =====================================
// Calculate Result
// =====================================

function calculate() {

    if (
        previousValue === "" ||
        currentValue === "" ||
        operation === null
    ) {
        return;
    }


    const previous =
        parseFloat(previousValue);

    const current =
        parseFloat(currentValue);

    let result;


    // Arithmetic operations

    switch (operation) {

        case "+":
            result = previous + current;
            break;


        case "-":
            result = previous - current;
            break;


        case "*":
            result = previous * current;
            break;


        case "/":

            if (current === 0) {

                currentValue = "Error";

                previousValue = "";

                operation = null;

                updateDisplay();

                return;
            }

            result = previous / current;

            break;


        case "%":
            result = previous % current;
            break;


        default:
            return;
    }


    // Remove unnecessary decimal digits

    result = parseFloat(result.toFixed(10));


    currentValue = result.toString();

    previousValue = "";

    operation = null;

    shouldResetDisplay = true;


    updateDisplay();
}


// =====================================
// Clear Calculator
// =====================================

function clearCalculator() {

    currentValue = "";

    previousValue = "";

    operation = null;

    shouldResetDisplay = false;

    updateDisplay();
}


// =====================================
// Delete Last Character
// =====================================

function deleteNumber() {

    if (shouldResetDisplay) {

        currentValue = "";

        shouldResetDisplay = false;

    } else {

        currentValue =
            currentValue.slice(0, -1);
    }


    updateDisplay();
}


// =====================================
// Update Display
// =====================================

function updateDisplay() {

    // Current value

    currentDisplay.textContent =
        currentValue || "0";


    // Previous calculation

    if (previousValue && operation) {

        let displayOperation =
            operation;


        // Convert symbols

        if (operation === "*") {
            displayOperation = "×";
        }

        if (operation === "/") {
            displayOperation = "÷";
        }

        if (operation === "-") {
            displayOperation = "−";
        }


        previousDisplay.textContent =
            `${previousValue} ${displayOperation}`;

    } else {

        previousDisplay.textContent = "";
    }
}


// =====================================
// Number Button Events
// =====================================

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number =
            button.dataset.number;

        addNumber(number);

    });

});


// =====================================
// Operator Button Events
// =====================================

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedOperation =
            button.dataset.operation;

        chooseOperation(selectedOperation);

    });

});


// =====================================
// Equals Button
// =====================================

equalsButton.addEventListener(
    "click",
    calculate
);


// =====================================
// Clear Button
// =====================================

clearButton.addEventListener(
    "click",
    clearCalculator
);


// =====================================
// Delete Button
// =====================================

deleteButton.addEventListener(
    "click",
    deleteNumber
);


// =====================================
// Keyboard Support
// =====================================

document.addEventListener(
    "keydown",
    (event) => {

        const key = event.key;


        // Numbers

        if (
            !isNaN(key) ||
            key === "."
        ) {

            addNumber(key);

            return;
        }


        // Operators

        if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%"
        ) {

            chooseOperation(key);

            return;
        }


        // Enter / =

        if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

            return;
        }


        // Backspace

        if (key === "Backspace") {

            deleteNumber();

            return;
        }


        // Escape

        if (key === "Escape") {

            clearCalculator();

            return;
        }

    }
);


// =====================================
// Initial Display
// =====================================

updateDisplay();