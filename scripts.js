"use strict";
// ======= Data Variables =======
const data = {
  num1: "",
  num2: "",
  operator: "",
  result: "",
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
// ======= DOM Handling Functions =======
// Numbers
const handleNumber = (number) => {
  const display = document.querySelector("#display-number");
  if (display.textContent === "Division by zero!") {
    clearData();
    display.textContent = "0";
  }
  if (data.operator === "") {
    data.num1 += parseFloat(number.textContent);
    display.textContent = data.num1;
  } else {
    data.num2 += number.textContent;
    display.textContent = data.num2;
  }
};
// Operators
const handleOperator = (operator) => {
  if (data.num1 !== "" && data.num2 !== "") {
    handleSubmit();
    data.operator = operator.textContent;
    console.log(data);
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
    display.textContent = data.num1;
  }
};

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

// All Clear
const handleAllClear = () => {
  clearData();
  document.querySelector("#display-number").textContent = "0";
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
document
  .querySelector("#submit")
  .addEventListener("click", () => handleSubmit());
// All Clear
document
  .querySelector("#all-clear")
  .addEventListener("click", () => handleAllClear());
