var displayValue = document.querySelector('#displayValue');


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

const keypad = document.querySelectorAll(".number");

keypad.forEach((button) => {
    button.addEventListener('click', function(){
        inputKey(displayValue, button.textContent);
    });
});