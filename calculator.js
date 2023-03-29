class Calculator {
  constructor() {
    this.total = 0;
  }
  add(number) {
    this.total = this.total + number;
    return this.total;
  }
  substract(number) {
    this.total = this.total - number;
    return this.total;
  }
  multiply(number) {
    this.total = this.total * number;
    return this.total;
  }
  divide(number) {
    if (number === 0) {
      throw new Error("Number cannot be zero");
    }
    this.total = this.total / number;
    return this.total;
  }
}

function calculate(value) {
  const inputValue = value;
  const expression = /\+|\-|\*|\//;
  const numbers = inputValue.split(expression);
  console.log(numbers);
  const numberA = parseInt(numbers[0]);
  console.log(numberA);
  const numberB = parseInt(numbers[1]);
  console.log(numberB);
  const operation = inputValue.match(expression);

  if (operation === null || isNaN(numberA) || isNaN(numberB)) {
    updateResult("Operation not recognised");
    return;
  }
  const operator = operation[0];

  const cal = new Calculator();
  cal.add(numberA);

  let result;
  switch (operator) {
    case "+":
      result = cal.add(numberB);
      break;
    case "-":
      result = cal.substract(numberB);
      break;
    case "*":
      result = cal.multiply(numberB);
      break;
    case "/":
      result = cal.divide(numberB);
      break;
  }

  updateResult(result);
}

function updateResult(result) {
  let element = document.getElementById("result");
  if (element) {
    element.innerText = result;
  }
}

document.getElementById("input-value") &&
  document
    .getElementById("input-value")
    .addEventListener("change", function (event) {
      calculate(event.target.value);
    });

// Object.defineProperty(Calculator.prototype, "version", {
//   get: function () {
//     return "0.1";
//   },
//   configurable: true,
//   enumerable: true,
// });

Object.defineProperty(Calculator.prototype, "version", {
  get: function () {
    return fetch(
      "https://gist.githubusercontent.com/leelanarasimha/4b3dde448c828ec54f29fcc727c680df/raw/096bb0f055877c5f8e7243518be7be03772d2c4a/version.json"
    )
      .then(function (result) {
        return result.json();
      })
      .then(function (jsonData) {
        return jsonData.version;
      });
  },
  configurable: true,
  enumerable: true,
});

function showVersion() {
  const calculator = new Calculator();
  const element = document.getElementById("version");
  if (element) {
    element.innerText = calculator.version;
  }
}
