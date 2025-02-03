
let quiz = []

let wordbankJP = null
let wordbankVI = null
let wordbank = []


 async function loadWordbanks() {
    try {
        const responseJP = await fetch("wordbankJP.json");
        wordbankJP = await responseJP.json();

        const responseVI = await fetch("wordbankVI.json");
        wordbankVI = await responseVI.json();

        console.log("Wordbanks loaded successfully.");
    } catch (error) {
        console.error("Error loading wordbanks:", error);
    }
}


async function startQuiz(language) {
    
    if (!wordbankJP || !wordbankVI) {
        // Wait until wordbankJP and wordbankVI are loaded
        await loadWordbanks();
        
    }
    if(quiz.length<10){
        //Wait until quiz generated
        
        console.log("Generate quiz")
        await newQuiz(language);
    }

    console.log("start")
    nextQuestion(language);
}

//Create Quiz
// x = word index
let x
let answer
let questionID = -1


async function newQuiz(language){
    wordbank = {JP:wordbankJP,VI:wordbankVI}
   let question
  
  

    for(let i=0; i <10; i++){
          answer=null;
          x=Object.keys(wordbank[language])[i]
          answer = wordbank[language][x]
          
          
 
       
 
     question = {
       
       "x":x,
       "answer":answer
       
     }
       console.log(question)
       quiz.push(question)
    }
 }

let words


    function nextQuestion(){
        // change to next question
        questionID++


       
        
        if (!wordbank || Object.keys(wordbank).length === 0) {
            console.error("Wordbank not loaded yet.");
            document.getElementById("question").innerHTML = "Loading...";
            return;
        }
        
        if(questionID < 10){
            document.getElementById("counter").innerHTML = "Question "+String(questionID+1)+" of 10"
         
         
           
            document.getElementById("check").hidden = false
            document.getElementById("next").innerHTML = "Skip"
            document.getElementById("answer").style.visibility = "hidden"

         
            //x is word not index
            x = quiz[questionID]["x"]
            
         
            
            document.getElementById("question").innerHTML = x;
               
           
         
            
         
          
           
         }else{
            alert("no more questions")
         }
         










    }
    
    function showAnswer() {
        answer = quiz[questionID]["answer"]

        document.getElementById("next").innerHTML = "Next"
        document.getElementById("answer").style.visibility = "visible"
        document.getElementById("answer").innerHTML = "<b>="+String(answer);
        document.getElementById("check").hidden = true
    }

