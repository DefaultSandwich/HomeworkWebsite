


let wordbank = null
let language = null

let words = {
    ["eng-hir"]: [],
    ["hir-eng"]: [],
    ["kana"]: [],
    ["eng-vi"]: [],
    ["vi-eng"]: [],
    ["kanji-ro"]: [],
    ["ro-kanji"]: [],
    ["kana-ro"]: [],
    ["ro-kana"]: []
}

async function loadWordbank(language) {
    try {
        
        const response = await fetch("./subjects/scripts/lang/wordbanks/wordbank"+ language + ".json");

        wordbank = await response.json();


        console.log("Wordbank loaded successfully.");
    } catch (error) {
        console.error("Error loading wordbank:", error);
    }

}

function nextWord(mode, operation_) {

    let i
    let word
  

    if (words[operation_].length < 2) {

        words[operation_] = JSON.parse(JSON.stringify(wordbank[mode]))

    }

    i = Math.floor(Math.random() * words[operation_].length)
    word = words[operation_][i]

    //remove word from list of words
    words[operation_].splice(i, 1)

    return word



}