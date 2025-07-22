


function loadQuestion() {
    let question = questionJSON
    let speech = {}

    let answer = null
    let word = null

    let x = Math.random();


    let operation = Math.floor(Math.random() * quizCache.meta.category.length);

    operation = quizCache.meta.category[operation]
    console.log(operation)

    let questionString = [null, null, null]



    if (operation == "hir" || operation == "kata") {
        //hiragana/kata to romaji



        word = nextWord("kana", "kana")

        if (operation == "hir") {
            x = word[0]
        }
        else {
            x = word[1]
        }
        operation = "kana"

        answer = word[2]

        questionString[0] = "Translate 「"
        questionString[1] = x
        questionString[2] = "」"
        // questionString[2] += "<button id = 'speaker'></button>"
        questionString[2] += "into Romaji"
        questionString[2] += "<br><input id = 'input0'></input>"
        questionString[2] += "<span id = 'answer0'></span>"

        




    }








    question.answer[0] = answer
    question.statement.question = questionString[1]
    question.statement.HTML.start = questionString[0]
    question.statement.HTML.middle = questionString[1]
    question.statement.HTML.end = questionString[2]

    // speech.text = questionString[1]
    // speech.lang = "ja"

    // question.statement.tts = speech



    return question
}

async function appendDependencies() {
    await appendScripts("./subjects/scripts/lang/lang.js")
    await loadWordbank("wordbankJP")
    console.log(wordbank)
}