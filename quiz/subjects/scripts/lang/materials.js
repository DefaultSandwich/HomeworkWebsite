





function loadQuestion() {
    let question = questionJSON

    let answer = null

    let x = Math.random();
    let word


    let operation = Math.floor(Math.random() * quizCache.meta.category.length);

    operation = quizCache.meta.category[operation]
    console.log(operation)

    let questionString = [null, null, null]

    if (operation == "mtrls") {
        //viet to english
        word = nextWord("words", operation)

        x = Object.values(word)[0]
        answer = Object.keys(word)[0]

        questionString[0] = "Translate \""
        questionString[1] = x
        questionString[2] = "\" into English"
        questionString[2] += "<br><input id = 'input0'></input>"
        questionString[2] += "<span id = 'answer0'></span>"



    }


    question.answer[0] = answer
    question.statement.question = questionString[1]
    question.statement.HTML.start = questionString[0]
    question.statement.HTML.middle = questionString[1]
    question.statement.HTML.end = questionString[2]

    return question
}

async function appendDependencies() {
    await appendScripts("./subjects/scripts/lang/lang.js")
    await loadWordbank("materials")
    console.log(wordbank)
}