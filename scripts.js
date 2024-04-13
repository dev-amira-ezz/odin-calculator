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
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
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
// Submit
const handleSubmit = () => {
  const result = operate(data.num1, data.num2, data.operator);
  document.querySelector("#display-number").textContent = result;
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
