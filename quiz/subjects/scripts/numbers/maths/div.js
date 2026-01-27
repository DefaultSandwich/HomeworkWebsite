


function loadQuestion() {
    let question = questionJSON
    let answer = null

    let y = Math.floor(Math.random() * quizCache.meta.category.length);
    y = quizCache.meta.category[y]






    question.statement.tts = { "text": "", "lang": "en" }



    //division
    x = Math.floor(x * 10) + 2


    x = x * y

    answer = x / y;
    question.statement.tts.text = x + " divided by " + y



    let questionString

    questionString = String(x) + symbols[3] + String(y)



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