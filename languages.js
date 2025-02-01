let x

let wordbankJP = []
let wordbankVI = []


fetch("wordbankJP.json")
    .then(response => response.json())
    .then(data => {wordbankJP = data})
    .catch(error => console.error(error));


fetch("wordbankVI.json")
    .then(response => response.json())
    .then(data => {wordbankVI = data})
    .catch(error => console.error(error));


let words
let wordbank

function newQuestion(language){
    wordbank = eval("wordbank"+language)
    words = Object.keys(wordbank);

    x = Math.floor(Math.random() * words.length)

    document.getElementById("check").hidden = false

    document.getElementById("demo").innerHTML = String(words[x]);
}

function showAnswer() {
    document.getElementById("demo").innerHTML += "<br><b>"+ String(wordbank[words[x]]);
    document.getElementById("check").hidden = true
}