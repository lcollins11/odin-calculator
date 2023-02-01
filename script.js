//Variables
var operator = '';
var firstInput = '';
var secondInput = '';
const operatorList = ['+', '-', '*', '/'];

var displayValue = document.querySelector('#displayValue');
const keypad = document.querySelectorAll("#number");
const operatorKeys = document.querySelectorAll("#operator");
const equalKey = document.querySelector("#equals");
const clearKey = document.querySelector("#clear");


//Event Listeners
keypad.forEach((button) => {
    button.addEventListener('click', function(){
        inputKey(button.textContent);
    });
});

operatorKeys.forEach((button) => {
    button.addEventListener('click', function(){
        addOperator(button.textContent);
    });
});

equalKey.addEventListener('click', function(){
    equalsKey();
})

clearKey.addEventListener('click', function(){
    clearAll();
})

window.addEventListener('keydown', function(e){
    processInput(e.key);
});

//Helper Functions
function processInput(key){
    if(key.match(/^-?\d+$/)){
        inputKey(key);
    }
    if(operatorList.some((element) => element == key)){
        addOperator(key);
    }
    if(key == '=' || key == 'Enter'){
        equalsKey();
    }
}

function operate(firstOperand, nextOperand, operator){
    if(operator == "+"){
        return firstOperand + nextOperand;
    }
    if(operator == "-"){
        return firstOperand - nextOperand;
    }
    if(operator == "*"){
        return firstOperand * nextOperand;
    }
    if(operator == "/"){
        return firstOperand / nextOperand;
    }
}


//Button Functions
function inputKey(button){
    if(displayValue.textContent === '0'){
        displayValue.textContent = button;
    } else{
    displayValue.textContent = displayValue.textContent.concat(button);
    }
}

function addOperator(button){
    if (operatorList.some((element) => element == displayValue.textContent.charAt(displayValue.textContent.length-1))){
        displayValue.textContent = displayValue.textContent.slice(0, -1).concat(button);
    } else if(operator){
        equalsKey();
        firstInput = displayValue.textContent;
        displayValue.textContent = displayValue.textContent.concat(button);
    } else if(!operator){
        firstInput = displayValue.textContent;
        displayValue.textContent = displayValue.textContent.concat(button);
    } 
    operator = button;
}

function clearAll(){
    displayValue.textContent = '0';
    firstInput = '';
    secondInput = '';
    operator = '';
}

function equalsKey(){
    if(!firstInput || !operator || operatorList.some((operator) => operator == displayValue.textContent.charAt(displayValue.textContent.length-1))){
        return;
    }
    firstInput = parseInt(firstInput);
    secondInput = parseInt(displayValue.textContent.split(operator).pop());
    console.log(firstInput);
    console.log(secondInput);
    console.log(operator);
    if(secondInput == 0 && operator == '/'){
        alert("Come on now, you and I both know that won't work");
        displayValue.textContent = '0';
    } else{
        displayValue.textContent = operate(firstInput, secondInput, operator);
    }
    operator = '';
}
