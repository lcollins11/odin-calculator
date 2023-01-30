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
