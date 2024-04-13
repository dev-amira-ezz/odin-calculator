"use strict";
// ======= Data Variables =======
let num1 = "";
let num2 = "";
let operator = "";
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
const handleNumber = (number) => {
     const display = document.querySelector("#display");
  if (operator === "") {
    num1 += number.textContent;
    display.textContent = num1;
  } else {
    num2 += number.textContent;
    display.textContent = num2;
  }
};
// ======= Event Listeners =======
document.querySelectorAll(".number").forEach((number) => {
  number.addEventListener("click", () => handleNumber(number));
});
