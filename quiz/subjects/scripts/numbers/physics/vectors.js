const operations = ["add", "sub", "mul", "div"]


function loadQuestion() {
    let question = questionJSON
    let answer = null
    let svg = null

    let x = Math.random();
    let y = Math.random();

    let operation = Math.floor(Math.random() * quizCache.meta.category.length);

    operation = quizCache.meta.category[operation]
    console.log(operation)




    answer = { "magnitude": null, "angle": null };
    vectors = []

    svg = "<svg width = 500 height = 400>"


    for (let i = 0; i < 3; i++) {
        let vector
        // generate vectors
        //generate 1 digit number with decimals
        // x is magnitude; y is angle in degrees
        x = (Math.random() * 5) + 10;
        x = x.toFixed(2)
        if (i == 0) {
            y = 0

        }
        else {
            y = Math.floor(Math.random() * 120) + 30
            y = degToRad(y)
            y += vectors[i - 1]["angle"];

        }

        unit = Math.floor(Math.random() * category.length);

        unit = category[unit]



        vectors.push({ "magnitude": x, "angle": y, "unit": unit })

        let x1
        let x2
        let y1
        let y2

        x1 = 200
        y1 = 200

        x2 = 10 * x * Math.cos(y) + 200
        y2 = -10 * x * Math.sin(y) + 200

        //add line to svg
        vector = "<line"
        vector += " x1 = " + String(x1)
        vector += " y1 = " + String(y1)
        vector += " x2 = " + String(9 * x * Math.cos(y) + 200)
        vector += " y2 = " + String(-9 * x * Math.sin(y) + 200)
        vector += " style = 'stroke: hsl(" + String(i * 100) + ",100%,48%);"
        vector += " stroke-width:3' "
        vector += " />"
        svg += vector

        //add arrow head
        vector = "<polygon points='"
        vector += String(x2) + "," + String(y2) + " "
        vector += String(x2 + Math.cos(y + 0.3) * -20) + "," + String(y2 + Math.sin(y + 0.3) * 20) + " "
        vector += String(x2 + Math.cos(y - 0.3) * -20) + "," + String(y2 + Math.sin(y - 0.3) * 20)
        vector += " ' style = 'fill: hsl(" + String(i * 100) + ",100%,20%)' />"
        svg += vector

        //add magnitude label
        for (let a = 0; a < 2; a++) {
            vector = "<text "
            if (a == 1) {
                vector += "  style = 'fill: hsl(" + String(i * 100) + ",100%,20%) ; text-anchor:middle; dominant-baseline:middle '"

            } else {
                vector += "  style = 'fill: white; stroke: white;stroke-width:0.2em ; text-anchor:middle; dominant-baseline:middle'"
            }
            vector += "x=" + String(x2 + Math.cos(y) * 20)
            vector += " y=" + String(y2 + Math.sin(y) * -20)
            vector += ">"
            vector += String(convertUnits(x, unit)) + unit
            vector += "</text>"
            svg += vector
        }

        //add angle label
        if (i > 0) {
            vector = "<text "
            vector += " ' style = 'fill: hsl(" + String(i * 100) + ",100%,20%) ; text-anchor:middle; dominant-baseline:middle' "
            vector += "x=" + String(x1 + Math.cos((y + vectors[i - 1]["angle"]) / 2) * 50)
            vector += " y=" + String(y1 + Math.sin((y + vectors[i - 1]["angle"]) / 2) * -50)
            vector += ">"
            vector += String(Math.floor(radToDeg(y - vectors[i - 1]["angle"]))) + "°"
            vector += "</text>"
            svg += vector
        }



    }

    answer["angle"] = Number(radToDeg(vectorTotal(vectors).angle).toFixed(0))
    answer["magnitude"] = Number(vectorTotal(vectors).magnitude.toFixed(2))

    //draw origin
    svg += "<circle cx=200 cy=200 r=3 />"
    svg += "</svg>"

    let questionString

    questionString = "What is the Net force? (2dp)"

    question.answer[0] = {"value": answer["magnitude"], "unit": "newton"}
    question.answer[1] = {"value": answer["angle"], "unit": "degree"}

    question.statement.image = svg

    //results thumbnail
    question.statement.question = questionString + "<div style = 'width : auto; height: 7em; overflow: scroll' >" + svg + "</div>"

    //question html
    question.statement.HTML.start = questionString + "<div style = 'width : auto; height: 10em; overflow: scroll' >" + svg + "</div>" + "<br>"

    question.statement.HTML.end = "Magnitude = "
    question.statement.HTML.end += " <input id = 'input0' style = 'width:3em' type = 'number' inputMode = 'decimal' max='9999' required = 'true'></input>N" 
    question.statement.HTML.end += "<br>"
    question.statement.HTML.end += "Angle = "
    question.statement.HTML.end += " <input id = 'input1' style = 'width:3em' type = 'number' inputMode = 'decimal' max='9999' required = 'true'></input>°"

    return question
}

function vectorTotal(vectors) {

    let x = 0
    let y = 0

    for (let i = 0; i < vectors.length; i++) {
        x += vectors[i]["magnitude"] * Math.cos(vectors[i]["angle"])
        y += vectors[i]["magnitude"] * Math.sin(vectors[i]["angle"])
    }

    return { "magnitude": Math.sqrt((x ** 2) + (y ** 2)), "angle": Math.atan(y / x) }

}

async function appendDependencies() {
    await appendScripts("./subjects/scripts/numbers/numbers.js")
}