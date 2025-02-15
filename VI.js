



function VIquestions(){
 let i
    if (operation == "eng-vi"){
        //english to hiragana
   
        i = nextWord("words",operation)
        

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into Viet </span>'
        statement += "<br><span id = 'answer'></span>"
        statement += "<br><input id = 'input'></input>"

        x = Object.keys(words[operation][i])[0]
        answer = Object.values(words[operation][i])[0]

        console.log(operation)
     }
     if (operation == "vi-eng"){
        //english to hiragana
        i = nextWord("words",operation)

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into English </span>'
        statement += "<br><span id = 'answer'></span>"
        statement += "<br><input id = 'input'></input>"

        x = Object.values(words[operation][i])[0]
        answer = Object.keys(words[operation][i])[0]

        console.log(statement)
     }
}