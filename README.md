# Calculator

### Description

This [calculator](https://oneiromancy.github.io/calculator/) offers basic features such as arithmetic operations and memory management (E.g.: C, CE and DEL). My intention with this project was to exercise and structure my codebase adhering to the core principles of modular programming.

### Software design
 
The index.js file contains three function declarations that follow the revealing module design pattern, namely, CalculatorModel, CalculatorView and CalculatorController. 

1. CalculatorModel holds all functionality and informational state of the calculator.

2. CalculatorView updates UI components, namely, the I/O and memory display of the calulator. 

3. CalculatorController is the glue between CalculatorModel and CalculatorView. It listens to user events and coordinates the triggering of methods designed in CalculatorModel and CalculatorView.

### Observation
Editing the index.html to add classes based on button type (number or operator) could have made index.js less convoluted. However, a concious effort to use javascript over HTML must be acknowledged.

## Built With

* HTML
* CSS
* Javascript
