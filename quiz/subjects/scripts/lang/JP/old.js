


function JPquestions() {
   let i



   if (operation == "eng-hir") {
      //english to hiragana

      i = nextWord("words", operation)





      statement += '<span>Translate "</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>" into Hirigana </span>'
      statement += "<br><span id = 'answer0'></span>"
      statement += "<br><input id = 'input0'></input>"

      x = Object.keys(words[operation][i])[0]
      answer = { "hir": Object.values(words[operation][i])[0] }


   }

   if (operation == "hir-eng") {
      //english to hiragana


      i = nextWord("words", operation)

      statement += '<span>Translate 「</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>」  into English </span>'
      statement += "<br><span id = 'answer0'></span>"
      statement += "<br><input id = 'input0'></input>"


      x = Object.values(words[operation][i])[0]
      answer = { "eng": Object.keys(words[operation][i])[0] }

   }

   if (operation == "hir" || operation == "kata") {
      //hiragana/kata to romaji



      i = nextWord("kana", "kana")

      statement += '<span>Translate </span>'
      statement += "<span id = 'question'></span>"
      statement += '<span> into Romaji </span>'
      statement += "<br><input id = 'input0'></input>"
      statement += "<span id = 'answer0'></span>"
      

      if (operation == "hir") {
         x = words["kana"][i][0]
      }
      else {
         x = words["kana"][i][1]
      }
      operation = "kana"

      answer = { "ro": words["kana"][i][2] }
   }
   if (operation == "kanji-ro") {
      //kanji to romaji


      i = nextWord("kanji", operation)

      statement += '<span>Translate 「</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>」  into romaji </span>'
      statement += "<br><input id = 'input0'></input>"
      statement += "<span id = 'answer0'></span>"
      


      x = Object.values(words[operation][i])[0]
      answer = { "ro": Object.keys(words[operation][i])[0] }

   }
   if (operation == "ro-kanji") {
      //romaji to kanji


      i = nextWord("kanji", operation)

      statement += '<span>Translate 「</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>」  into kanji </span>'
      statement += "<br><input id = 'input0'></input>"
      statement += "<span id = 'answer0'></span>"


      x = Object.keys(words[operation][i])[0]
      answer = { "ro": Object.values(words[operation][i])[0] }

   }

   if (operation == "ro-kana") {
      //romaji to kana


      i = nextWord("romaji", operation)

      statement += '<span>Translate 「</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>」  into kana </span>'
      
      statement += "<br><input id = 'input0'></input>"
      statement += "<span id = 'answer0'></span>"


      x = Object.keys(words[operation][i])[0]
      answer = { "ro": Object.values(words[operation][i])[0] }
   }
   if (operation == "kana-ro") {
      //kana to romaji


      i = nextWord("romaji", operation)

      statement += '<span>Translate 「</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>」  into romaji </span>'
      
      statement += "<br><input id = 'input0'></input>"
      statement += "<span id = 'answer0'></span>"


      x = Object.values(words[operation][i])[0]
      answer = { "ro": Object.keys(words[operation][i])[0] }
   }

   words[operation].splice(i, 1)
}

