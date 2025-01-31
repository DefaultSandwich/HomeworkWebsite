let x
let wordbankEN = ["train","thank you"]
let wordbankJP = ["densha","arigatou"]


newQuestion()

function newQuestion(){

 x = Math.floor(Math.random() * wordbankEN.length)

 document.getElementById("check").hidden = false

document.getElementById("demo").innerHTML = String(wordbankEN[x]);
}

function showAnswer() {
    document.getElementById("demo").innerHTML += "<br><b>"+ String(wordbankJP[x]);
    document.getElementById("check").hidden = true
}