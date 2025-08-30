
function next() {

    let next = document.getElementById("next")

    next.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("next").click();
        }
    });
}

function formatSpchButton(questionID_, i) {
    if (document.getElementById("speaker" + `${i}`)) {
        // document.getElementById("speaker" + `${i}`).className = "material-symbols-outlined"
        document.getElementById("speaker" + `${i}`).setAttribute("onclick", `speak(${questionID_})`)
    }
}


function speak(questionID_) {
    let tts
    tts = new SpeechSynthesisUtterance()
    tts.text = quizCache.questions[questionID_].statement.tts.text
    tts.lang = quizCache.questions[questionID_].statement.tts.lang
    // tts.voice = quizCache.questions[questionID].statement.tts.voice
    if (localStorage.getItem("settings") != null) {
        tts.voice = window.speechSynthesis.getVoices().find(voice => voice.name == JSON.parse(localStorage.getItem("settings")).voices[tts.lang])
    }
    speechSynthesis.speak(tts)
}

