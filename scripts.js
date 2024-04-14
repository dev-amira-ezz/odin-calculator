"use strict";
// ======= Data Variables =======
const data = {
  num1: "",
  num2: "",
  operator: "",
  chain: false,
};
const previousData = {
  num1: "",
  num2: "",
  operator: "",
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
// Clear Data and operator display. Keep previous data
const clearData = () => {
  previousData.num1 = data.num1;
  previousData.num2 = data.num2;
  previousData.operator = data.operator;
  previousData.chain = data.chain;
  data.num1 = "";
  data.num2 = "";
  data.operator = "";
  data.chain = false;
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
// Number buttons functionality
const getNumber = (entry) => {
  const display = document.querySelector("#display-number");
  if (display.textContent === "Division by zero!") {
    clearData();
    display.textContent = "0";
  }
  if (data.operator === "" && data.chain === false) {
    data.num1 += entry;
    display.textContent = compressNumber(data.num1);
  } else if (data.num1 !== "" && data.operator === "" && data.chain === true) {
    data.num1 = entry;
    data.chain = false;
    display.textContent = compressNumber(data.num1);
  } else if (data.num1 !== "" && data.operator !== "") {
    data.num2 += entry;
    display.textContent = compressNumber(data.num2);
  }
};
// ======= DOM Handling Functions =======
// ======= Keyboard =======
const handleKeydown = (e) => {
  const display = document.querySelector("#display-number");
  const entry = e.key;
  if (!isNaN(entry)) {
    getNumber(entry);
  } else {
    display.textContent = "Invalid entry";
  }
};
// ======= Click Events =======
// ======= Numbers =======
const handleNumber = (number) => {
  const entry = number.textContent;
  getNumber(entry);
};
// ======= Operators =======
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
// ======= Submit =======
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
// ======= All Clear =======
const handleAllClear = () => {
  clearData();
  document.querySelector("#display-number").textContent = "0";
};
// ======= Decimal =======
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
// ======= +/- sign =======
const handleSign = () => {
  let num = "";
  const display = document.querySelector("#display-number");
  data.operator === "" ? (num = data.num1) : (num = data.num2);
  const arr = num.split("");
  arr[0] === "-" ? arr.shift() : arr.unshift("-");
  num = arr.join("");
  display.textContent = num;
  data.operator === "" ? (data.num1 = num) : (data.num2 = num);
};
// Undo
// ======= Undo =======
const handleUndo = () => {
  let num = "";
  const display = document.querySelector("#display-number");
  data.operator === "" ? (num = data.num1) : (num = data.num2);
  const arr = num.toString().split("");
  if (arr.length >= 1) {
    arr.pop();
    num = arr.join("");
    display.textContent = num;
    data.operator === "" ? (data.num1 = num) : (data.num2 = num);
  } else {
    display.textContent = "Entry deleted";
    data.operator === "" ? (data.num1 = num) : (data.num2 = num);
  }
};
// ======= Clear =======
const handleClear = () => {
  data.num1 = previousData.num1;
  data.num2 = previousData.num2;
  data.operator = previousData.operator;
  data.chain = previousData.chain;
  previousData.num1 = "";
  previousData.num2 = "";
  previousData.operator = "";
  previousData.chain = false;
  const display = document.querySelector("#display-number");
  display.textContent = "0";
  const displayOperator = document.querySelector("#display-operator");
  displayOperator.textContent = "";
  displayOperator.style.backgroundColor = "#888";
};
// ======= Event Listeners =======
// ======= Keyboard =======
document.addEventListener("keydown", (e) => handleKeydown(e));
// ======= Click Events =======
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
// Sign
document.querySelector("#sign").addEventListener("click", handleSign);
// Undo
document.querySelector("#undo").addEventListener("click", handleUndo);
// Clear
document.querySelector("#clear").addEventListener("click", handleClear);