const operations = ["add", "sub", "mul", "div"]


function loadQuestion() {
    let question = questionJSON
    let answer = null
    let svg = null
    let options

    let x = Math.random();
    let y = Math.random();

    let operation = Math.floor(Math.random() * quizCache.meta.category.length);

    operation = quizCache.meta.category[operation]





    answer = { "magnitude": null, "angle": null };
    let vectors = []

    svg = "<svg width = 600 height = 500>"

    //calculate scale
    // pick random value
    let scale




    options = JSON.parse(JSON.stringify(category))
    let min = 1
    let max = 1

    if (options.includes("g")) {
        min = 0.01
        max = 0.1
    }

    if (options.includes("kg")) {
        if (min > 100) { min = 100 }
        if (max < 1000) { max = 1000 }
    }
    if (options.includes("kN")) {
        if (min > 10) { min = 10 }
        if (max < 100) { max = 100 }
    }
    if (options.includes("N")) {
        if (min > 1) { min = 1 }
        if (max < 1) { max = 1 }
    }

    console.log(max)

    scale = min + (Math.random() * (max - min))




    console.log(scale)
    console.log(options)


    for (let i = 0; i < 3; i++) {


        let unit

        // generate vectors
        //generate 1 digit number with decimals
        // x is magnitude; y is angle in degrees
        x = (11 * scale) - (Math.random() * 5 * scale);
        x = x.toPrecision(4)
        if (i == 0) {
            y = 0

        }
        else {
            y = Math.floor(Math.random() * 120) + 30
            y = degToRad(y)
            y += vectors[i - 1]["angle"];

        }



        unit = Math.floor(Math.random() * options.length);

        unit = options[unit]

        //numerator is rounded value but in units
        // second term is calculating coefficent to convert back to newtons
        x = Number(convertUnits(x, unit)).toPrecision(4) * (x / (convertUnits(x, unit)))


        vectors.push({ "magnitude": x, "angle": y, "unit": unit })
    }
    vectors.forEach(element => { console.log(element) })


    // generate svg

    // find highest element
    let highest = vectors.reduce((max, obj) => obj.magnitude > max.magnitude ? obj : max).magnitude;
    console.log(highest)
    scale = 150 / highest


    //origin
    let x1 = 300
    let y1 = 250

    for (let i = 0; i < vectors.length; i++) {

        let vector

        let x2

        let y2
        let magnitude
        let angle
        let unit



        console.log(scale)

        magnitude = vectors[i]["magnitude"]
        angle = vectors[i]["angle"]
        unit = vectors[i]["unit"]



        x2 = scale * magnitude * Math.cos(angle) + x1
        y2 = (-scale) * magnitude * Math.sin(angle) + y1


        svg += drawVector(x1, y1, x2, y2, i)

        //add magnitude label
        for (let a = 0; a < 2; a++) {
            vector = "<text "
            if (a == 1) {
                //label
                vector += "  style = 'fill: color-mix(in oklab, var(--text-color) 40%, hsl(" + String(i * 100) + ",100%,50%) 60%) ; text-anchor:middle; dominant-baseline:middle '"

            } else {
                //label outline
                vector += "  style = 'fill: var(--background-color); stroke: var(--background-color);stroke-width:0.2em ; text-anchor:middle; dominant-baseline:middle'"
            }
            vector += "x=" + String(x2 + Math.cos(angle) * 20)
            vector += " y=" + String(y2 + Math.sin(angle) * -20)
            vector += ">"
            vector += Number(convertUnits(magnitude, unit)).toFixed(2) + unit
            vector += "</text>"
            svg += vector
        }

        //add angle label
        if (i > 0) {
            vector = "<text "
            vector += " ' style = 'fill: color-mix(in oklab, var(--text-color) 40%, hsl(" + String(i * 100) + ",100%,40%) 60%) ; text-anchor:middle; dominant-baseline:middle' "
            vector += "x=" + String(x1 + Math.cos((angle + vectors[i - 1]["angle"]) / 2) * 50)
            vector += " y=" + String(y1 + Math.sin((angle + vectors[i - 1]["angle"]) / 2) * -50)
            vector += ">"
            vector += String(Math.floor(radToDeg(angle - vectors[i - 1]["angle"]))) + "°"
            vector += "</text>"
            svg += vector
        }



    }

    answer["angle"] = Number(radToDeg(vectorTotal(vectors).angle).toFixed(0))
    answer["magnitude"] = Number(vectorTotal(vectors).magnitude.toFixed(2))

    //draw origin
    svg += "<circle cx=" + String(x1) + " cy=" + String(y1) + " r=3 />"
    svg += "</svg>"

    let questionString

    questionString = "What is the Net force? ±10%"

    //Internally value is always in newtons; Unit is for display only
    question.answer[0] = { "value": answer["magnitude"], "unit": "newton", "tolerance": 0.1 }
    question.answer[1] = { "value": answer["angle"], "unit": "degree", "tolerance": 0.1 }

    question.statement.image = svg

    //results thumbnail
    question.statement.question = questionString + "<div style = 'width : auto; height: 7em; overflow: scroll' >" + svg + "</div>"

    //question html
    question.statement.HTML.start = questionString + "<div style = 'width : auto; height: 10em; overflow: scroll' >" + svg + "</div>" + "<br>"

    question.statement.HTML.end = "Magnitude = "
    question.statement.HTML.end += " <input id = 'input0' style = 'width:3em' type = 'number' inputMode = 'decimal' max='9999' step='0.01' required = 'true'></input>N"
    question.statement.HTML.end += "<span id = 'answer0'></span>"
    question.statement.HTML.end += "<br>"
    question.statement.HTML.end += "Angle = "
    question.statement.HTML.end += " <input id = 'input1' style = 'width:3em' type = 'number' inputMode = 'decimal' max='9999' step='1' required = 'true'></input>°"
    question.statement.HTML.end += "<span id = 'answer1'></span>"

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
    await appendScripts("./subjects/scripts/numbers/physics/vectors.js")
}