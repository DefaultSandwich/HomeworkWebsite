const operations = ["add", "sub", "mul", "div"]


function loadQuestion() {
    let question = questionJSON
    let answer = null

    let x = Math.random();
    let y = Math.random();

    let operation = Math.floor(Math.random() * quizCache.meta.category.length);

    operation = quizCache.meta.category[operation]
    console.log(operation)
    question.statement.tts = { "text": "", "lang": "en" }


    if (operation == "add") {
        //addition
        x = Math.floor(x * 89) + 10
        y = Math.floor(y * 8) + 2
        answer = x + y;
        question.statement.tts.text = x + "plus" + y
    }
    if (operation == "sub") {
        //subtraction
        x = Math.floor(x * 10) + 10
        y = Math.floor(y * 8) + 2

        answer = x - y;
        question.statement.tts.text = x + "minus" + y
    }
    if (operation == "mul") {
        //multiplication
        x = Math.floor(x * 10) + 2
        y = Math.floor(y * 10) + 2

        answer = x * y;
        question.statement.tts.text = x + "times" + y
    }
    if (operation == "div") {
        //division
        x = Math.floor(x * 10) + 2
        y = Math.floor(y * 10) + 2

        x = x * y

        answer = x / y;
        question.statement.tts.text = x + "divided by" + y
    }
    let questionString

    questionString = String(x) + symbols[operations.indexOf(operation)] + String(y)



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