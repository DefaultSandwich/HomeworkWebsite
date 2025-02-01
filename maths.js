//python -m http.server 8000

let x;
let y;
let operation;
let answer;



function newQuestion(){
    document.getElementById("check").style.visibility = "visible"
    document.getElementById("answer").style.visibility = "hidden"

     operation = Math.floor(Math.random()*4)
   
    x = Math.floor(Math.random()*10)+1
    y = Math.floor(Math.random()*10)+1

 if (operation == 0){
    //addition
    document.getElementById("question").innerHTML = String(x) + "+" + String(y);
    answer = x +y;
 }
 if (operation == 1){
    //subtraction
    if (x < y){
        //swap x and y
        let i
        i = x
        x = y
        y = i
    }
    document.getElementById("question").innerHTML = String(x) + "−" + String(y);
    answer = x -y;
 }
 if (operation == 2){
    //multiplication
    document.getElementById("question").innerHTML = String(x) + "×" + String(y);
    answer = x *y;
 }
 if (operation == 3){
    //division
    y+=2
    y= Math.floor(y/2)
    x+=3
    x = x*y
    document.getElementById("question").innerHTML = String(x) + "÷" + String(y);
    answer = x / y;
 }

 
}

function showAnswer() {
    document.getElementById("answer").innerHTML = "<b>="+String(answer);
    document.getElementById("answer").style.visibility = "visible"
    document.getElementById("check").style.visibility = "hidden"
}