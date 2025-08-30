let gameMode = null //timed or normal
let category = null //maths, JP, VI
let questionType = [] //add, kana, worded
let quizLength = null //how many questions


const options = {
    "numbers": {
        "maths": {
            "basic":

            {
                "modes": ["add", "sub", "mul", "div"],
                "modeLabel": ["+", "−", "×", "÷"]
            }
        },
        "physics": {
            "sumVectors": {
                "modes": ["N",
                    "kN",
                    "g",
                    "kg"
                ],
                "modeLabel": [
                    "Newtons",
                    "Kilonewtons",
                    "Grams",
                    "Kilograms"
                ]
            }
        },
    }, "lang": {
        "JP":
        {
            "vocab": {

                "language": "JP",
                "modes": [
                    "eng-hir"
                    , "hir-eng",
                    // "kanji-ro",
                    // "ro-kanji",



                ],
                "modeLabel": [
                    "English to Japanese",
                    "Japanese to English",
                    "Kanji to Romaji",
                    "Romaji to Kanji",


                ]
            },
            "kana": {

                "language": "JP",
                "modes": [
                    "hir",
                    "kata"
                ],
                "modeLabel": [

                    "Hirigana",
                    "Katakana"
                ]

            },
            "rad": {
                "language": "JP",
                "modes": [
                    "rad"
                ],
                "modeLabel": [

                    "Radicals"
                ],

            }, "nmbr": {
                "language": "JP",
                "modes": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "modeLabel": [

                    "Ones",
                    "Tens",
                    "Hundreds",
                    "Thousands",
                    "Ten Thousands",
                    "Hundred Thousands"

                ],
            }
        },
        "VI": {


            "conj": {
                "modes": ["eng-vi", "vi-eng"],
                "modeLabel": [
                    "English to Viet",
                    "Viet to English"
                ]
            },
            "months": {
                "modes": ["eng-vi", "vi-eng"],
                "modeLabel": [
                    "English to Viet",
                    "Viet to English"
                ]
            }
        },
        "materials": {

            "modes": ["mtrls"],
            "modeLabel": [
                "Materials"

            ]
        }
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
    //get quiz paramaters
    const urlParams = new URLSearchParams(window.location.search);

    subject = decodeURIComponent(urlParams.get("subject"))
    console.log(subject)

    //

    if (parsePath(options, subject) == null) {
        //check if subject does not exist
        window.alert("Still working on this... <(´= ⩊ =`)>")
        window.location.href = "../index.html"
        return
    }

    console.log(parsePath(options, subject))
    let modes = parsePath(options, subject)["modes"]



    let radio = document.getElementById("subjects")
    radio.innerHTML = ""
    for (let i = 0; i < modes.length; i++) {
        //add checkbox
        let checkbox
        checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = String(modes[i])
        checkbox.value = modes[i]
        checkbox.name = "category"

        //add labels
        radio.innerHTML += "<label for=" + String(modes[i]) + ">" + checkbox.outerHTML + `<span>${String(parsePath(options, subject)["modeLabel"][i])}</span>` + "</label>"



    }


    // make first checkbox on
    console.log(String(modes[0]))
    document.getElementById(String(modes[0])).checked = true
}

function parsePath(obj, path) {

    return path.split("/").reduce((acc, key) => acc?.[key], obj);


}