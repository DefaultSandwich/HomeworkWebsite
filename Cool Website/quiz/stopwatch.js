

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

let hrString = hour;
let minString = minute;
let secString = second;
let countString = count;

let start

function startStopWatch() {

    start = Date.now()
    timer = true
    stopwatchLoop()
    
    
}

function stopStopwatch(){
    timer = false
}

function stopwatchLoop(){
    if (timer) {
        
        
       count = Date.now() - start;


       countToTime((count))

  

        hrString = hour;
        minString = minute;
        secString = second;
      

    

       document.getElementById('hr').innerHTML = hrString;
       document.getElementById('min').innerHTML = minString;
       document.getElementById('sec').innerHTML = secString;
       document.getElementById('count').innerHTML = countString
       
       requestAnimationFrame(stopwatchLoop)
   }
}

function resetStopwatch(){
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
}

function countToTime(count){
    countString = Math.floor(count/10) % 100 
    second = Math.floor(count/1000) % 60
    minute = Math.floor(count/60000) % 60
    hour = Math.floor(count/3600000)
 
    countString = String(countString).padStart(2,"0")
    second = String(second).padStart(2,"0")
    minute = String(minute).padStart(2,"0")
    hour = String(hour).padStart(2,"0")
 
    return([hour,minute,second,countString])
 }

 function fetchTime(){
    return count
 }