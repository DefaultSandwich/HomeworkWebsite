//python -m http.server 8000



let quiz = []

//Generate start and setup quiz
async function startQuiz(mode) {
   // Wait until quiz generated

   await newQuiz(mode);

   //Start quiz

   setupQuiz()
   nextQuestion();
}

//Create quiz

let operation
let x 
let y 
let answer
let questionID
let userInput


async function newQuiz(mode){
   quiz = []
   console.log("new quiz")
   
  
  

   for(let i=0; i <10; i++){
      let question
         answer=null;
         //generate 1 digit number with decimals
         x = Math.random();
         y = Math.random();
         operation = Math.floor(Math.random()*2);
        
         if(mode=="'mul_div'"){
            operation += 2
            
         }

      if (operation == 0){
         //addition
         x = Math.floor(x*100)
         y = Math.floor(y*8)+2
         answer = x +y;
      }
      if (operation == 1){
         //subtraction
         x = Math.floor(x*10)+10
         y = Math.floor(y*8)+2

         answer = x - y;
      }
      if (operation == 2){
         //multiplication
         x = Math.floor(x*10)+2
         y = Math.floor(y*10)+2
        
         answer = x * y;
      }
      if (operation == 3){
         //division
         x = Math.floor(x*10)+2
         y = Math.floor(y*10)+2
       
         x = x * y
         
         answer = x / y;
      }

    question = {
      "mode":operation,
      "statement":String(x)+symbols[operation]+String(y),
      "question":[x,y],
      "answer":answer,
      "userInput":null
      
    }
      
      quiz.push(question)
   }
}









