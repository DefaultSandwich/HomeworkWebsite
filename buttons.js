
function next(){
    let next = document.getElementById("next")

    next.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("next").click();
        }
    });
}


// function check(){

// let check = document.getElementById("check");

// check.addEventListener("keydown", function(event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.getElementById("check").click();
//   }
// });
// }

function input(){

let input = document.getElementById("input");
// Execute a function when the user presses a key on the keyboard


input.addEventListener("keydown", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submitInput();
    }
}); 
}