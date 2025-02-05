
let quiz = []

let wordbankJP = null
let wordbankVI = null
let wordbank = null


 async function loadWordbank(language) {
    try {
        const response = await fetch("wordbank"+language+".json");
        wordbank = {"JP":null,"VI":null}
        wordbank[language] =  await response.json();
        

     

        console.log("Wordbank loaded successfully.");
    } catch (error) {
        console.error("Error loading wordbank:", error);
    }
    
    
}


async function startQuiz(language) {

    setupQuiz({"subject":"lang","lang":language})
    
    if (!wordbank) {
        // Wait until wordbankJP and wordbankVI are loaded
        await loadWordbank(language);
        
    }

    console.log("Generate quiz")
    await newQuiz(language);

    nextQuestion();
}

//Create Quiz
// x = word index
let x
let answer
let questionID


async function newQuiz(language){
    
    
   let question
  
  

    for(let i=0; i <10; i++){
          answer=null;
          x=Object.keys(wordbank[language])[i]
          answer = wordbank[language][x]
          
          
 
       
 
     question = {
       "mode":language,
       "question":[x],
       "statement":String(x),
       "answer":answer,
       "userInput":null
       
     }

       quiz.push(question)
    }
 }




