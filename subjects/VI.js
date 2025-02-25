



function VIquestions(){
 let i
    if (operation == "eng-vi"){
        //english to hiragana
   
        i = nextWord("words",operation)
        

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into Viet </span>'
        statement += "<br><span id = 'answer0'></span>"
        statement += "<br><input id = 'input0'></input>"

        x = Object.keys(words[operation][i])[0]
        answer = {"vi":Object.values(words[operation][i])[0]}


     }
     if (operation == "vi-eng"){
        //english to hiragana
        i = nextWord("words",operation)

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into English </span>'
        statement += "<br><span id = 'answer0'></span>"
        statement += "<br><input id = 'input0'></input>"

        x = Object.values(words[operation][i])[0]
        answer = {"eng":Object.keys(words[operation][i])[0]}

     }
}