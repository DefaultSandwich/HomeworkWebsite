function drawVector(x1, y1, x2, y2, i) {
    let svg
    let angle = Math.atan2(y2 - y1, x2 - x1)
   

    //add line to svg
    svg = "<line"
    svg += " x1 = " + String(x1)
    svg += " y1 = " + String(y1)
    svg += " x2 = " + String(x2 + Math.cos(angle + Math.PI) * 19)
    svg += " y2 = " + String(y2 + Math.sin(angle + Math.PI) * 19)
    svg += " style = 'stroke: color-mix(in oklab, var(--text-color) 10%, hsl( " + String(i * 100) + ",100%,60%)90%); "
    svg += " stroke-width:3' "
    svg += " />"


    //add arrow head
    angle += Math.PI

    svg += "<polygon points='"
    svg += String(x2) + "," + String(y2) + " "
    svg += String(x2 + (Math.cos(angle + 0.3) * 20)) + "," + String(y2 + (Math.sin(angle + 0.3) * 20)) + " "
    svg += String(x2 + (Math.cos(angle - 0.3) * 20)) + "," + String(y2 + (Math.sin(angle - 0.3) * 20)) + "'"
    svg += " style = 'fill: color-mix(in oklab, var(--text-color) 30%, hsl( " + String(i * 100) + ",100%,40%) 70%)" + " ' ></polygon>"


    return svg
}