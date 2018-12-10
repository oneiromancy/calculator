const CalculatorModel = (() => {
    let memory = [];

    const arithmeticOperators = {
        "+": (y, z) => {
            return y + z;
        },

        "−": (y, z) => {
            return y - z;
        },

        "÷": (y, z) => {
            return y / z;
        },

        "×": (y, z) => {
            return y * z;
        }
    };

    const specialOperators = {

        // Clears all previous operations stored in memory
        "C": () => {
            memory = [];
        },

        // Clears the last memory entry with a zero iff it is a numerical value     
        "CE": () => {
            if (!isNaN(memory[memory.length - 1])) {
                memory[memory.length - 1] = 0;
            } 
        },

        "DEL": () => {
            numberStringfied = String(memory[memory.length - 1]);

            if (!isNaN(numberStringfied)) {
                if (numberStringfied.length > 1) {
                    // Deletes the last digit that composes the last numerical entry stored in memory
                    memory[memory.length - 1] = numberStringfied.slice(0, numberStringfied.length - 1);
                } else {
                    // Replaces the last numerical entry stored in memory with a zero if the former is a single digit
                    memory[memory.length - 1] = 0;
                }
            }
        },

        ".": () => {
            // Inserts a dot to represent real numbers and prevents it from being used more than once in any one numerical value
            if (!isNaN(memory[memory.length - 1]) && !String(memory[memory.length - 1]).includes('.')) {
                memory[memory.length - 1] += '.';
            }
        },

        "=": () => {
            // Computes the output of all previous entries stored in memory and stores it in a newly formed memory array
            memory = (computeOutput() !== undefined) ? [computeOutput()] : [];
        },

        "√": () => {
            // Computes the square root of the last memory entry iff it's a number
            if(!isNaN(memory[memory.length - 1])){
                memory[memory.length - 1] = Math.sqrt(memory[memory.length - 1]);
            }
        }

    };

    const operatorType = (operator) => {
        if (typeof arithmeticOperators[operator] === "function") {
            return 'arithmetic operator';
        } else if (typeof specialOperators[operator] === "function") {
            return 'special operator';
        }
    };

    const storeNumber = (numericalDigit) => {
        if (isNaN(memory[memory.length - 1]) || memory.length == 0) {
            memory.push(numericalDigit);
        } else {
            // Merge user input with last memory entry if both are numbers
            let mergeDigits = String(memory[memory.length - 1]) + String(numericalDigit);

            memory[memory.length - 1] = (numericalDigit == 0)? mergeDigits: Number(mergeDigits);
            /* 
                Observations: There are two side-effects of the Number() wrapper object

                - 05 becomes 5, which is quite a useful feature for correct number storage
                - A negative side-effect, however, is the removal of the number zero when it is inserted after a decimal point.
                E.g.: If a user were to attempt to enter 1.05, he would not be able to do so since Number() would always rearrange
                1.0 to 1 and thus the user would never get to 1.05. This negative side-effect can be easily remedied with 
                String coercion as shown above.
            */
        }
    };

    const storeOperator = (arithmeticOp) => {
        // Permits the use of arithmetic operators as the first input of users by introducing a zero prior to its insertion
        if (memory.length === 0) {
            memory.push(0, arithmeticOp);
        } else {
            // Inserts an arithmetic operator iff a numerical value preceeds it
            if (!isNaN(memory[memory.length - 1])) {
                memory.push(arithmeticOp);
            } else {
                // Replaces an arithmetic operator with a new one of the same type 
                memory[memory.length - 1] = arithmeticOp;
            }
        }
    };

    const computeOutput = () => {
        let output = Number(memory[0]);

        // Output computation requires at least one operator and two operands as a initial condition
        if(memory.length >= 3){

            for (let i = 1; i < memory.length - 1; i += 2) {
                output = arithmeticOperators[memory[i]](Number(output), Number(memory[i + 1]));
            }

        }
            
        return output

    };

    // The final three functions shown below are the getters of CalculatorModel and they share the informational state 
    // with CalculatorController
    const getOutput = () => {
        return computeOutput()
    };

    const getMemory = () => {
        return memory.join("");
    };

    const getLastMemoryEntry = () => {
        return memory[memory.length - 1]
    }

    return {
        operatorType,
        storeNumber,
        storeOperator,
        specialOperators,
        getOutput,
        getMemory,
        getLastMemoryEntry
    };
})();

const CalculatorController = (() => {

    const btns = document.getElementsByTagName("button");

    // Inserts click event listeners onto calculator buttons    
    for (let i = 0; i < btns.length; i++) {

        btns[i].onclick = function () {

            // The following conditional statements process user input based on type <=> an operator or a number

            if (isNaN(this.innerHTML)) {
                let operatorType = CalculatorModel.operatorType(this.innerHTML);

                if (operatorType === 'arithmetic operator') {
                    // Stores operator in memory if it is an aritmethic one
                    CalculatorModel.storeOperator(this.innerHTML);
                } else if (operatorType === 'special operator') {
                    // A special operator affects memory but is not stored inside it
                    CalculatorModel.specialOperators[this.innerHTML]();
                }

            } else {
                CalculatorModel.storeNumber(Number(this.innerHTML));
            }

            /* 
                The following conditional statements update the screen display by calling CalculatorView to update the View Layer.
                Note that the calculator screen displays both a memory and I/O section
                The data displayed in the I/O section is dependent upon whether the last memory entry is a number, operator, 
                or neither (empty memory array).
            */
            if (CalculatorModel.getMemory() === "") {
                CalculatorView.updateScreenDisplay(0, "");

            // Displays user input if the previous entry stored in memory is a number       
            } else if (!isNaN(CalculatorModel.getLastMemoryEntry())) {
                CalculatorView.updateScreenDisplay(
                    CalculatorModel.getLastMemoryEntry(),
                    CalculatorModel.getMemory()
                );

            // Displays the output if the previous entry stored in memory is an operator            
            } else if(isNaN(CalculatorModel.getLastMemoryEntry())){

                CalculatorView.updateScreenDisplay(
                    CalculatorModel.getOutput(),
                    CalculatorModel.getMemory()
                );
            }

        };
    }

})();

const CalculatorView = (() => {

    const updateScreenDisplay = (io, memory) => {
        const ioDisplay = document.querySelector(".Screen__IO");
        const memoryDisplay = document.querySelector(".Screen__Memory");

        ioDisplay.innerHTML = io;
        memoryDisplay.innerHTML = memory;
    };

    return {
        updateScreenDisplay
    };
})();
