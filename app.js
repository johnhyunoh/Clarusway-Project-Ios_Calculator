const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");
const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equal");
const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const percentButton = document.querySelector(".percent");

// Operator variables
let previousOperand = "";
let currentOperand = "";
let operation = "";

let equalOrPercentBtnPressed = false;

// numbers and decimal buttons event
numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.textContent);
    updateDisplay();
  });
});

// Operator button
operationButtons.forEach((op) => {
  op.addEventListener("click", () => {
    chooseOperator(op.textContent);
    updateDisplay();
  });
});

// Equal button
equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
  equalOrPercentBtnPressed = true;
});

// AC button
acButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});

// +- button
pmButton.addEventListener("click", () => {
  plusMinus();
  updateDisplay();
});

// % button
percentButton.addEventListener("click", () => {
  percent();
  updateDisplay();
  equalOrPercentBtnPressed = true;
});

// inputting decimals
const appendNumber = (num) => {
  // Avoids multiple decimals
  if (num === "." && currentOperand.includes("."))
    return;

  // Avoids multiple zeros
  if (currentOperand === "0" && num === "0")
    return;
  if (num == "." && currDisp.innerText.includes("") && currentOperand != '0' && currentOperand != '0.' && currDisp.innerText == 0 ) num = '0.';
  // Avoids zeros and decimals together
  if (currentOperand === "0" && num !== "0" && num !== ".") {
    currentOperand = num;
    return;
  }
  // if for max digits
  if (currentOperand.length > 10) return;

  if (equalOrPercentBtnPressed) {
    equalOrPercentBtnPressed = false; //* clear for next usage
    currentOperand = num;
    return;
  }
  currentOperand += num;
};

// Display the numbers and computation
const updateDisplay = () => {
  // if computation or number is too long, it trims

  if (currentOperand.toString().length > 12) {
    currentOperand = currentOperand.toString().slice(0, 12);
  }
  currDisp.textContent = currentOperand;

  
  // avoids ending in a decimal after op
  if (operation != null) {
    if(previousOperand[previousOperand.length-1] == '.') {
      previousOperand = previousOperand.slice(0, -1);
    }

    prevDisp.textContent = `${previousOperand} ${operation}`;
  } else {
    prevDisp.textContent = "";
  }
};
const chooseOperator = (op) => {
  // avoids empty second numbers
  if (currentOperand === "") return;

  // avoids multiple ops
  if (previousOperand) {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
};

const compute = () => {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }
    // Resets after completing equation
  currentOperand = computation;
  operation = "";
  previousOperand = "";
};

// Clearing with AC
const clear = () => {
  operation = "";
  previousOperand = "";
  currentOperand = "0";
  updateDisplay()
};

const plusMinus = () => {
  if (!currentOperand && currentOperand != '0') return;
  currentOperand = currentOperand * -1;
};

// Switching to %
const percent = () => {
  if (!currentOperand) return;
  currentOperand = currentOperand / 100;
};