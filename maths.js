//python -m http.server 8000

let x
let y

newQuestion()

function newQuestion(){

 x = Math.floor(Math.random()*10)+1
 y = Math.floor(Math.random()*10)+1
 document.getElementById("check").hidden = false

 document.getElementById("demo").innerHTML = String(x) + "+" + String(y);
}

function showAnswer() {
    document.getElementById("demo").innerHTML += "<br><b>"+"="+ String(x+y);
    document.getElementById("check").hidden = true
}