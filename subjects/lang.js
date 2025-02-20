
let quiz = []


let wordbankJP = null
let wordbankVI = null
let wordbank = null
let language = null

let words = {
    ["eng-hir"]:[],
    ["hir-eng"]:[],
    ["kana"]:[],
    ["eng-vi"]:[],
    ["vi-eng"]:[]
}

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

    setupQuiz({"category":"lang","lang":language})
    
    if (!wordbank) {
        // Load wordbanks if not already loaded
        await loadWordbank(language);
        
    }
    
    console.log("Generate quiz")
    await newQuiz(language);

    words = null
    wordbank = null
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
        operation = questionType[operation]


        statement = ""
        



        if(language == "JP"){
            JPquestions()
        }

        if(language == "VI"){
            VIquestions()
        }



  


 
        question = {
            "questionType":language,
            "phrase":[x],
            "question":[x],
            "statement": statement,
            "answer":answer,
            "userInput":null,
            "time":null
       
        }

       quiz.push(question)
    }
 }

 function nextWord(mode,operation_){
    console.log(operation_)
    if(words[operation_].length<2){ 
        
       words[operation_] = JSON.parse(JSON.stringify(wordbank[language][mode]))

    }
 
    return Math.floor(Math.random()*words[operation_].length)
    
 }


