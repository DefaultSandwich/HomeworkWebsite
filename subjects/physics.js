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
         answer={"magnitude":null,"angle":null};
         vectors = []

         svg = "<svg width = 400 height = 400>"
   

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
               y = degToRad(y)
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
               vector += "  style = 'fill: hsl(" + String(i*100) + ",100%,20%) ; text-anchor:middle; dominant-baseline:middle '"
              
              }else{
                  vector += "  style = 'fill: white; stroke: white;stroke-width:0.2em ; text-anchor:middle; dominant-baseline:middle'"
               }
               vector += "x="+String(x2+Math.cos(y)*20)
               vector += " y="+String(y2+Math.sin(y)*-20)
               vector += ">"
               vector += String(convertUnits(x,unit))+unit
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
            vector += String(Math.floor(radToDeg(y-vectors[i-1]["angle"])))+"°"
            vector += "</text>"
            svg += vector}

            
        
         }

         answer["angle"] = radToDeg(vectorTotal(vectors).angle).toFixed(0)
         answer["magnitude"] = vectorTotal(vectors).magnitude.toFixed(2)

         //draw origin
         svg += "<circle cx=200 cy=200 r=3 />"
         svg += "</svg>"


   
         statement = ""
      statement += "<span id = 'question'></span><br>"

      statement += "<div id = 'image' "
      statement += "style= 'width: auto ; height:10em; overflow:scroll'"
   
      statement += "> </div><br>"

      statement += "Magnitude = <input id = 'input0'></input> "
      statement += "<span id = 'answer0'></span><br>"
      statement += "Angle = <input id = 'input1'></input>"
      statement += '<span> </span>'
      statement += "<span id = 'answer1'></span>"
      

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

function convertUnits (value,unit){
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

function vectorTotal(vectors){

   let x = 0
   let y = 0

   for(let i = 0; i<vectors.length;i++){
      x += vectors[i]["magnitude"]*Math.cos(vectors[i]["angle"])
      y += vectors[i]["magnitude"]*Math.sin(vectors[i]["angle"])
   }

   return {"magnitude":Math.sqrt((x**2)+(y**2)),"angle":Math.atan(y/x)}
   
}

function radToDeg(angle){
 return angle/Math.PI*180
}

function degToRad(angle){
   return angle/180*Math.PI
}





