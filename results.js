let quiz
let gameMode

function showResults() {
     quiz = JSON.parse(localStorage.getItem('quiz'));
     gameMode = JSON.parse(localStorage.getItem('gameMode'));

    //Clear results
    document.getElementById("results").innerHTML = ""
    document.getElementById("counter").innerHTML = "Results"
 
 
 
 
    let score = 0
    let questions = 0
    let totalTime = 0
    let quizLength = quiz.length
    for (let i = 0; i < quizLength; i++) {
       //run for every question
 
       //results is one row of content in results html
       let results
 
       //add question
       results = "<div>" + quiz[i]["phrase"]
 
       if (quiz[i]["image"]) {
          //add image
          results += "<br><div id= 'image" + String(i) + "' style='width: auto; max-width: 50vw; height:5em;overflow:scroll'>"
          results += quiz[i]["image"] + "</div>"
       }
 
 
       results += "</div>"
       document.getElementById("results").innerHTML += results
 
 
       if (quiz[i]["image"]) {
          requestAnimationFrame(() => {
             //scroll images to middle after frame refreshes
             document.getElementById("image" + String(i)).scrollTop = 150; // Scroll down
             document.getElementById("image" + String(i)).scrollLeft = 100; // Scroll right
 
          }
          )
       }
 
       let correct = true
       let answers
       answers = quiz[i]["answer"];
 
       if (typeof answers !== "object") {
          console.error("answer not object")
       }
 
       userInput = "<div>"
       answers = "<div>"
 
 
       for (let a = 0; a < Object.keys(quiz[i]["answer"]).length; a++) {
          // Run for every input
          questions++
 
 
          //write userInput
          console.log(userInput)
 
 
          key = Object.keys(quiz[i]["answer"])[a]
          answers += "<span style = 'white-space: nowrap'>"
          answers += "= " + formatValue(quiz[i]["answer"][key], key) + "<br></span>"
 
          if (quiz[i]["userInput"][a] == null) {
             if (a == 0) {
                //set user input to skipped if first input
                userInput += "skipped"
             }
             correct = false
          } else {
 
 
 
 
             userInput += formatValue(quiz[i]["userInput"][a], key)
 
 
             userInput += symbols[checkAnswer(i, a)] + "<br>"
 
             if (checkAnswer(i, a) == 4) {
                //increase score
                score++
 
             } else {
                correct = false
             }
          }
 
 
 
 
       }
 
       console.log(userInput)
       document.getElementById("results").innerHTML += userInput + "</div>"
 
 
       if (correct) {
          //if input correct dont display answer
          answers = "<div class = 'empty'></div>"
       } else {
          answers += "</div>"
       }
 
 
       document.getElementById("results").innerHTML += answers
 
 
       //add time
       if (gameMode == "timed") {
          document.getElementById("results").style = "grid-template-columns: auto auto auto auto;"
 
          let time
 
          if (userInput != null) {
             time = quiz[i]["time"]
             totalTime += Number(time)
 
 
             time = "<div style= 'font-family: Space Mono''>" + countToTime(time)[0] + ":" + countToTime(time)[1] +
                ":" + countToTime(time)[2] + "." + countToTime(time)[3] + "</div>"
 
          } else {
             time = "<div></div>"
          }
 
          document.getElementById("results").innerHTML += time
       } else {
          document.getElementById("results").style = "grid-template-columns: auto auto auto;"
       }
 
 
    }
 
    console.log("done")
 
 
    //total
    let results = "<div style = 'border-bottom :none'>"
    results += "<h3>Total = " + String(score) + "/" + String(questions)
    results += "</h3></div>"
 
 
 
    //percentage
    results += "<div style = 'border-bottom :none'>"
    results += "<h3>= " + String(((score / questions) * 100).toFixed(0)) + "%"
    results += "</h3></div>"
    document.getElementById("results").innerHTML += results
 
    if (gameMode == "timed") {
       //total time
       totalTime = countToTime(totalTime)[0] + ":" + countToTime(totalTime)[1] + ":" + countToTime(totalTime)[2] + "." + countToTime(totalTime)[3] + "s"
 
       time = "<div style = 'border-bottom: none' class = 'empty'></div>"
       time += "<div style= 'font-family: Space Mono; border-bottom: none'><h3>"
       time += totalTime
       time += "</h3></div>"
 
       document.getElementById("results").innerHTML += time
    }
 
    if (score / questions == 1) {
 
 
       document.querySelectorAll('.empty').forEach(e => e.remove());
 
 
       if (gameMode == "timed") {
          document.getElementById("results").style = 'grid-template-columns: auto auto auto'
       } else {
          document.getElementById("results").style = 'grid-template-columns: auto auto'
       }
    }
 
 }