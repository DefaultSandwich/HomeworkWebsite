
function showResults() {
   quizCache = JSON.parse(localStorage.getItem('quiz'));
   gameMode = quizCache.meta.gameMode;
   let results = document.getElementById("results")
   let Totalmarks = 0
   let score = 0
   let totalTime = 0

   //Clear results
   results.innerHTML = ""
   document.getElementById("header").innerHTML = "Results"

   //set variables
   let questions = quizCache.questions


   // run row loop
   for (let i = 0; i < questions.length; i++) {
      let row = "<div>"
      //add question
      row += questions[i].statement.question
      row += "</div>"


      // input loop
      let inputs = "<div>"
      let answers = ""

      for (let f = 0; f < questions[i].answer.length; f++) {
         Totalmarks++

         //add input
         if (questions[i].userInput[f] != undefined) {
            if (typeof questions[i].userInput[f] == "object") {


               console.log(questions[i].answer[f].unit)
               inputs += formatValue({ "value": Number(questions[i].userInput[f]), "unit": questions[i].answer[f].unit })



            } else {
               inputs += formatValue(questions[i].userInput[f])
            }



         } else {
            inputs += "skipped"
         }


         if (compare(questions[i].userInput[f], questions[i].answer[f])) {
            //if answered correctly
            score++
            //add  tick to input
            inputs += tick

            if (questions[i].answer[f].tolerance == null) {
               answers += "<div class = 'empty'>"
            } else {
               // if answer has tolerance display error amount input vs answer
               answers += "<div style='white-space:nowrap'>"
               answers += (((questions[i].userInput[f] - questions[i].answer[f].value) / questions[i].answer[f].value) * 100).toFixed(0) + "%"
            }


         } else {

            answers += "<div style='white-space:nowrap'>"

            if (questions[i].userInput[f] != undefined) {
               //add cross to input if not skipped
               inputs += cross


            }


            //add answer
            answers += formatValue(questions[i].answer[f])


         }
         inputs += "<br>"
         answers += "<br>"
      }

      row += inputs + "</div>"
      row += answers + "</div>"

      //add time
      if (gameMode == "timed") {

         totalTime += questions[i].time

         row += "<div style = 'font-family: Space Mono'>"
         row += countToTime(questions[i].time)[0] + ":"
         row += countToTime(questions[i].time)[1] + ":"
         row += countToTime(questions[i].time)[2] + "."
         row += countToTime(questions[i].time)[3]
         row += "</div>"
      }

      //add row
      results.innerHTML += row
   }

   //total
   row = "<div style = 'border-bottom :none; overflow: hidden; white-space: nowrap;'>"
   row += "<h3 style = 'display:flex'>"
   row += "<span style = 'flex-shrink:1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>" + "Total " + "</span>"
   row += "<span style = 'flex-shrink:0; white-space: nowrap'>"
   row += String(score) + "/" + String(Totalmarks)
   row += "</span>"
   row += "</h3></div>"

   //percentage
   row += "<div style = 'border-bottom :none'>"
   row += "<h3>= " + String(((score / Totalmarks) * 100).toFixed(0)) + "%"
   row += "</h3></div>"


   //add total time
   if (gameMode == "timed") {

      row += "<div style = 'border-bottom :none'></div>"

      row += "<div style = 'font-family: Space Mono ; border-bottom :none'><h3>"
      row += countToTime(totalTime)[0] + ":"
      row += countToTime(totalTime)[1] + ":"
      row += countToTime(totalTime)[2] + "."
      row += countToTime(totalTime)[3] + "s"
      row += "</h3></div>"
   }

   results.innerHTML += row

   //setup table
   if (gameMode == "timed") {
      document.getElementById("results").style.gridTemplateColumns = "minmax(2.9em , auto) auto auto "
   } else {
      document.getElementById("results").style.gridTemplateColumns = "minmax(2.9em , auto) auto "
   }

   if (score / Totalmarks == 1) {
      //if all qs answered correctly delete answer column divs
      document.querySelectorAll('.empty').forEach(e => e.remove());


   } else {
      //else add column to grid 
      document.getElementById("results").style.gridTemplateColumns += " auto "
   }

}

function contQuiz() {

   //check if quiz is too long
   if (quizCache.questions.length + 10 > 100) {
      alert("the quiz is too long")
      return
   }


   //quizLength will be how many more questions added
   document.getElementById("quizLength").value = 10
   document.getElementById("subject").value = quizCache.meta.subject
   document.getElementById("gameMode").value = quizCache.meta.gameMode



   //append categories
   if (Array.isArray(quizCache.meta.category)) {
      for (let i = 0; i < quizCache.meta.category.length; i++) {
         const input = document.createElement("input");
         input.type = "hidden";
         input.name = "category";
         input.value = quizCache.meta.category[i];
         document.getElementById("quizParams").appendChild(input);
      }
   } else {

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "category";
      input.value = quizCache.meta.category;
      document.getElementById("quizParams").appendChild(input);
   }
   console.log(document.getElementById("quizParams").innerHTML)

   document.getElementById("quizParams").submit()

}

function retryQuiz() {
   quizCache.questions.forEach(e => {
      e.userInput = []
      e.time = null
   }
   );
   localStorage.setItem('quiz', JSON.stringify(quizCache))
}