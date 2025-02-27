let gameMode = null //timed or normal
let category = null //maths, JP, VI
let questionType = [] //add, kana, worded
let quizLength = null //how many questions


const options = {
    "maths": {
        "category": "maths",
        "modes": ["add", "sub", "mul", "div"],
        "modeLabel": ["+", "−", "×", "÷"]
    },
    "JP_vocab": {
        "category": "lang",
        "language":"JP",
        "modes": [
            "eng-hir"
            , "hir-eng"

        ],
        "modeLabel": [
            "English to Hirigana",
            "Hirigana to English",

        ]
    },
    "JP_kana": {
        "category": "lang",
        "language":"JP",
        "modes": [
            "hir",
            "kata"
        ],
        "modeLabel": [

            "Hirigana",
            "Katakana"
        ]

    },
    "VI": {
        "category": "lang",
        "language":"VI",
        "modes": ["eng-vi", "vi-eng"],
        "modeLabel": [
            "English to Viet",
            "Viet to English"
        ]

    },
    "physics": {
        "category": "physics",
        "modes": ["N",
            // "kN",
            // "g",
            // "kg"
        ],
        "modeLabel": [
            "Newtons",
            "kN",
            "grams",
            "kilograms"
        ]
    },
    // "phyTools":{
    //     "category":"physics",
    //     "modes":["vectors"],
    //     "modeLabel":[
    //         "Vectors"
    //     ]
    // }
}

// function startQuiz(){

// }

function subjectOptions() {

    if (!options[subject]) {
        //check if subject does not exist
        window.alert("Still working on this... <(´= ⩊ =`)>")
        window.location.href = "index.html"
        return
    }

    let modes = options[subject]["modes"]

    document.getElementById("category").value = options[subject]["category"]

    let radio = document.getElementById("subjects")
    radio.innerHTML = ""
    for (let i = 0; i < modes.length; i++) {
        //add checkbox
        radio.innerHTML += "<input type='checkbox' id=" + String(modes[i]) + "></input>"
        document.getElementById(String(modes[i])).value = modes[i]
        document.getElementById(String(modes[i])).name = "questionType"





        //add label
        radio.innerHTML += "<label for=" + String(modes[i]) + ">" + String(options[subject]["modeLabel"][i]) + "</label><br>"



    }

    //add language category
    console.log("e")
    console.log(options[subject]["language"])
    if(options[subject]["language"] != null){
        console.log("e")
        document.getElementById("form").innerHTML += "<input type='hidden' name='language' value='"+String(options[subject]["language"])+"'></input>"
    }

    // make first checkbox on
    console.log(String(modes[0]))
    document.getElementById(String(modes[0])).checked = true
}