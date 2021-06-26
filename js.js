let runningTotal=0;
let buffer = "0"; /* whats on the screen is always a string*/
let previousOperator=null; /* + - / */

const screen = document.querySelector('.screen'); /* taking(returning) the .screen class which shows what the user clicked*/

function init(){
    document.querySelector('.calc-buttons')
   .addEventListener('click',function(event){
       buttonClick(event.target.innerText); /* takes what the user clicked to buttonClick function */
       })
}
function buttonClick(value){    //takes what the user clicked if its a number or an operator
    if(isNaN(value)===true){
        //the user clicked an operator
        handleSYMBOL(value);
    }else{
        //the user clicked a number
        handleNUMBER(value);
    }
    screen.innerText=buffer;//shows it in scren
    console.log(buffer)
}
//returns a string as a number or an operator

function handleNUMBER(num){
    if (buffer==="0"){  //nothing clicked already
        buffer = num;
    }else{
        buffer+=num;  //concatenating string
    }
}

function handleSYMBOL(symbol){
    switch(symbol){
        case 'C':
            buffer='0'
            runningTotal=0;
            break;
        case'=':
            if (previousOperator===null){
                //you need numbers first
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator=null; //clearing
            buffer =runningTotal;
            runningTotal =0; //clearing
            break;
        case'←':
            if(buffer.length===1){
                buffer='0';
            }else{
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        case'+':
        case'-':
        case'×':   
        case'÷':         
            handleMath(symbol);
            break; 
    }
}

function handleMath(symbol){
    if (buffer==='0'){
        //do nothing
        return;
    }
    const intBuffer= parseInt(buffer);  //make the buffer into int
    if(runningTotal===0){
        runningTotal += intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator= symbol;

    buffer='0'; 
}
function flushOperation(intBuffer){
    if(previousOperator==='+'){
        runningTotal+=intBuffer;
    }else if (previousOperator==='-'){
        runningTotal-=intBuffer;
    }else if(previousOperator==='×'){
         runningTotal*=intBuffer;
    }else{
        runningTotal /= intBuffer;
    }
    
}


 init();
