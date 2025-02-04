

let symbols = ["+","-","×","÷","<span style = 'color :forestGreen'>✓</span>","<span style = 'color :red'>✗</span>"]

function nextQuestion(){
    // change to next question
    
    questionID++
    
    if(questionID < 10){

      document.getElementById("counter").innerHTML = "Question "+String(questionID+1)+" of 10"
       document.getElementById("question").innerHTML = quiz[questionID]["statement"]
      document.getElementById("check").hidden = false
      document.getElementById("skip").hidden = false
      document.getElementById("next").hidden = true
      document.getElementById("answer").style.visibility = "hidden"

      if(document.getElementById("input")){
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
   userInput = document.getElementById("input").value
      
   //check if input filled
      if(userInput.trim() !== ""){
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
   quiz[questionID]["userInput"] = userInput
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
   console.log(checkAnswer(questionID))
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
   userInput = document.getElementById("input").value
   checkQuestion()

}

function showResults(){
  
   document.getElementById("results").innerHTML = ""
   document.getElementById("counter").innerHTML = "Results"
   document.getElementById("next").hidden = true
   document.getElementById("answer").hidden = true
   document.getElementById("retry").hidden = false
   document.getElementById("statement").hidden = true
  
   document.getElementById("input").hidden = true
   document.getElementById("check").hidden = true
   document.getElementById("input").style.visibility = "hidden"
   document.getElementById("results").hidden = false
  
   for(let i = 0;i<10;i++){
      console.log("e")
      userInput = quiz[i]["userInput"]
      if(!userInput){
      userInput = "skipped"
   }
   console.log(userInput)


   answer = quiz[i]["answer"];

   let results
   results = "<div>"+quiz[i]["statement"]+"</div>"
   document.getElementById("results").innerHTML += results

   userInput = "<div><b>"+String(userInput)+symbols[checkAnswer(i)]+"</div>"
   document.getElementById("results").innerHTML += userInput

   let answers
   if(checkAnswer(i) == 5){
   answers = "<div><b>="+quiz[i]["answer"]+"</div>"}else{
      answers = "<div></div>"
   }
   document.getElementById("results").innerHTML += answers

   console.log("done")
   }
}

function setupQuiz(){
   console.log("start")
   document.getElementById("retry").hidden = true
   document.getElementById("results").innerHTML = ""
   document.getElementById("answer").hidden = false
  
   document.getElementById("statement").hidden = false
   document.getElementById("input").hidden = false
   document.getElementById("input").style.visibility = "visible"
   document.getElementById("next").hidden = false
   questionID = -1
}