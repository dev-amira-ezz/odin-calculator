"use strict";
// ======= Data Variables =======
const data = {
  num1: "",
  num2: "",
  operator: "",
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
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "*":
      multiply(num1, num2);
      break;
    case "/":
      divide(num1, num2);
      break;
  }
};
// ======= DOM Handling Functions =======
// Numbers
const handleNumber = (number) => {
  const display = document.querySelector("#display-number");
  if (data.operator === "") {
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
// ======= Event Listeners =======
// Numbers
document.querySelectorAll(".number").forEach((number) => {
  number.addEventListener("click", () => handleNumber(number));
});
// Operators
document.querySelectorAll(".operator").forEach((operator) => {
  operator.addEventListener("click", () => handleOperator(operator));
});