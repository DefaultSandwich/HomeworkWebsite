


function loadQuestion() {
    let question = questionJSON
    let answer = null

    let x = Math.random();
    let y = Math.random();



    

    question.statement.tts = { "text": "", "lang": "en" }



    //multiplication
   

    x = quizCache.meta.category
     console.log(x)
    y = Math.floor(y * 10) + 2

    answer = x * y;
    question.statement.tts.text = x + " times " + y



    let questionString

    questionString = String(x) + symbols[2] + String(y)



    question.answer[0] = answer
    question.statement.question = questionString
    question.statement.HTML.start = questionString
    question.statement.HTML.middle = " = "
    question.statement.HTML.end = " <input id = 'input0' style = 'width:3em' type = 'number' inputMode = 'decimal' max='9999' required = 'true'></input>"
    question.statement.HTML.end += "<button type = 'button' id = 'speaker'><span class='material-symbols-outlined'>text_to_speech</span ></button > "
    question.statement.HTML.end += "<span id = 'answer0'></span>"



    return question
}

async function appendDependencies() {
    await appendScripts("./subjects/scripts/numbers/numbers.js")
}