


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
    x = Math.random()*10
    //multiply by 1,10,100 or 1000 then floor
    x = Math.floor(x * Number(operation))
    console.log(x)

    answer = x

    questionString[0] = "Listen and write number "
    questionString[1] = "<button type='button' id = 'speaker'></button>"
    questionString[2] = "<br><input id = 'input0'></input>"
    questionString[2] += "<span id = 'answer0'></span>"


    speech.text = x
    speech.lang = "ja"
    speech.autoplay = true

    question.statement.tts = speech







    question.answer[0] = answer
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