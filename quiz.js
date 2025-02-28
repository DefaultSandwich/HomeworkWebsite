

let symbols = [
   "+", "−", "×", "÷",
   "<img src = 'Icons\\tick.svg' style = 'height : 1.2em; width : 1.2em; vertical-align:baseline ; position: relative; top: calc((1.2em - 0.735em) / 2)'>",
   "<img src = 'Icons\\cross.svg' style = 'height : 1.2em; width : 1.2em; vertical-align:baseline;  position: relative; top: calc((1.2em - 0.735em) / 2)'>"]

async function nextQuestion() {

   // change to next question

   questionID++




   if (questionID < quizLength) {
      await appendInput()
      if (gameMode == "timed") {
         resetStopwatch()
         timer = true
         startStopWatch()
      }
      document.getElementById("counter").innerHTML = "Question " + String(questionID + 1) + " of " + String(quizLength)
      document.getElementById("question").innerHTML = quiz[questionID]["phrase"]
      document.getElementById("check").hidden = false
      document.getElementById("skip").hidden = false
      document.getElementById("answer0").hidden = false
      document.getElementById("input0").hidden = false
      document.getElementById("next").hidden = true

      document.getElementById("answer0").style.visibility = "hidden"

      if (document.getElementById("image")) {
         document.getElementById("image").innerHTML = quiz[questionID]["image"]
      }



      //Check if inputs is empty
      userInput = document.getElementById("input0")
      if (userInput) {
         //make input blue
         document.getElementById("input0").classList.remove("error");
         //clear input
         document.getElementById("input0").value = null
         //make input editable
         document.getElementById("input0").disabled = false
         //select input
         document.getElementById("input0").focus();
      } else {
         document.getElementById("check").focus()
      }





   } else {

      showResults();

   }
}


function checkQuestion() {



   //fetch userInput
   input = document.getElementById("input0")
   userInput = input.value.trim()



   //check if input filled
   if (userInput !== "" && (userInput < Number(input.max) || input.type == "text")) {


      //submit and show answer
      submitAnswer();
      showAnswer();
      //make input blue
      document.getElementById("input0").classList.remove("error");

   } else {
      //make input red
      document.getElementById("input0").classList.add("error");
      //focus on skip button
      document.getElementById("skip").focus();
   }


}


function skipQuestion() {
   submitAnswer(true);
   showAnswer();
}

function submitAnswer(skipped) {

   let statement = document.getElementById("statement")


   for (let i = 0; i < statement.getElementsByTagName("input").length; i++) {

      //log all inputs

      input = document.getElementById("input" + String(i))
      userInput = input.value

      //log user answer
      if (skipped) {

         quiz[questionID]["userInput"][i] = null

      } else {
         if (input.type == "text") {
            quiz[questionID]["userInput"][i] = userInput.trim().toLowerCase().replace(/[!"#$%&'()*+,.-/:;<=>?@[\]^_`{|}~]/g, '')
         }

         if (input.type == "number") {
            quiz[questionID]["userInput"][i] = Number(userInput)
         }


      }

      //Make input uneditable
      input.disabled = true
   }

   quiz[questionID]["time"] = Number(JSON.parse(JSON.stringify(count)));

   //log quiz
   // for (let a = 0; a < 5; a++) {
   //    console.log(quiz[a]["time"])
   // }




}



function showAnswer() {
   //pause stopwatch
   timer = false
   //fetch answer
   answer = quiz[questionID]["answer"];


   //show answer
   document.getElementById("check").hidden = true
   document.getElementById("skip").hidden = true
   document.getElementById("next").hidden = false

   //render answer
   let answerElement
   let statement = document.getElementById("statement")
   let key

   for (let i = 0; i < statement.getElementsByTagName("input").length; i++) {

      answerElement = document.getElementById("answer" + String(i))

      answerElement.style.visibility = "visible"
      answerElement.innerHTML = ""

      key = Object.keys(quiz[questionID]["answer"])[i]

      if (statement.getElementsByTagName("input")["input" + String(i)].type == "number") {
         answerElement.innerHTML += "= "
      }

      answerElement.innerHTML += "<b>" + formatValue(quiz[questionID]["answer"][key], key) + "</b>"

      if (quiz[questionID]["userInput"] != null) {
         answerElement.innerHTML += symbols[checkAnswer(questionID, i)]
      }
   }
   //focus next button
   document.getElementById("next").focus();


}

function checkAnswer(questionID, answerID) {
   // Check if question skipped
   let userInput = quiz[questionID]["userInput"]
   if (userInput == null) {
      userInput = "skipped"
      return (5)
   }

   let answer = Object.values(quiz[questionID]["answer"])[answerID]
   userInput = quiz[questionID]["userInput"][answerID];

   if (typeof answer == "string") {
      //convert answer to lowercase and remove punctuation
      answer = String(answer).toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
   }

   if (userInput == answer) {
      //tick
      return (4)
   } else {
      //cross
      return (5)
   }
}

function submitInput() {
   //used in button js
   userInput = document.getElementById("input0").value



   document.getElementById("check").click()

}

function showResults() {


   document.getElementById("results").innerHTML = ""
   document.getElementById("counter").innerHTML = "Results"

   document.getElementById("next").hidden = true
   document.getElementById("answer0").hidden = true
   document.getElementById("statement").hidden = true
   document.getElementById("input0").hidden = true
   document.getElementById("check").hidden = true
   document.getElementById("stopwatch").hidden = true

   document.getElementById("home").hidden = false
   document.getElementById("retry").hidden = false
   document.getElementById("results").hidden = false


   let score = 0
   let questions = 0
   let totalTime = 0
   for (let i = 0; i < quizLength; i++) {
      //run for every question






      let results

      //add question
      results = "<div>" + quiz[i]["phrase"]

      if (quiz[i]["image"]) {
         //add image
         results += "<br><div id= 'image" + String(i) + "' style='width: auto; max-width: 50vw; height:5em;overflow:scroll'>"
         results += quiz[i]["image"] + "</div>"



      }


      results += "</div>"
      document.getElementById("results").innerHTML += results


      if (quiz[i]["image"]) {
         requestAnimationFrame(() => {

            document.getElementById("image" + String(i)).scrollTop = 150; // Scroll down
            document.getElementById("image" + String(i)).scrollLeft = 100; // Scroll right

         }
         )
      }








      let correct = true
      let answers
      answers = quiz[i]["answer"];

      if (typeof answers !== "object") {
         console.error("answer not object")
      }

      userInput = "<div>"
      answers = "<div>"


      for (let a = 0; a < Object.keys(quiz[i]["answer"]).length; a++) {
         // Run for every input
         questions++


         //write userInput
         console.log(userInput)


         key = Object.keys(quiz[i]["answer"])[a]
         answers += "<span style = 'white-space: nowrap'>"
         answers += "= " + formatValue(quiz[i]["answer"][key], key) + "<br></span>"

         if (quiz[i]["userInput"][a] == null) {
            if (a == 0) {
               userInput += "skipped"
            }
            correct = false
         } else {




            userInput += formatValue(quiz[i]["userInput"][a], key)


            userInput += symbols[checkAnswer(i, a)] + "<br>"

            if (checkAnswer(i, a) == 4) {
               //increase score
               score++

            } else {
               correct = false
            }
         }




      }

      console.log(userInput)
      document.getElementById("results").innerHTML += userInput + "</div>"


      if (correct) {
         //if input correct dont display answer
         answers = "<div class = 'empty'></div>"
      } else {
         answers += "</div>"
      }

      console.log(answers)
      document.getElementById("results").innerHTML += answers


      //add time
      if (gameMode == "timed") {
         document.getElementById("results").style = "grid-template-columns: auto auto auto auto;"

         let time

         if (userInput) {
            time = quiz[i]["time"]
            totalTime += Number(time)


            time = "<div style= 'font-family: Space Mono''>" + countToTime(time)[0] + ":" + countToTime(time)[1] +
               ":" + countToTime(time)[2] + "." + countToTime(time)[3] + "</div>"

         } else {
            time = "<div></div>"
         }

         document.getElementById("results").innerHTML += time
      }


   }

   console.log("done")


   //total
   let results = "<div style = 'border-bottom :none'>"
   results += "<h3>Total = " + String(score) + "/" + String(questions)
   results += "</h3></div>"



   //percentage
   results += "<div style = 'border-bottom :none'>"
   results += "<h3>= " + String(((score / questions) * 100).toFixed(0)) + "%"
   results += "</h3></div>"
   document.getElementById("results").innerHTML += results

   if (gameMode == "timed") {
      //total time
      totalTime = countToTime(totalTime)[0] + ":" + countToTime(totalTime)[1] + ":" + countToTime(totalTime)[2] + "." + countToTime(totalTime)[3] + "s"

      time = "<div style = 'border-bottom: none' class = 'empty'></div>"
      time += "<div style= 'font-family: Space Mono; border-bottom: none'><h3>"
      time += totalTime
      time += "</h3></div>"

      document.getElementById("results").innerHTML += time
   }

   if (score / questions == 1) {


      document.querySelectorAll('.empty').forEach(e => e.remove());

      document.getElementById("results").style = 'grid-template-columns: auto auto'
      if (gameMode == "timed") {
         document.getElementById("results").style = 'grid-template-columns: auto auto auto'
      }
   }

}

function setupQuiz() {
   console.log("start")
   document.getElementById("retry").hidden = true
   document.getElementById("home").hidden = true
   document.getElementById("results").innerHTML = ""

   //scroll to the top
   requestAnimationFrame(() => {
     window.scrollTo( {top:"0", behavior: "instant"})
      })



      document.getElementById("statement").hidden = false

      document.getElementById("next").hidden = false
      questionID = -1


      //start stopwatch
      if (gameMode == "timed") {
         document.getElementById("stopwatch").hidden = false
      } else {
         document.getElementById("stopwatch").hidden = true
      }
   }

async function appendInput() {
         //Append elements to statement
         document.getElementById("statement").innerHTML = quiz[questionID]["statement"]

         let input
         let statement = document.getElementById("statement")
         for (let i = 0; i < statement.getElementsByTagName("input").length; i++) {
            input = document.getElementById("input" + String(i))
            input.required = "true"


            if (category == "maths") {

               input.type = "number"
               input.inputMode = "numeric"
               input.style.width = "4em"
               input.max = "9999"

            }

            if (category == "physics") {
               input.type = "number"
               input.inputMode = "decimal"
               input.max = "9999"
               input.style.width = "4em"
               input.step = "any"
            }


            if (category == "lang") {



               input.type = "text"
               input.lang = language
               input.autocapitalize = "off"
               input.autocorrect = "off"


            }

            checkInput();
         }
      }

function goFullScreen() {

         if (!document.fullscreenElement) {

            document.getElementById("fullscreen icon").src = "Icons\\close_fullscreen.svg"

            if (document.documentElement.requestFullscreen) {
               document.documentElement.requestFullscreen();
            }
         } else {
            document.getElementById("fullscreen icon").src = "Icons\\fullscreen.svg"
            document.exitFullscreen();
         }
      }

function formatValue(value, key) {
         if (key == "magnitude") {
            return value.toFixed(2) + " N"
         }

         if (key == "angle") {
            return String(value) + "°"
         }

         if (key != "magnitude" && key != "angle") {
            return String(value)
         }
      }

