

let symbols = ["+","-","×","÷","<span style = 'color :forestGreen'>✓</span>","<span style = 'color :red'>✗</span>"]

function nextQuestion(){
    // change to next question
    
    questionID++
    
    if(questionID < 10){

      document.getElementById("counter").innerHTML = "Question "+String(questionID+1)+" of 10"
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
   console.log(checkAnswer())
   document.getElementById("answer").innerHTML += symbols[checkAnswer()];

   //focus next button
   document.getElementById("next").focus();

   
}

function checkAnswer(){
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