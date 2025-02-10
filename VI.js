function VIquestions(i){
    if (operation == "eng-vi"){
        //english to hiragana

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into Viet </span>'
        statement += "<br><span id = 'answer'></span>"
        statement += "<br><input id = 'input'></input>"

        x = Object.keys(wordbank[language]["words"][i])[0]
        answer = Object.values(wordbank[language]["words"][i])[0]

        console.log(statement)
     }
     if (operation == "vi-eng"){
        //english to hiragana

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into English </span>'
        statement += "<br><span id = 'answer'></span>"
        statement += "<br><input id = 'input'></input>"

        x = Object.values(wordbank[language]["words"][i])[0]
        answer = Object.keys(wordbank[language]["words"][i])[0]

        console.log(statement)
     }
}