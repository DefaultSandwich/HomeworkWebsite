//python -m http.server 8000



let quiz = []

//Generate start and setup quiz
async function startQuiz() {
   // Wait until quiz generated

   await newQuiz();

   //Start quiz

   await setupQuiz({"category":"maths"})
   nextQuestion();
}

//Create quiz

let operation
let x 
let y 
let answer
let questionID
let userInput


async function newQuiz(){
   quiz = []
   console.log("new quiz")
   
  
  

   for(let i=0; i <quizLength; i++){
      let question
         answer=null;
         //generate 1 digit number with decimals
         x = Math.random();
         y = Math.random();
         operation = Math.floor(Math.random()*questionType.length);
         console.log(operation)
         operation = questionType[operation]
         console.log(operation)
         

      if (operation == "add"){
         //addition
         x = Math.floor(x*100)
         y = Math.floor(y*8)+2
         answer = x +y;
      }
      if (operation == "sub"){
         //subtraction
         x = Math.floor(x*10)+10
         y = Math.floor(y*8)+2

         answer = x - y;
      }
      if (operation == "mul"){
         //multiplication
         x = Math.floor(x*10)+2
         y = Math.floor(y*10)+2
        
         answer = x * y;
      }
      if (operation == "div"){
         //division
         x = Math.floor(x*10)+2
         y = Math.floor(y*10)+2
       
         x = x * y
         
         answer = x / y;
      }

    question = {
      "questionType":operation,
      "statement":String(x)+symbols[questionType.indexOf(operation)]+String(y),
      "question":[x,y],
      "answer":answer,
      "userInput":null
      
    }
      
      quiz.push(question)
   }
}









