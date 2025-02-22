

let symbols = [
   "+","−","×","÷",
   "<img src = 'Icons\\tick.svg' style = 'height : 1.2em; width : 1.2em; vertical-align:text-top'>",
   "<img src = 'Icons\\cross.svg' style = 'height : 1.2em; width : 1.2em; vertical-align:text-top' >"]

async function nextQuestion(){
   
    // change to next question
    
    questionID++



    
    if(questionID < quizLength){
      await appendInput()
      if(gameMode == "timed"){
         resetStopwatch()
         timer = true
         
         stopWatch()
      }
      document.getElementById("counter").innerHTML = "Question "+String(questionID+1)+" of "+String(quizLength)
      document.getElementById("question").innerHTML = quiz[questionID]["phrase"]
      document.getElementById("check").hidden = false
      document.getElementById("skip").hidden = false
      document.getElementById("answer0").hidden = false
      document.getElementById("input0").hidden = false
      document.getElementById("next").hidden = true
      
      document.getElementById("answer0").style.visibility = "hidden"

      if(document.getElementById("image"))
      {
         document.getElementById("image").innerHTML = quiz[questionID]["image"] 
      }



      //Check if inputs is empty
      userInput = document.getElementById("input0")
      if(userInput){
         //make input blue
         document.getElementById("input0").classList.remove("error");
         //clear input
         document.getElementById("input0").value = null
         //make input editable
         document.getElementById("input0").disabled = false
         //select input
         document.getElementById("input0").focus();
      }else{
         document.getElementById("check").focus()
      }
    
      
      
 
   
 }else{
    
    showResults();

 }
}


function checkQuestion(){
   


   //fetch userInput
   input = document.getElementById("input0")
   userInput = input.value.trim()

   
      
   //check if input filled
      if(userInput !== "" && (userInput < Number(input.max) || input.type == "text")){


         //submit and show answer
         submitAnswer();
         showAnswer();
         //make input blue
         document.getElementById("input0").classList.remove("error");
   
      }else{
         //make input red
         document.getElementById("input0").classList.add("error");
         //focus on skip button
         document.getElementById("skip").focus();}


}


function skipQuestion(){
   userInput = null
   submitAnswer();
   showAnswer();
}

function submitAnswer() {

   //log user answer
if(userInput == null){
   quiz[questionID]["userInput"] = null
}else{
   quiz[questionID]["userInput"] = userInput.trim().toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
   quiz[questionID]["time"] = count
}
   
   //Make input uneditable
   document.getElementById("input0").disabled = true

   
}



function showAnswer(){
   //pause stopwatch
   timer = false
   //fetch answer
   answer = quiz[questionID]["answer"];


   //show answer
   document.getElementById("check").hidden = true
   document.getElementById("skip").hidden = true
   document.getElementById("next").hidden = false

   //render answer
   document.getElementById("answer0").style.visibility = "visible"
   if(subject=="physics"){
      answer = quiz[questionID]["answer"]["magnitude"]
      document.getElementById("answer0").innerHTML = "<b>"+String(answer)+" N";
      document.getElementById("answer0").innerHTML += symbols[checkAnswer(questionID)];

      answer = quiz[questionID]["answer"]["angle"]
      
      document.getElementById("answer1").innerHTML = "<b>"+String(answer)+"°";
      document.getElementById("answer1").innerHTML += symbols[checkAnswer(questionID)];

   }else{
      document.getElementById("answer0").innerHTML = "<b>"+String(answer);
      document.getElementById("answer0").innerHTML += symbols[checkAnswer(questionID)];
   }

   //focus next button
   document.getElementById("next").focus();

   
}

function checkAnswer(questionID){
   userInput = quiz[questionID]["userInput"];
  
   if(userInput == String(answer).toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')){
      return(4)
   }else{
      return(5)
   }
}

function submitInput(){
   //used in button js
   userInput = document.getElementById("input0").value
   document.getElementById("check").click()

}

function showResults(){

  
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
   let totalTime = 0
   for(let i = 0;i<quizLength;i++){
      
      userInput = quiz[i]["userInput"]
      if(!userInput){
      userInput = "skipped"
      }


      answer = quiz[i]["answer"];

      let results
      results = "<div>"+quiz[i]["phrase"]
      if(quiz[i]["image"]){
         results += "<br><div style='width: auto;height:5em;overflow:scroll'>"
         results += quiz[i]["image"]+"</div>"

      }
      results += "</div>"
      document.getElementById("results").innerHTML += results

      userInput = "<div><b>"+String(userInput)+symbols[checkAnswer(i)]+"</div>"
      document.getElementById("results").innerHTML += userInput

      if(checkAnswer(i) == 4){
         score++
      }

      let answers
      if(checkAnswer(i) == 5){

         if(subject == "physics"){
            answers = "<div>= <b>"+ String(quiz[i]["answer"]["magnitude"]) + " N<br>"
            answers += "</b>= <b>" + String (quiz[i]["answer"]["angle"])+"°"
            answers += "</div>"

         }else{
            answers = "<div>=<b>"+quiz[i]["answer"]+"</div>"
         }

      
      }else{
         answers = "<div class = 'empty'></div>"
      }


      document.getElementById("results").innerHTML += answers
    
      if(gameMode=="timed"){
         document.getElementById("results").style =   "grid-template-columns: auto auto auto auto;"

  
         let time

         if(userInput){
            time = quiz[i]["time"]
            totalTime += Number(time)
       
i    
            time = "<div style= 'font-family: Space Mono''>"+ countToTime(time)[0]+":" + countToTime(time)[1]+
            ":"  + countToTime(time)[2]+"."  + countToTime(time)[3] + "</div>"
            
         }else{
            time = "<div></div>"
         }
         
         document.getElementById("results").innerHTML += time
      }
      

   }

   console.log("done")


   //total
   let results = "<div style = 'border-bottom :none'>"
   results += "<h3>Total = "+String(score)+"/"+String(quizLength)
   results += "</h3></div>"



   //percentage
   results += "<div style = 'border-bottom :none'>"
   results += "<h3>= "+String(((score/quizLength)*100).toFixed(0))+"%"
   results += "</h3></div>"
   document.getElementById("results").innerHTML += results

   if(gameMode=="timed"){
      //total time
      totalTime = countToTime(totalTime)[0]+":" +countToTime(totalTime)[1]+":"  + countToTime(totalTime)[2]+"."  + countToTime(totalTime)[3]+"s"

      time = "<div style = 'border-bottom: none' class = 'empty'></div>"
      time += "<div style= 'font-family: Space Mono; border-bottom: none'><h3>"
      time += totalTime
      time += "</h3></div>"
      
      document.getElementById("results").innerHTML += time
   }

   if(score/quizLength==1){

      document.querySelectorAll('.empty').forEach(e => e.remove());

      document.getElementById("results").style = 'grid-template-columns: auto auto'
      if(gameMode == "timed"){
         document.getElementById("results").style = 'grid-template-columns: auto auto auto'
      }
   }

}

function setupQuiz(){
   console.log("start")
   document.getElementById("retry").hidden = true
   document.getElementById("home").hidden = true
   document.getElementById("results").innerHTML = ""
   
  
   document.getElementById("statement").hidden = false

   document.getElementById("next").hidden = false
   questionID = -1


   //start stopwatch
   if( gameMode =="timed"){
      document.getElementById("stopwatch").hidden = false
   } else {
      document.getElementById("stopwatch").hidden = true
   }
}

async function appendInput(){
   //Append elements to statement
   document.getElementById("statement").innerHTML = quiz[questionID]["statement"]

   let input
   let statement = document.getElementById("statement")
   for(let i = 0;i<statement.getElementsByTagName("input").length;i++){
      input = document.getElementById("input"+String(i))
      input.required = "true"

         
      if(category=="maths"){
         
         input.type = "number"
         input.inputMode = "numeric"
         input.max = "9999"
   
      }

      if(category =="physics"){
         input.type = "number"
         input.inputMode = "decimal"
         input.max = "9999"
         input.style.width = "3em"
         input.step = "any"
      }


      if(category=="lang"){



         input.type = "text"
         input.lang = language
         input.autocapitalize = "off"
         input.autocorrect = "off"

         
      }

      checkInput();
   }}

function goFullScreen() {

   if(!document.fullscreenElement){

      document.getElementById("fullscreen icon").src = "Icons\\close_fullscreen.svg"

      if (document.documentElement.requestFullscreen) {
       document.documentElement.requestFullscreen();}
}else
   {
      document.getElementById("fullscreen icon").src = "Icons\\fullscreen.svg"
      document.exitFullscreen();
   }
}
