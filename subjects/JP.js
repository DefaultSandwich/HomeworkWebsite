


function JPquestions(){
   let i



    if (operation == "eng-hir"){
      //english to hiragana

        i = nextWord("words",operation)

      

    

      statement += '<span>Translate "</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>" into Hirigana </span>'
      statement += "<br><span id = 'answer0'></span>"
      statement += "<br><input id = 'input0'></input>"

      x = Object.keys(words[operation][i])[0]
      answer = Object.values(words[operation][i])[0]
      
      
   }
   
   if (operation == "hir-eng"){
      //english to hiragana

      
      i = nextWord("words",operation)

      statement += '<span>Translate "</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>" into English </span>'
      statement += "<br><span id = 'answer0'></span>"
      statement += "<br><input id = 'input0'></input>"

     
      x = Object.values(words[operation][i])[0]
      answer = Object.keys(words[operation][i])[0]
      
   }

   if (operation == "hir"||operation == "kata"){
      //hiragana to romaji
      

      
      i = nextWord("kana","kana")

      statement += '<span>Translate "</span>'
      statement += "<span id = 'question'></span>"
      statement += '<span>" into Romaji </span>'
      statement += "<br><span id = 'answer0'></span>"
      statement += "<br><input id = 'input0'></input>"

      if(operation == "hir"){
         x = words["kana"][i][0]}
         else{
         x = words["kana"][i][1]
      }
      operation = "kana"

      answer = words["kana"][i][2]
   }

   words[operation].splice(i,1)
}

