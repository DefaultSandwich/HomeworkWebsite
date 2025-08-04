


function loadQuestion() {
    let question = questionJSON

    let answer = null
    let word = null

    let x = Math.random();


    let operation = Math.floor(Math.random() * quizCache.meta.category.length);

    operation = quizCache.meta.category[operation]
    console.log(operation)

    let questionString = [null, null, null]

    let speech = {}

    //generate random number
    let min = Math.pow(10, operation - 1)
    let max = Math.pow(10, operation) - 1
    x = Math.floor(Math.random() * (max - min + 1)) + min

    answer = x

    questionString[0] = "Listen and write number "
    questionString[1] = "<button type='button' id = 'speaker'></button>"
    questionString[2] = "<br><input id = 'input0'  type = 'number' inputMode = 'decimal' max='999999'></input>"
    questionString[2] += "<span id = 'answer0'></span>"


    speech.text = x
    speech.lang = "ja"
    speech.autoplay = true

    question.statement.tts = speech







    question.answer[0] = {"unit":"unit","value":answer}
    question.statement.question = questionString[1]
    question.statement.HTML.start = questionString[0]
    question.statement.HTML.middle = questionString[1]
    question.statement.HTML.end = questionString[2]


    return question
}

async function appendDependencies() {
    await appendScripts("./subjects/scripts/lang/lang.js")
    await loadWordbank("wordbankJP")
    console.log(wordbank)
}