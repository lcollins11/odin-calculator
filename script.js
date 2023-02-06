//Variables
var operator = '';
var firstInput = '';
var secondInput = '';
const operatorList = ['+', '-', '*', '/'];

var displayValue = document.querySelector('[data-type="display"]');
const keypad = document.querySelectorAll('[data-type="number"]');
const operatorKeys = document.querySelectorAll('[data-type="operator"]');
const equalKey = document.querySelector('[data-type="equals"]');
const clearKey = document.querySelector('[data-type="clear"]');


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
    if(key.match(/^-?\d+$/) || key === '.'){
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
    if(button === '.'){
        if(firstInput){
            if(displayValue.textContent.replace(firstInput, '').includes('.')) return;
        } else if(displayValue.textContent.includes('.')) return;
    }
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
    firstInput = parseFloat(firstInput);
    secondInput = parseFloat(displayValue.textContent.split(operator).pop());
    if(secondInput == 0 && operator == '/'){
        alert("Come on now, you and I both know that won't work...");
        displayValue.textContent = '0';
    } else{
        displayValue.textContent = operate(firstInput, secondInput, operator);
    }
    operator = '';
}


var caseInputs = document.querySelectorAll(".case-input");

var subTotals = document.querySelectorAll('[data-column="subtotal"]');

caseInputs.forEach(input => {
    input.addEventListener('input', () => {
        updateTotals();
    })
})

function updateTotals(){
    updateSubTotals();
}

var caseTotal = document.querySelector('[data-type="case-total"]');
var gridSize = subTotals.length;

function updateSubTotals(){
    var total = 0;
    subTotals.forEach(subTotal => {
        const currentRow = subTotal.dataset.row;
        var price = 0;
        var quantity = 0;
        const rowPrice = document.querySelector(`[data-column="price"][data-row="${currentRow}"]`);
        const rowQuantity = document.querySelector(`[data-column="quantity"][data-row="${currentRow}"]`);
        if(rowPrice.value){
            price = rowPrice.value;
        }
        if(rowQuantity.value){
            quantity = rowQuantity.value;
        }
        subTotal.textContent = price * quantity;
        total += price * quantity;
    })
    console.log(total);
    caseTotal.textContent = total;
}

const caseContainer = document.querySelector('.container-case');
const addRowButton = document.querySelector('[data-type="case-addRow"]');

addRowButton.addEventListener('click', () =>{
    addRow();
})

/**
                                <div data-row="1" data-column="subtotal" class="case-subtotal">0</div>

 */

function addRow() {
    //product
    var newRowProduct = document.createElement('input');
    newRowProduct.dataset.row = gridSize+1;
    newRowProduct.dataset.column = "product";
    newRowProduct.classList.add("case-input");
    newRowProduct.type = "text";
    caseContainer.appendChild(newRowProduct);
    //price
    var newRowPrice = document.createElement('input');
    newRowPrice.dataset.row = gridSize+1;
    newRowPrice.dataset.column = "price";
    newRowPrice.classList.add("case-input");
    newRowPrice.type = "text";
    caseContainer.appendChild(newRowPrice);
    newRowPrice.addEventListener('input', () => {
        updateTotals();
    })
    //quantity
    var newRowQuantity = document.createElement('input');
    newRowQuantity.dataset.row = gridSize+1;
    newRowQuantity.dataset.column = "quantity";
    newRowQuantity.classList.add("case-input");
    newRowQuantity.type = "text";
    caseContainer.appendChild(newRowQuantity);
    newRowQuantity.addEventListener('input', () => {
        updateTotals();
    })
    //subtotal
    var newRowSubtotal = document.createElement('div');
    newRowSubtotal.dataset.row = gridSize+1;
    newRowSubtotal.dataset.column = "subtotal";
    newRowSubtotal.classList.add("case-subtotal");
    newRowSubtotal.textContent = 0;
    caseContainer.appendChild(newRowSubtotal);
    subTotals = document.querySelectorAll('[data-column="subtotal"]');
    caseInputs = document.querySelectorAll(".case-input");
    gridSize++;
}

