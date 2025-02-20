//python -m http.server 8000



let quiz = []
let timer = false

//Generate start and setup quiz
async function startQuiz() {
   // Wait until quiz generated

   await newQuiz();

   //Start quiz

   await setupQuiz({"category":"maths"})

   //start question
   nextQuestion();
}

//Create quiz

let unit
let x 
let y 
let vectors = []
let svg = []

let answer
let questionID
let userInput

const units = ["N","kN","g","kg"]



async function newQuiz(){
   quiz = []
   console.log("new quiz")


  

   for(let i=0; i <quizLength; i++){
        
      let question
      svg = null
         answer=null;
         vectors = []
   

         for(let i=0; i < 3; i++){
            let vector
            // generate vectors
            //generate 1 digit number with decimals
            // x is magnitude; y is angle in degrees
            x = (Math.random()*5)+10;
            x = x.toFixed(2)
            if(i == 0){
               y = 0

            }
            else {
               y = Math.floor(Math.random()*120) + 30
               y = (y/360) * (2*Math.PI)
               y += vectors[i-1]["angle"];
               
            }

            unit = Math.floor(Math.random()*questionType.length);

            unit = questionType[unit]

            

            vectors.push({"magnitude":x,"angle":y,"unit":unit})

            let x1 
            let x2
            let y1
            let y2

            x1 = 200
            y1 = 200

            x2 = 10*x*Math.cos(y)+200
            y2 = -10*x*Math.sin(y)+200

            //add line to svg
            vector = "<line"
            vector += " x1 = "+String(x1)
            vector += " y1 = "+String(y1)
            vector += " x2 = "+String(9*x*Math.cos(y)+200)
            vector += " y2 = "+String(-9*x*Math.sin(y)+200)
            vector += " style = 'stroke: hsl(" + String(i*100) + ",100%,48%);"
            vector += " stroke-width:3' "
            vector += " />"
            svg += vector

            //add arrow head
            vector = "<polygon points='"
            vector += String(x2)+","+String(y2)+" "
            vector += String(x2+Math.cos(y+0.3)*-20)+","+String(y2+Math.sin(y+0.3)*20)+" "
            vector += String(x2+Math.cos(y-0.3)*-20)+","+String(y2+Math.sin(y-0.3)*20)
            vector += " ' style = 'fill: hsl(" + String(i*100) + ",100%,20%)' />"
            svg += vector

            //add magnitude label
            for(let a=0;a<2;a++){
               vector = "<text "
               if(a==1){
               vector += "  style = 'fill: hsl(" + String(i*100) + ",100%,20%)'"
              
              }else{
                  vector += "  style = 'fill: white; stroke: white;stroke-width:0.2em'"
               }
               vector += "x="+String(x2+Math.cos(y)*20)
               vector += " y="+String(y2+Math.sin(y)*-20)
               vector += ">"
               vector += String(convert(x,unit))+unit
               vector += "</text>"
               svg += vector
            }

            //add angle label
            if(i>0)
            {vector = "<text "
            vector += " ' style = 'fill: hsl(" + String(i*100) + ",100%,20%) ; text-anchor:middle; dominant-baseline:middle' "
            vector += "x="+String(x1+Math.cos((y + vectors[i-1]["angle"])/2)*50)
            vector += " y="+String(y1+Math.sin((y + vectors[i-1]["angle"])/2)*-50)
            vector += ">"
            vector += String(Math.floor(((y-vectors[i-1]["angle"])/(2*Math.PI))*360))+"°"
            vector += "</text>"
            svg += vector}

            
        
         }

         //draw origin
         svg += "<circle cx=200 cy=200 r=3 />"


   
         statement = ""
      statement += "<span id = 'question'></span><br>"

      statement += "<svg id = 'image' "
      statement += "width= '400'  height='400'"
   
      statement += "> </svg><br>"

      statement += "Magnitude = <input id = 'input'></input><br>"
      statement += "Angle = <input id = 'input2'></input>"
      statement += '<span> </span>'
      statement += "<span id = 'answer'></span>"
      

      question = {
      "questionType":unit,
      "statement": statement,
      "phrase":"Find the net force",
      "question":vectors,
      "answer":answer,
      "userInput":null,
      "time":null,
      "image":svg
      
      }
      
      quiz.push(question)
      }

      
   
}

function convert (value,unit){
   const G = 9.7803267715

   if(unit == "N"){
      return value
   }

   if(unit == "kN"){
      return value/1000
   }

   if(unit == "g"){
      return (value*G)/1000
   }

   if(unit == "kg"){
      return value*G
   }
   
}







