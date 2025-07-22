
function next(){
  
    let next = document.getElementById("next")

    next.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("next").click();
        }
    });
}



