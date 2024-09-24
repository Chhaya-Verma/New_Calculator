let firstNumber = "";
let secondNumber = "";
let operator = "";
const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

// Function to update the display
function updateDisplay(value) {
    inputBox.value = value;
}

// for adding
function add(num1, num2) {
    return num1 + num2;
}

// for sub
function subtract(num1, num2) {
    return num1 - num2;
}

// for mul
function multiply(num1, num2) {
    return num1 * num2;
}

// for divide
function divide(num1, num2) {
    if (num2 === 0) {
        alert("Cannot divide by zero");
        return "Error";
    }
    return num1 / num2;
}

// Calculation ko handle karne ka function based on operator
function calculate(firstNumber, secondNumber, operator) {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result;

    switch (operator) {
        case '+':
            result = add(num1, num2);  

            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break; 
        case '%':
            result = num1 % num2;
            break;

        default:
            result = "Error";
    }

    return result; 

}

// Handling button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        
        if (value === 'AC') {
            // AC: Reset everything
            firstNumber = "";
            secondNumber = "";
            operator = "";
            updateDisplay(0);
        }
        else if (value === 'DEL') {
            // DEL: Delete the last character
            if (secondNumber) {
                secondNumber = secondNumber.slice(0, -1);
            } else if (operator) {
                operator = "";
            } else {
                firstNumber = firstNumber.slice(0, -1);
            }
            updateDisplay(firstNumber || secondNumber || 0);
        }
        else if (value === '=') {
            // Equals: Perform calculation
            if (firstNumber && secondNumber && operator) {
                const result = calculate(firstNumber, secondNumber, operator);
                updateDisplay(result);
                firstNumber = result.toString();
                secondNumber = "";
                operator = "";
            } else if (firstNumber && operator) {
                // If no second number is entered, use the first number as both operands
                const result = calculate(firstNumber, firstNumber, operator);
                updateDisplay(result);
                firstNumber = result.toString();
                secondNumber = "";
                operator = "";
            }
        }
        else if (['+', '-', '*', '/','%'].includes(value)) {
            // Operator handling
            if (!operator && firstNumber) {
                operator = value;
                updateDisplay(firstNumber + value);
            }
        }
        else if (!isNaN(value) || value === '.') {
            // Number or decimal point handling
            if (operator) {
                secondNumber += value;
                updateDisplay(secondNumber);
            } else {
                firstNumber += value;
                updateDisplay(firstNumber);
            }
        }
    });
});