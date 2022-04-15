class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operator = undefined;
    }
    //operator is set to undefine as when the screen is cleared, no operator is selected. clear function clears the display screen.
    
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    /** delete function deletes the current value on screen chooping it off from the back
     * the tostring method converts the number to string then the slice method, does the work of cutting off
     * from the last index of the string.
    */
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    /**appendNumber function adds numbers to the display screen
     * the if statement is to ensure that the period only gets added once,
     *  no matter how many times the user clicks on it.
     * toString method used is to ensure that the javacripts concatenate the numbers as string instead of numbers
     */
  
    chooseOperator(operator) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operator = operator;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
    //chooseOperator selects operator, determines what happens before, during and after computation. 
    
    compute() {
      let computation;   
      const previous = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(previous) || isNaN(current)) return;
      switch (this.operator) {
        case '+':
          computation = previous + current;
          break
        case '-':
          computation = previous - current;
          break
        case '*':
          computation = previous * current;
          break
        case '÷':
          computation = previous / current;
          break
        default:
          return;
      }
      this.currentOperand = computation;
      this.operator = undefined;
      this.previousOperand = '';
    }
    /**the parseFloat converts the string to number, this allows for the values are concantenated as numbers
     * isNaN function checks that the value passed is a number else the function cancels.
     * switch statements is a chain of instructions of what to be done when each operator is selected
     */
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)){
        integerDisplay = '';
      }else{
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      }else{
        return integerDisplay;
      }
    }
    /**the parseFloat converts he number to string while the split method splits into an array, the part before the period 
     * and the part after it.
     * line 76, get the first part of the array first 'integer part', then line 78 get the second part 'decimal part', this part is a string
     * line 79-80, if no digit is selected, no interger should be display
     * line 81, else display the integers as string, seperated by commas, allowing no decimal place after integer value gets converted to a string
     *line 84-87 if a period is selected, display the integer digits followed by the decimal point then decimal values, otherwise display only the integer digits
     * 
     */

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operator != null){
          this.previousOperandTextElement.innerText = 
          `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        }else{
          this.previousOperandTextElement.innerText = '';
        }
      }
}   
  
  const numberButtons = document.querySelectorAll('[data-number]');
  const operatorButtons = document.querySelectorAll('[data-operator]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-all-clear]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperator(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })