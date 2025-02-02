//python -m http.server 8000



let quiz = []

//Generate start and setup quiz
async function startQuiz() {
   // Wait until wordbankJP and wordbankVI are loaded
   if (quiz.length<10) {
       
       await newQuiz();
   }
   console.log("start")
   nextQuestion();
}

//Create quiz

let operation
let x 
let y 
let answer
let questionID = -1

async function newQuiz(){
  
   
  
  

   for(let i=0; i <10; i++){
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
      "answer":answer
      
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


   document.getElementById("input").classList.remove("error");
   document.getElementById("check").hidden = false
   document.getElementById("next").innerHTML = "Skip"
   document.getElementById("answer").style.visibility = "hidden"
   document.getElementById("input").style.visibility = "visible"

   operation = quiz[questionID]["operation"]
   x = quiz[questionID]["x"]
   y = quiz[questionID]["y"]

   if (operation == 0){
      //addition
      document.getElementById("question").innerHTML = String(x) + "+" + String(y);
      
   }
   if (operation == 1){
      //subtraction
      
      document.getElementById("question").innerHTML = String(x) + "−" + String(y);
      
   }
   if (operation == 2){
      //multiplication
      document.getElementById("question").innerHTML = String(x) + "×" + String(y);
      
   }
   if (operation == 3){
      //division
      
      document.getElementById("question").innerHTML = String(x) + "÷" + String(y);
      
   }

   

 
  
}else{
   alert("no more questions")
}
}

function showAnswer() {
   operation = quiz[questionID]["operation"]
   x = quiz[questionID]["x"]
   y = quiz[questionID]["y"]
   answer = quiz[questionID]["answer"]
   
   
   //show answer
    document.getElementById("answer").innerHTML = "<b>="+String(answer);
    
    //check if input filled
    if(document.getElementById("input").value != ""){
      //check answer
      if(document.getElementById("input").value == answer){
         document.getElementById("answer").innerHTML += "<span style = 'color :forestGreen'>✓</span>";
      }  
      else{
         document.getElementById("answer").innerHTML += "<span style = 'color :red'>✗</span>";
      }
       //Update elements
    document.getElementById("input").value = null
    document.getElementById("answer").style.visibility = "visible"
    document.getElementById("input").style.visibility = "hidden"
    document.getElementById("check").hidden = true
    document.getElementById("next").innerHTML = "Next"
    
   }else{
      //make input red
      if (document.getElementById("input").value.trim() === "") {
         document.getElementById("input").classList.add("error");
       } else {
         document.getElementById("input").classList.remove("error");
       }
   }
    
   
}