





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

   if (operation == "vi-eng") {
      //viet to english
      word = nextWord("conjunctions", operation)

      x = Object.values(word)[0]
      answer = Object.keys(word)[0]

      questionString[0] = "Translate into English<br>\""
      questionString[1] = formatValue(x)
      questionString[2] = "\""
      questionString[2] += "<button  type = 'button' id = 'speaker'><span class='material-symbols-outlined'>text_to_speech</span ></button>"
     
      questionString[2] += "<br><input id = 'input0'></input>"
      questionString[2] += "<span id = 'answer0'></span>"
      speech.lang = "vi"


   }

   if (operation == "eng-vi") {
      //english to viet
      word = nextWord("conjunctions", operation)

      x = Object.keys(word)[0]
      answer = Object.values(word)[0]

      questionString[0] = "Translate into Vietnamese<br>\""
      questionString[1] = formatValue(x)
      questionString[2] = "\""
      questionString[2] += "<button  type = 'button' id = 'speaker'><span class='material-symbols-outlined'>text_to_speech</span ></button>"
      
      questionString[2] += "<br><input id = 'input0'></input>"
      questionString[2] += "<span id = 'answer0'></span>"
      speech.lang = "en"



   }







   question.answer[0] = answer
   question.statement.question = questionString[1]
   question.statement.HTML.start = questionString[0]
   question.statement.HTML.middle = questionString[1]
   question.statement.HTML.end = questionString[2]

   speech.text = questionString[1]


   question.statement.tts = speech

   return question
}

async function appendDependencies() {
   await appendScripts("./subjects/scripts/lang/lang.js")
   await loadWordbank("wordbankVI")
   console.log(wordbank)
}