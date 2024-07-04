document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.innerText = displayValue;
    }

    function inputDigit(digit) {
        if (waitingForSecondOperand) {
            displayValue = digit;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputOperator(nextOperator) {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
        } else if (operator) {
            const result = calculate(firstOperand, parseFloat(displayValue), operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(first, second, operator) {
        if (operator === '+') {
            return first + second;
        } else if (operator === '-') {
            return first - second;
        } else if (operator === '*') {
            return first * second;
        } else if (operator === '/') {
            return first / second;
        }

        return second;
    }

    function resetCalculator() {
        displayValue = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const { value } = event.target.dataset;

            if (!isNaN(value)) {
                inputDigit(value);
            } else if (value === '=') {
                inputOperator(operator);
                operator = null;
            } else if (value === 'C') {
                resetCalculator();
            } else {
                inputOperator(value);
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
