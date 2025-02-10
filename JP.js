function JPquestions(i){
console.log(i)

    if (operation == "eng-hir"){
        //english to hiragana

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into Hirigana </span>'
        statement += "<br><span id = 'answer'></span>"
        statement += "<br><input id = 'input'></input>"

        x = Object.keys(wordbank[language]["words"][i])[0]
        answer = Object.values(wordbank[language]["words"][i])[0]
     }
     if (operation == "hir-eng"){
        //english to hiragana

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into English </span>'
        statement += "<br><span id = 'answer'></span>"
        statement += "<br><input id = 'input'></input>"

        x = Object.values(wordbank[language]["words"][i])[0]
        answer = Object.keys(wordbank[language]["words"][i])[0]
     }

     if (operation == "hir"){
        //hiragana to romaji

        statement += '<span>Translate "</span>'
        statement += "<span id = 'question'></span>"
        statement += '<span>" into Romaji </span>'
        statement += "<br><span id = 'answer'></span>"
        statement += "<br><input id = 'input'></input>"

        x = wordbank[language]["kana"][i][0]
        answer = wordbank[language]["kana"][i][2]
     }
}