var displayValue = document.querySelector('#displayValue');
var operator = '';
var firstInput = '';
var secondInput = '';

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(firstOperand, nextOperand, operator){
    if(operator == "+"){
        return add(firstOperand, nextOperand);
    }
    if(operator == "-"){
        return subtract(firstOperand, nextOperand);
    }
    if(operator == "*"){
        return multiply(firstOperand, nextOperand);
    }
    if(operator == "/"){
        return divide(firstOperand, nextOperand);
    }
}

function inputKey(display, button){
    if(display.textContent === '0'){
        display.textContent = button;
    } else{
    display.textContent = display.textContent.concat(button);
    }
}

const keypad = document.querySelectorAll("#number");
const operatorKeys = document.querySelectorAll("#operator");
const equalKey = document.querySelector("#equals");
const clearKey = document.querySelector("#clear");

keypad.forEach((button) => {
    button.addEventListener('click', function(){
        inputKey(displayValue, button.textContent);
    });
});


const operatorList = ['+', '-', '*', '/'];

operatorKeys.forEach((button) => {
    button.addEventListener('click', function(){
        if(operator){
            equalsKey();
            firstInput = displayValue.textContent;
            displayValue.textContent = displayValue.textContent.concat(button.textContent);
        } else if (operatorList.some((operator) => operator == displayValue.textContent.charAt(-1))){
            displayValue.textContent = displayValue.textContent.slice(0, -1).concat(button.textContent);
        } else if(!operator){
            firstInput = displayValue.textContent;
            displayValue.textContent = displayValue.textContent.concat(button.textContent);
        } 
        operator = button.textContent;
    });
});

equalKey.addEventListener('click', function(){
    equalsKey();
})

clearKey.addEventListener('click', function(){
    displayValue.textContent = '0';
    firstInput = '';
    secondInput = '';
    operator = '';
})

function equalsKey(){
    firstInput = parseInt(firstInput);
    secondInput = parseInt(displayValue.textContent.split(operator).pop());
    console.log(firstInput);
    console.log(secondInput);
    console.log(operator);
    displayValue.textContent = operate(firstInput, secondInput, operator);
    operator = '';
}
