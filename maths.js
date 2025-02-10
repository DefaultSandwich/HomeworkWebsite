//python -m http.server 8000



let quiz = []
let timer = false

//Generate start and setup quiz
async function startQuiz() {
   // Wait until quiz generated

   await newQuiz();

   //Start quiz

   await setupQuiz({"category":"maths"})

   //start question
   nextQuestion();
}

//Create quiz

let operation
let x 
let y 
let answer
let questionID
let userInput

const operations = ["add","sub","mul","div"]



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

      statement = ""
      statement += "<span id = 'question'></span>"
      statement += '<span> = </span>'
      statement += "<input id = 'input'></input>"
      statement += '<span> </span>'
      statement += "<span id = 'answer'></span>"
      

      question = {
      "questionType":operation,
      "statement": statement,
      "phrase":String(x)+symbols[operations.indexOf(operation)]+String(y),
      "question":[x,y],
      "answer":answer,
      "userInput":null,
      "time":[]
      
      }
      
      quiz.push(question)
   }
}









