

let symbols = [
   "+","−","×","÷",
   "<span style = 'color :forestGreen; font-family: inter'>✓</span>",
   "<span style = 'color :red; font-family: inter'>✗</span>"]

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
      document.getElementById("next").hidden = true
      document.getElementById("answer").style.visibility = "hidden"



      //Check if input is empty
      userInput = document.getElementById("input")
      if(userInput){
         //make input blue
         document.getElementById("input").classList.remove("error");
         //clear input
         document.getElementById("input").value = null
         //make input editable
         document.getElementById("input").disabled = false
         //select input
         document.getElementById("input").focus();
      }else{
         document.getElementById("check").focus()
      }
    
      
      
 
   
 }else{
    
    showResults();

 }
}


function checkQuestion(){
   


   //fetch userInput
   input = document.getElementById("input")
   userInput = input.value.trim()
   console.log(userInput)
   
      
   //check if input filled
      if(userInput !== "" && (userInput < Number(input.max) || input.type == "text")){


         //submit and show answer
         submitAnswer();
         showAnswer();
         //make input blue
         document.getElementById("input").classList.remove("error");
   
      }else{
         //make input red
         document.getElementById("input").classList.add("error");
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
   document.getElementById("input").disabled = true

   
}



function showAnswer(){
   //pause stopwatch
   timer = false
   //fetch answer
   answer = quiz[questionID]["answer"];


   //show answer
   document.getElementById("answer").style.visibility = "visible"
   document.getElementById("check").hidden = true
   document.getElementById("skip").hidden = true
   document.getElementById("next").hidden = false

   //render answer
   document.getElementById("answer").innerHTML = "<b>"+String(answer);
   document.getElementById("answer").innerHTML += symbols[checkAnswer(questionID)];

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
   userInput = document.getElementById("input").value
   document.getElementById("check").click()

}

function showResults(){

  
   document.getElementById("results").innerHTML = ""
   document.getElementById("counter").innerHTML = "Results"

   document.getElementById("next").hidden = true
   document.getElementById("answer").hidden = true
   document.getElementById("statement").hidden = true
   document.getElementById("input").hidden = true
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
      results = "<div>"+quiz[i]["phrase"]+"</div>"
      document.getElementById("results").innerHTML += results

      userInput = "<div><b>"+String(userInput)+symbols[checkAnswer(i)]+"</div>"
      document.getElementById("results").innerHTML += userInput

      if(checkAnswer(i) == 4){
         score++
      }

      let answers
      if(checkAnswer(i) == 5){
      answers = "<div><b>="+quiz[i]["answer"]+"</div>"}else{
         answers = "<div class = 'empty'></div>"
      }
      document.getElementById("results").innerHTML += answers
    
      if(gameMode=="timed"){
         document.getElementById("results").style =   "grid-template-columns: auto auto auto auto;"

         console.log("e")
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
   document.getElementById("answer").hidden = false
  
   document.getElementById("statement").hidden = false
   document.getElementById("input").hidden = false
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
   

      
   if(category=="maths"){
      let input = document.getElementById("input")
    
      
      input.type = "number"
      input.inputMode = "numeric"
      input.max = "9999"
     


   }
   if(category=="lang"){
      console.log("l")


      document.getElementById("input").type = "text"
      document.getElementById("input").lang = language
      document.getElementById("input").autocapitalize = "off"
      document.getElementById("input").autocorrect = "off"

      
   }

   checkInput();
}

