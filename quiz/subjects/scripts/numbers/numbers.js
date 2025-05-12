const symbols = ["+", "−", "×", "÷"]
const G = 9.7803267715

function convertUnits(value, unit) {
   // convert value to unit
   // value is equal to 1 newton
    
 
    if (unit == "N") {
       return value
    }
 
    if (unit == "kN") {
       return value / 1000
    }
 
    if (unit == "g") {
       return ((value / G) * 1000)
    }
 
    if (unit == "kg") {
       return value / G
    }
 
 }

 function radToDeg(angle) {
    return angle / Math.PI * 180
 }
 
 function degToRad(angle) {
    return angle / 180 * Math.PI
 }

