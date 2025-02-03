

function nextQuestion(){
    // change to next question
    
    questionID++
    
    if(questionID < 10){

      document.getElementById("counter").innerHTML = "Question "+String(questionID+1)+" of 10"
      document.getElementById("check").hidden = false
      document.getElementById("next").innerHTML = "Skip"
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


function submitAnswer() {
   
  //fetch answer
   answer = quiz[questionID]["answer"];

   //log user answer
   if(document.getElementById("input")){
   userInput = document.getElementById("input").value
   quiz[questionID]["userInput"] = userInput
   document.getElementById("input").disabled = true
   }

   //Update elements
   document.getElementById("answer").style.visibility = "visible"
   document.getElementById("check").hidden = true
   document.getElementById("next").innerHTML = "Next"
   //focus next button
   document.getElementById("next").focus();

}

//function showResults(){
//       document.getElementById("results").innerHTML = ""
//       document.getElementById("counter").innerHTML = "Results"
//       document.getElementById("next").hidden = true
//       document.getElementById("retry").hidden = false
//       document.getElementById("statement").hidden = true
//       document.getElementById("check").hidden = true
//       document.getElementById("input").style.visibility = "hidden"
//       document.getElementById("results").hidden = false
     
// for(let i = 0;i<quiz.length;i++){
   
//   userInput = quiz[i]["userInput"]
//   if(!userInput){
//    userInput = "skipped"
//   }
//   console.log(userInput)
   
//   operation = quiz[i]["operation"];
//   x = quiz[i]["question"][0];
//   y = quiz[i]["question"][1];
//   answer = quiz[i]["answer"];

//    document.getElementById("results").innerHTML += String(x)+symbols[operation]+String(y);
//   document.getElementById("results").innerHTML += "<b> ="+String(userInput);
//   document.getElementById("results").innerHTML += symbols[checkAnswer()];
//   document.getElementById("results").innerHTML += "<br>";
//   console.log("done")
// }
// }

// function checkAnswer(){
//    if(userInput==answer){
// return(4)
//    }else{
//       return(5)
//    }
// }