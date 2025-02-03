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

   nextMathsQuestion();
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
      "mode":operation,
      "question":[x,y],
      "answer":answer,
      "userInput":null
      
    }
      
      quiz.push(question)
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
   
  operation = quiz[i]["mode"];
  x = quiz[i]["question"][0];
  y = quiz[i]["question"][1];
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


function nextMathsQuestion(){
   nextQuestion();
   operation = quiz[questionID]["mode"]
   x = quiz[questionID]["question"][0]
   y = quiz[questionID]["question"][1]
   document.getElementById("question").innerHTML = String(x) + symbols[operation] + String(y);
}

function showAnswer(){
   //fetch question
   operation = quiz[questionID]["mode"];
   x = quiz[questionID]["question"][0];
   y = quiz[questionID]["question"][1];
   

   submitAnswer();

   //check if input filled
   if(userInput.trim() !== ""){
      
      //make input blue
      document.getElementById("input").classList.remove("error");
      //render answer
      document.getElementById("answer").innerHTML = "<b>"+String(answer);
      document.getElementById("answer").innerHTML += symbols[checkAnswer()];
      

   }else{
      //make input red
      document.getElementById("input").classList.add("error");
      //focus on skip button
      document.getElementById("next").focus();
       
   }

   
   
}