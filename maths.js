//python -m http.server 8000



let quiz = []

//Generate start and setup quiz
async function startQuiz() {
   // Wait until quiz generated
   if (quiz.length<10) {
       
       await newQuiz();
   }
   //Start quiz

   setupQuiz()



   nextMathsQuestion();
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
      "statement":String(x)+symbols[operation]+String(y),
      "question":[x,y],
      "answer":answer,
      "userInput":null
      
    }
      
      quiz.push(question)
   }
}




function nextMathsQuestion(){
   nextQuestion();


}







