let gameMode = null //timed or normal
let category = null //maths, JP, VI
let questionType = [] //add, kana, worded
let quizLength = null //how many questions


const options ={
    "maths":{
        "category":"maths",   
        "modes":["add","sub","mul","div"],
        "modeLabel":["+","−","×","÷"]
    },
    "JP":{
        "category":"lang",
        "modes":["eng-hir","hir-eng","hir"],
        "modeLabel":[
            "English to Hirigana",
            "Hirigana to English",
            "Hirigana"
        ]

    },
    "VI":{
        "category":"lang",
        "modes":["eng-vi","vi-eng"],
        "modeLabel":[
            "English to Viet",
            "Viet to English"
        ]

    }
}

// function startQuiz(){

// }

function subjectOptions(){
console.log(subject)
let modes = options[subject]["modes"]
let radio = document.getElementById("subjects")
radio.innerHTML = ""
    for(let i = 0 ; i < modes.length; i++){
        //add checkbox
        radio.innerHTML +=  "<input type='checkbox' id="+String(modes[i])+"></input>"
        document.getElementById(String(modes[i])).value = modes[i]
        document.getElementById(String(modes[i])).name = "questionType"

       
            
       

        //add label
        radio.innerHTML +=  "<label for="+String(modes[i])+">"+String(options[subject]["modeLabel"][i])+"</label><br>"
        
        

    }
    // make first checkbox on
    document.getElementById(String(modes[0])).checked = "true"
}