
let quiz = []


let wordbankJP = null
let wordbankVI = null
let wordbank = null
let language = null

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


async function startQuiz() {
    language = subject
    console.log(language)
    setupQuiz({"category":"lang","lang":language})
    
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
let operation
let statement


async function newQuiz(language){
    
    
   let question
  
  

    for(let i=0; i <quizLength; i++){
        answer=null;

        operation = Math.floor(Math.random()*questionType.length);
        console.log(operation)
        operation = questionType[operation]
        console.log(operation)

        statement = ""
        

        if(language == "JP"){
            JPquestions(i)
        }

        if(language == "VI"){
            VIquestions(i)
        }

  

        console.log(statement)
 
        question = {
            "questionType":language,
            "phrase":[x],
            "question":[x],
            "statement": statement,
            "answer":answer,
            "userInput":null,
            "time":[]
       
        }

       quiz.push(question)
    }
 }




