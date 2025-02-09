

let symbols = [
   "+","−","×","÷",
   "<span style = 'color :forestGreen; font-family: inter'>✓</span>",
   "<span style = 'color :red; font-family: inter'>✗</span>"]

function nextQuestion(){
    // change to next question
    
    questionID++
    
    if(questionID < quizLength){

      document.getElementById("counter").innerHTML = "Question "+String(questionID+1)+" of "+String(quizLength)
       document.getElementById("question").innerHTML = quiz[questionID]["statement"]
      document.getElementById("check").hidden = false
      document.getElementById("skip").hidden = false
      document.getElementById("next").hidden = true
      document.getElementById("answer").style.visibility = "hidden"


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
   let input = document.getElementById("input")
   userInput = input.value.trim()
   
      
   //check if input filled
      if(userInput !== "" && (userInput < Number(input.max) || input.type != "number")){
         //submit and show answer
         submitAnswer();
         showAnswer();
         //make input blue
         document.getElementById("input").classList.remove("error");
   
      }else{
         //make input red
         document.getElementById("input").classList.add("error");
         //focus on skip button
         document.getElementById("skip").focus();
            
      }


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
   quiz[questionID]["userInput"] = userInput.trim().toLowerCase()
}
   
   //Make input uneditable
   document.getElementById("input").disabled = true

   
}



function showAnswer(){

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
  

   if(userInput==answer){
      return(4)
   }else{
      return(5)
   }
}

function submitInput(){
   //used in button js
   userInput = document.getElementById("input").value
   checkQuestion()

}

function showResults(){

  
   document.getElementById("results").innerHTML = ""
   document.getElementById("counter").innerHTML = "Results"

   document.getElementById("next").hidden = true
   document.getElementById("answer").hidden = true
   document.getElementById("statement").hidden = true
   document.getElementById("input").hidden = true
   document.getElementById("check").hidden = true

   document.getElementById("home").hidden = false
   document.getElementById("retry").hidden = false
   document.getElementById("results").hidden = false
  
 
   let score = 0
   for(let i = 0;i<quizLength;i++){
      
      userInput = quiz[i]["userInput"]
      if(!userInput){
      userInput = "skipped"
      }


      answer = quiz[i]["answer"];

      let results
      results = "<div>"+quiz[i]["statement"]+"</div>"
      document.getElementById("results").innerHTML += results

      userInput = "<div><b>"+String(userInput)+symbols[checkAnswer(i)]+"</div>"
      document.getElementById("results").innerHTML += userInput

      if(checkAnswer(i) == 4){
         score++
      }

      let answers
      if(checkAnswer(i) == 5){
      answers = "<div><b>="+quiz[i]["answer"]+"</div>"}else{
         answers = "<div></div>"
      }
      document.getElementById("results").innerHTML += answers
      

   }

   console.log("done")
   let results = "<div style = 'border-bottom :none'>"
   results += "<h3>Total = "+String(score)+"/"+String(quizLength)
   results += "</h3></div>"
   document.getElementById("results").innerHTML += results

}

function setupQuiz(paramaters){
   console.log("start")
   document.getElementById("retry").hidden = true
   document.getElementById("home").hidden = true
   document.getElementById("results").innerHTML = ""
   document.getElementById("answer").hidden = false
  
   document.getElementById("statement").hidden = false
   document.getElementById("input").hidden = false
   document.getElementById("next").hidden = false
   questionID = -1

   //Append elements to statement
   document.getElementById("statement").innerHTML = ""
   
   if(paramaters["category"]=="maths"){
      document.getElementById("statement").innerHTML += "<span id='question'>question</span>";
      document.getElementById("statement").innerHTML += " = ";

      document.getElementById("statement").innerHTML += "<span><input id='input'></input></span>";
      document.getElementById("input").type = "number"
      document.getElementById("input").inputMode = "numeric"
      document.getElementById("input").max = "9999"

      document.getElementById("statement").innerHTML += " <span id='answer'> answer</span>"
   }
   if(paramaters["category"]=="lang"){

      if(paramaters["lang"] == "VI"){
         document.getElementById("statement").innerHTML += 'Translate "';
      }else{
         document.getElementById("statement").innerHTML += 'Write in "';
      }
      
      document.getElementById("statement").innerHTML += "<span id='question'>question</span>";

      if(paramaters["lang"] == "JP"){
         document.getElementById("statement").innerHTML += '" hirigana';
      } else{
         document.getElementById("statement").innerHTML += '" '
      }
      
      document.getElementById("statement").innerHTML += '<br>';
      
      document.getElementById("statement").innerHTML += "<span><input autocorrect='off' type='text' id='input'></input></span>";
      document.getElementById("input").lang = paramaters["lang"]

      document.getElementById("statement").innerHTML += "<br> <span id='answer'> answer</span>"
   }
}