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

    //x is distance



    //y is required speed
    if (operation == "norm") {
        x = Math.floor(x * 1500) + 500
        y = Math.floor(y * 130) + 30
    }
    if (operation == "shinkansen") {
        x = Math.floor(x * 4000) + 2000
        y = Math.floor(y * 160) + 160
    }
    console.log(y)

    answer = { "value": y, "unit": "kph", "tolerance": 0.1 }



    //y is time
    y = x / (y / 3.6)



    console.log(y)






    question.statement.tts.text = `Distance is ${x}metres, Time is ${Math.floor(y / 60)}minutes ${y % 60}seconds`


    let questionString

    questionString = `D = ${x}m <br> T = ${Math.floor(y / 60)}min ${(y % 60).toFixed(0)}s`



    question.answer[0] = answer
    question.statement.question = questionString
    question.statement.HTML.start = questionString
    question.statement.HTML.middle = "<br>What is the required speed?"
    question.statement.HTML.end = " <input id = 'input0' style = 'width:3em' type = 'number' inputMode = 'decimal' max='9999' required = 'true'></input>"
    question.statement.HTML.end += "<button type = 'button' id = 'speaker'><span class='material-symbols-outlined'>text_to_speech</span ></button > "
    question.statement.HTML.end += "<span id = 'answer0'></span>"



    return question
}

async function appendDependencies() {
    await appendScripts("./subjects/scripts/numbers/numbers.js")
}