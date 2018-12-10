[Calculator](https://oneiromancy.github.io/calculator/)
    
This calculator offers basic features such as arithmetic operations and memory management (I.e.: C, CE and DEL).  

The js file contains three function declarations that follow the revealing module design pattern, namely, 
CalculatorModel, CalculatorView and CalculatorController. 

CalculatorModel holds all functionality and informational state of the calculator.

CalculatorView updates UI components, namely, the I/O and memory display of the calculator. 

CalculatorController is the glue between CalculatorModel and CalculatorView. It listens to user events and 
triggers data retrieval and manipulation via CalculatorModel and UI update via CalculatorView.
