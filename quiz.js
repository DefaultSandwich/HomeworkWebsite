function nextQuestion(){
    // change to next question
    
    questionID++
 
   
    
    if(questionID < 10){
      
       document.getElementById("counter").innerHTML = "Question "+String(questionID+1)+" of 10"
       document.getElementById("input").value = null
 
 
       document.getElementById("input").classList.remove("error");
       document.getElementById("check").hidden = false
       document.getElementById("next").innerHTML = "Skip"
       document.getElementById("answer").style.visibility = "hidden"
       document.getElementById("input").disabled = false
 
     //select input
     document.getElementById("input").focus();
 
    operation = quiz[questionID]["operation"]
    x = quiz[questionID]["x"]
    y = quiz[questionID]["y"]
 
    document.getElementById("question").innerHTML = String(x) + symbols[operation] + String(y);
 
  
    
 
  
   
 }else{
    console.log("a")
    showResults();
 }
 }