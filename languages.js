//x = word index
let x

 wordbankJP = null
 wordbankVI = null


 async function loadWordbanks() {
    try {
        const responseJP = await fetch("wordbankJP.json");
        wordbankJP = await responseJP.json();

        const responseVI = await fetch("wordbankVI.json");
        wordbankVI = await responseVI.json();

        console.log("Wordbanks loaded successfully.");
    } catch (error) {
        console.error("Error loading wordbanks:", error);
    }
}



let words
let wordbank

    function newQuestion(language){
        
        wordbank = eval("wordbank"+language)
        
        if (!wordbank || Object.keys(wordbank).length === 0) {
            console.error("Wordbank not loaded yet.");
            document.getElementById("question").innerHTML = "Loading...";
            return;
        }
        
        words = Object.keys(wordbank);
    
        x = Math.floor(Math.random() * words.length)
    
        document.getElementById("check").style.visibility = "visible"

        document.getElementById("question").innerHTML = String(words[x]);
        document.getElementById("answer").innerHTML = "<b>"+ String(wordbank[words[x]]);
        document.getElementById("answer").style.visibility = "hidden"
    }
    
    function showAnswer() {
        document.getElementById("answer").style.visibility = "visible"
        
        document.getElementById("check").style.visibility = "hidden"
    }

    async function startQuiz(language) {
        // Wait until wordbankJP and wordbankVI are loaded
        if (!wordbankJP || !wordbankVI) {
            
            await loadWordbanks();
        }
        console.log("start")
        newQuestion(language);
    }