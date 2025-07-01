let quizCache = null
let questionID
let category = []
let gameMode = null


const questionJSON = {
    "statement": {
        "image": "",
        "question": "",
        "HTML": {
            "start": "",
            "middle": "",
            "end": ""
        }
    },
    "answer": [],
    "userInput": [],
    "time": null
}

const quizJSON = {
    "meta": {
        "category": [],
        "gameMode": "",
        "subject": ""
    },
    "questions": []
}

async function startQuiz() {

    quizCache = JSON.parse(localStorage.getItem('quiz'))
    questionID = 0

    const urlParams = new URLSearchParams(window.location.search);

    if (quizCache == null || quizCache.questions.length < 1 || urlParams.get("continue") == "true") {
        //get quiz paramaters

        subject = decodeURIComponent(urlParams.get("subject"))
        category = urlParams.getAll("category")
        console.log(category)

        quizLength = Number(urlParams.get("quizLength"))

        gameMode = urlParams.get("gameMode")

        if (quizLength == null || quizLength == 0) {
            //if urlparams null go to home
            console.error("no urlparams")
            window.location.href = "../index.html"
        }

        //append scripts
        console.log("appending")
        console.log(subject)
        await appendScripts("subjects/scripts/" + subject + ".js")
        await appendDependencies()

        //generate quiz
        newQuiz()

        if (urlParams.get("continue") == "true") {
            //start questionID from previous quiz
            questionID = JSON.parse(localStorage.getItem('quiz')).questions.length

            console.log("continue")
            quizCache.questions.unshift(...JSON.parse(localStorage.getItem('quiz')).questions)

        }

        //save quiz
        localStorage.setItem('quiz', JSON.stringify(quizCache))

    } else {
        console.log("existing save found")

        category = quizCache.meta.category
        gameMode = quizCache.meta.gameMode

        //make questionID start from first question with no time
        questionID = quizCache.questions.findIndex(obj => obj.time === null);

    }


    //run quiz
    quizLength = quizCache.questions.length

    //setup stopwatch
    if (quizCache.meta.gameMode == "timed") {
        document.getElementById("stopwatch").hidden = false
    } else {
        document.getElementById("stopwatch").hidden = true
    }

    //load question
    renderQuestion()


}

function newQuiz() {

    //clear quizCache
    quizCache = quizJSON
    //set metadata
    quizCache.meta.category = category
    quizCache.meta.gameMode = gameMode
    quizCache.meta.subject = subject




    //generate questions

    for (let i = 0; i < quizLength; i++) {
        console.log("newQ")
        newQuestion()
    }

}

function newQuestion() {

    //fetch new question

    let question
    question = JSON.parse(JSON.stringify(loadQuestion()))
    quizCache.questions.push(question)

}

function renderQuestion() {
    console.log(questionID)
    //displays question onto screen

    //check if end question
    if (questionID < quizCache.questions.length && questionID >= 0) {
        //update heading
        document.getElementById("heading").innerHTML = "Question " + String(questionID + 1) + " of " + String(quizLength)
        //hide buttons
        document.getElementById("next").hidden = true
        //show buttons
        document.getElementById("check").hidden = false
        document.getElementById("skip").hidden = false
        //load next question
        document.getElementById("statement").innerHTML = quizCache.questions[questionID].statement.HTML.start
        document.getElementById("statement").innerHTML += quizCache.questions[questionID].statement.HTML.middle
        document.getElementById("statement").innerHTML += quizCache.questions[questionID].statement.HTML.end
        //hover on first input
        document.getElementById("input0").focus()


        startStopWatch()

    } else {
        //go to results page
        localStorage.setItem('quiz', JSON.stringify(quizCache))
        window.location.href = "results.html"
    }

}

function checkQuestion() {
    //fetch answers
    submitAnswer()

    //show answers
    let answerList = quizCache.questions[questionID].answer

    for (let i = 0; i < answerList.length; i++) {
        let value = document.getElementById("input" + String(i)).value


        console.log(answerList[i])
        if (compare(value, answerList[i])) {
            console.log("correct")
            document.getElementById("answer" + String(i)).innerHTML = tick

        } else {
            console.log("wrong")
            document.getElementById("answer" + String(i)).innerHTML = formatValue(answerList[i]) + cross

        }
        document.getElementById("input" + String(i)).value = value
        document.getElementById("input" + String(i)).disabled = true
    }

}

function nextQuestion() {
    questionID++
    renderQuestion()
    console.log(questionID)
}

function skipQuestion() {
    //log time
    stopStopwatch()
    if (quizCache.questions[questionID] != null) {
        quizCache.questions[questionID].time = fetchTime()
    }


    //next question
    questionID++
    renderQuestion()
}

async function appendScripts(path) {
    return new Promise((resolve, reject) => {

        let script = document.createElement("script");
        script.src = path;
        script.onload = () => resolve();  // Resolve the promise after loading
        script.onerror = () => reject("Failed to load script");
        document.body.appendChild(script);


    });

}

function submitAnswer() {
    //log time
    stopStopwatch()
    quizCache.questions[questionID].time = fetchTime()

    //log answers


    let answerList = quizCache.questions[questionID].answer

    for (let i = 0; i < answerList.length; i++) {
        console.log(document.getElementById("input" + String(i)).value)
        quizCache.questions[questionID].userInput[i] = document.getElementById("input" + String(i)).value.trim()
    }

    //save quiz to storage
    localStorage.setItem('quiz', JSON.stringify(quizCache))



    //hide buttons
    document.getElementById("check").hidden = true
    document.getElementById("skip").hidden = true
    //show buttons
    document.getElementById("next").hidden = false
    //focus on button
    document.getElementById("next").focus()
}

