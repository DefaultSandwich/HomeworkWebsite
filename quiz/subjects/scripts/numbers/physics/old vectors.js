//python -m http.server 8000



let quiz = []
let timer = false

//Generate start and setup quiz
async function startQuiz() {
   // Wait until quiz generated

   await newQuiz();

   //Start quiz

   await setupQuiz({ "category": "maths" })

   //start question
   renderQuestion();
}

//Create quiz

let unit
let x
let y
let vectors = []
let svg = []

let answer
let questionID
let userInput

const units = ["N", "kN", "g", "kg"]



function convertUnits(value, unit) {
   const G = 9.7803267715

   if (unit == "N") {
      return value
   }

   if (unit == "kN") {
      return value / 1000
   }

   if (unit == "g") {
      return (value * G) / 1000
   }

   if (unit == "kg") {
      return value * G
   }

}

function vectorTotal(vectors) {

   let x = 0
   let y = 0

   for (let i = 0; i < vectors.length; i++) {
      x += vectors[i]["magnitude"] * Math.cos(vectors[i]["angle"])
      y += vectors[i]["magnitude"] * Math.sin(vectors[i]["angle"])
   }

   return { "magnitude": Math.sqrt((x ** 2) + (y ** 2)), "angle": Math.atan(y / x) }

}

function radToDeg(angle) {
   return angle / Math.PI * 180
}

function degToRad(angle) {
   return angle / 180 * Math.PI
}





