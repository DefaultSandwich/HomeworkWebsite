

function loadQuestion() {
    let question = questionJSON
    let speech = {}

    let answer = null

    let x = Math.random();
    let word


    let operation = Math.floor(Math.random() * quizCache.meta.category.length);

    operation = quizCache.meta.category[operation]
    console.log(operation)

    let questionString = [null, null, null]

    if (operation == "eng-hir") {
        //english to hiragana

        word = nextWord("words", operation)


        x = Object.keys(word)[0]
        answer = Object.values(word)[0]

        questionString[0] = "Translate \""
        questionString[1] = x
        questionString[2] = "\""
        questionString[2] += "<button type='button' id = 'speaker'></button>"
        questionString[2] += "into Hirigana"
        questionString[2] += "<br><input id = 'input0'></input>"
        questionString[2] += "<span id = 'answer0'></span>"

        speech.text = questionString[1]
        speech.lang = "en"

        question.statement.tts = speech



    }

    if (operation == "hir-eng") {
        //english to hiragana


        word = nextWord("words", operation)

        x = Object.values(word)[0]
        answer = Object.keys(word)[0]

        questionString[0] = "Translate 「"
        questionString[1] = x
        questionString[2] = "」"
        questionString[2] += "<button type='button' id = 'speaker'></button>"
        questionString[2] += "into English"
        questionString[2] += "<br><input id = 'input0'></input>"
        questionString[2] += "<span id = 'answer0'></span>"

        speech.text = questionString[1]
        speech.lang = "ja"

        question.statement.tts = speech

    }

    if (operation == "kanji-ro") {
        //kanji to romaji


        word = nextWord("kanji", operation)

        x = Object.values(word)[0]
        answer = Object.keys(word)[0]

        questionString[0] = "Translate 「"
        questionString[1] = x
        questionString[2] = "」into Romaji"
        questionString[2] += "<br><input id = 'input0'></input>"
        questionString[2] += "<span id = 'answer0'></span>"




    }
    if (operation == "ro-kanji") {
        //romaji to kanji


        word = nextWord("kanji", operation)

        x = Object.keys(word)[0]
        answer = Object.values(word)[0]

        questionString[0] = "Translate 「"
        questionString[1] = x
        questionString[2] = "」into Kanji"
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
    await loadWordbank("wordbankJP")
    console.log(wordbank)
}