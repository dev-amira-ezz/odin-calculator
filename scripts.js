"use strict";
// ======= Data Variables =======
const data = {
  num1: "",
  num2: "",
  operator: "",
  result: "",
  chain: false,
};
// ======= Math Functions =======
// Add
const add = (num1, num2) => {
  return parseFloat(num1) + parseFloat(num2);
};
// Subtract
const subtract = (num1, num2) => {
  return num1 - num2;
};
// Multiply
const multiply = (num1, num2) => {
  return num1 * num2;
};
// Divide
const divide = (num1, num2) => {
  return num1 / num2;
};
// ======= Operate Function =======
const operate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if (num2 === "0") {
        clearData();
        return "Division by zero!";
      } else {
        return divide(num1, num2);
      }
  }
};
// ======= Helper Functions =======
// Clear Data and operator display
const clearData = () => {
  data.num1 = "";
  data.num2 = "";
  data.operator = "";
  data.result = "";
  const displayOperator = document.querySelector("#display-operator");
  displayOperator.textContent = "";
  displayOperator.style.backgroundColor = "#888";
};
// Convert large number to exponentiation
const compressNumber = (num) => {
  const display = document.querySelector("#display-number");
  if (num.length > 12) {
    return (num = parseFloat(num).toExponential("9"));
  } else {
    return num;
  }
};
// ======= DOM Handling Functions =======
// Numbers
const handleNumber = (number) => {
  const display = document.querySelector("#display-number");
  if (display.textContent === "Division by zero!") {
    clearData();
    display.textContent = "0";
  }
  if (data.operator === "" && data.chain === false) {
    data.num1 += number.textContent;
    display.textContent = compressNumber(data.num1);
  } else if (data.num1 !== "" && data.operator === "" && data.chain === true) {
    data.num1 = number.textContent;
    data.chain = false;
    display.textContent = compressNumber(data.num1);
  } else if (data.num1 !== "" && data.operator !== "") {
    data.num2 += number.textContent;
    display.textContent = compressNumber(data.num2);
  }
};
// Operators
const handleOperator = (operator) => {
  if (data.num1 !== "" && data.num2 !== "") {
    handleSubmit();
    data.operator = operator.textContent;
  } else {
    const displayOperator = document.querySelector("#display-operator");
    data.operator = operator.textContent;
    displayOperator.textContent = operator.textContent;
    displayOperator.style.backgroundColor = "#333";
    displayOperator.style.color = "#ddd";
  }
};
// Submit
const handleSubmit = () => {
  const display = document.querySelector("#display-number");
  // Clicking = before all data entered
  if (data.num1 === "" || data.num2 === "" || data.operator === "") {
    display.textContent = "Incomplete data!";
  } else {
    const result = operate(data.num1, data.num2, data.operator);
    // Reset current data values for chain calculations
    clearData();
    data.num1 = result;
    data.chain = true;
    display.textContent = compressNumber(data.num1.toString());
  }
};
// All Clear
const handleAllClear = () => {
  clearData();
  document.querySelector("#display-number").textContent = "0";
};
// Decimal
const handleDecimal = () => {
  let num = "";
  const display = document.querySelector("#display-number");
  data.operator === "" ? (num = data.num1) : (num = data.num2);
  if (!num.includes(".")) {
    num.length === 0 ? (num += `0${"."}`) : (num += ".");
  }
  display.textContent = num;
  data.operator === "" ? (data.num1 = num) : (data.num2 = num);
};

// ======= Event Listeners =======
// Numbers
document.querySelectorAll(".number").forEach((number) => {
  number.addEventListener("click", () => handleNumber(number));
});
// Operators
document.querySelectorAll(".operator").forEach((operator) => {
  operator.addEventListener("click", () => handleOperator(operator));
});
// Submit
document.querySelector("#submit").addEventListener("click", handleSubmit);
// All Clear
document.querySelector("#all-clear").addEventListener("click", handleAllClear);
// Decimal
document.querySelector("#decimal").addEventListener("click", handleDecimal);
