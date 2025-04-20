const tick = "<img src = '../Icons//tick.svg' style = 'height : 1.2em; width : 1.2em; vertical-align:baseline ; position: relative; top: calc((1.2em - 0.735em) / 2)'>"
const cross = "<img src = '../Icons//cross.svg' style = 'height : 1.2em; width : 1.2em; vertical-align:baseline ; position: relative; top: calc((1.2em - 0.735em) / 2)'>"


function formatValue(JSON) {
    console.log(JSON)

    let string

    if (typeof JSON != "object") {
        string = String(JSON)
        if (typeof JSON == "number") {
            string = " = " + string
        }
        return string
    }

    let unit = JSON.unit
    let value = JSON.value

    string = String(value)

    if (typeof value == "number") {
        string = " = "

        if (unit == "newton") {
            string += value.toFixed(2) + " N"
        }

        if (unit == "degree") {
            string += String(value) + "°"
        }
    }



    if (typeof value == "number") {

    }

    return string
}