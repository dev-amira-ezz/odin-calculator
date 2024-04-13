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
        document.querySelector("#display-operator").textContent = "";
        document.querySelector("#display-operator").style.backgroundColor =
          "#888";
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
    handleAllClear();
  } else if (data.operator === "") {
    data.num1 += number.textContent;
    display.textContent = data.num1;
  } else {
    data.num2 += number.textContent;
    display.textContent = data.num2;
  }
};
// Operators
const handleOperator = (operator) => {
  const displayOperator = document.querySelector("#display-operator");
  data.operator = operator.textContent;
  displayOperator.textContent = operator.textContent;
  displayOperator.style.backgroundColor = "#333";
  displayOperator.style.color = "#ddd";
};
// Submit
const handleSubmit = () => {
  const display = document.querySelector("#display-number");
  // Clicking = before all data entered
  if (data.num1 === "" || data.num2 === "" || data.operator === "") {
    display.textContent = "Incomplete data!";
  } else {
    data.result = operate(data.num1, data.num2, data.operator);
    display.textContent = data.result;
    // Reset current data values for chain calculations
    data.num1 = data.result;
    data.num2 = "";
    data.operator = "";
    data.result = "";
  }
};
// All Clear
const handleAllClear = () => {
  data.num1 = "";
  data.num2 = "";
  data.operator = "";
  data.result = "";
  document.querySelector("#display-number").textContent = "0";
  const displayOperator = document.querySelector("#display-operator");
  displayOperator.textContent = "";
  displayOperator.style.backgroundColor = "#888";
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
