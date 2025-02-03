//python -m http.server 8000



let quiz = []

//Generate start and setup quiz
async function startQuiz() {
   // Wait until quiz generated
   if (quiz.length<10) {
       
       await newQuiz();
   }
   //Start quiz
   console.log("start")
   document.getElementById("retry").hidden = true
   document.getElementById("results").hidden = true
   document.getElementById("statement").hidden = false
   document.getElementById("input").style.visibility = "visible"
   document.getElementById("next").hidden = false
   questionID = -1

   nextQuestion();
}

//Create quiz

let operation
let x 
let y 
let answer
let questionID
let userInput
let symbols = ["+","-","×","÷","<span style = 'color :forestGreen'>✓</span>","<span style = 'color :red'>✗</span>"]

async function newQuiz(){
   quiz = []
   
  
  

   for(let i=0; i <10; i++){
      let question
         answer=null;
         x=Math.floor(Math.random()*10)+1;
         y=Math.floor(Math.random()*10)+1;
         operation = Math.floor(Math.random()*4);

      if (operation == 0){
         //addition
         
         answer = x +y;
      }
      if (operation == 1){
         //subtraction
         if (x < y){
             //swap x and y
             let z
             z = x
             x = y
             y = z
         }
         
         answer = x -y;
      }
      if (operation == 2){
         //multiplication
        
         answer = x *y;
      }
      if (operation == 3){
         //division
         y+=2
         y= Math.floor(y/2)
         x+=3
         x = x*y
         
         answer = x / y;
      }

    question = {
      "operation":operation,
      "x":x,
      "y":y,
      "answer":answer,
      "userInput":null
      
    }
      console.log(question)
      quiz.push(question)
   }
}




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

function showAnswer() {
   operation = quiz[questionID]["operation"]
   x = quiz[questionID]["x"]
   y = quiz[questionID]["y"]
   answer = quiz[questionID]["answer"]
   
   
   //show answer
    document.getElementById("answer").innerHTML = "<b>"+String(answer);
    
    userInput = document.getElementById("input").value
    //check if input filled
    if(userInput.trim() !== ""){
      //make input not red
      document.getElementById("input").classList.remove("error");
      //check answer
      
      quiz[questionID]["userInput"] = userInput
      document.getElementById("answer").innerHTML += symbols[checkAnswer()];
    
       //Update elements
   
    document.getElementById("answer").style.visibility = "visible"
    document.getElementById("input").disabled = true
    document.getElementById("check").hidden = true
    document.getElementById("next").innerHTML = "Next"

    //focus next button
    document.getElementById("next").focus();
     
    
   }else{
      //make input red
      document.getElementById("input").classList.add("error");
      //focus on skip button
      document.getElementById("next").focus();
       
   }
    
   
}

function showResults(){
      document.getElementById("results").innerHTML = ""
      document.getElementById("counter").innerHTML = "Results"
      document.getElementById("next").hidden = true
      document.getElementById("retry").hidden = false
      document.getElementById("statement").hidden = true
      document.getElementById("check").hidden = true
      document.getElementById("input").style.visibility = "hidden"
      document.getElementById("results").hidden = false
     
for(let i = 0;i<quiz.length;i++){
   
  userInput = quiz[i]["userInput"]
  if(!userInput){
   userInput = "skipped"
  }
  console.log(userInput)
   
  operation = quiz[i]["operation"];
  x = quiz[i]["x"];
  y = quiz[i]["y"];
  answer = quiz[i]["answer"];

   document.getElementById("results").innerHTML += String(x)+symbols[operation]+String(y);
  document.getElementById("results").innerHTML += "<b> ="+String(userInput);
  document.getElementById("results").innerHTML += symbols[checkAnswer()];
  document.getElementById("results").innerHTML += "<br>";
  console.log("done")
}
}

function checkAnswer(){
   if(userInput==answer){
return(4)
   }else{
      return(5)
   }
}