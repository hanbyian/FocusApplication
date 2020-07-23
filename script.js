let interval;
if((localStorage.getItem("clock-start")== null) || (localStorage.getItem("timer-is-on")== null) || (localStorage.getItem("high-score")== null) || (localStorage.getItem("weekly-score")== null)){
    localStorage.setItem("timer-is-on", "false");
    localStorage.setItem("high-score", "0");
    localStorage.setItem("weekly-score", "0");
    localStorage.setItem("clock-start", "0");
    localStorage.setItem("week-count", getWeekCount());
}
if (getWeekCount() > Number(localStorage.getItem("week-count"))){
    localStorage.setItem("weekly-score","0");
    localStorage.setItem("week-count", Number(getWeekCount()));
}
setTimerHTML();
setScoreHTML();
function getWeekCount(){
    let time = new Date().getTime();
    return Math.floor((time-1595217599)/604800);
}
function timerPressed(){
    let newTimerState = "true";//timer turned on
    if(localStorage.getItem("timer-is-on") == "true"){
        newTimerState = "false";//timer turned off
        timerStopped();
    }
    localStorage.setItem("timer-is-on", newTimerState);
    setTimerHTML();
    if (newTimerState == "true"){
        let startTime = new Date().getTime();
        localStorage.setItem("clock-start", String(startTime));
        interval = setInterval(setClock, 1000);
    }
}
function setTimerHTML(){
    if (localStorage.getItem("timer-is-on") == "true"){
        document.getElementById("timer-header").innerHTML = "Stop your focus session?";
        document.getElementById("timer-button").innerHTML = "Stop!";
    
    }
    if (localStorage.getItem("timer-is-on") == "false"){
        document.getElementById("timer-header").innerHTML = "Start your focus session?";
        document.getElementById("timer-button").innerHTML = "Start!";
    
    }
}
function timerStopped(){
    clearInterval(interval);
    let currentTime = new Date().getTime();
    let timeDifference = currentTime - Number(localStorage.getItem("clock-start"));
    let multiplier = 1 + Number(String(timeDifference).length/100);
    let sessionScore = Math.floor(timeDifference/1000) * multiplier;
    let newWeeklyScore = sessionScore + Number(localStorage.getItem("weekly-score"));
    if (newWeeklyScore > Number(localStorage.getItem("high-score"))){
        localStorage.setItem("high-score", Math.floor(newWeeklyScore/1));
    }
    localStorage.setItem("weekly-score", Math.floor(newWeeklyScore/1));
    localStorage.setItem("clock-start", "0");
    setScoreHTML();
}
function setScoreHTML(){
    document.getElementById("high-score").innerHTML = String(localStorage.getItem("high-score"));
    document.getElementById("current-score").innerHTML = String(localStorage.getItem("weekly-score"));
    document.getElementById("clock").innerHTML = "0:00:00";
}
function setClock(){
    let startTime = Number(localStorage.getItem("clock-start"));
    let timeDifference = new Date().getTime() - startTime;
    let seconds = Math.floor(timeDifference/1000);
    let minutes = Math.floor(timeDifference/60000);
    let hours = Math.floor(timeDifference/360000);
    if(seconds <=9){
        seconds = "0" + String(seconds);
    }else{
        seconds = String(seconds);
    }
    if(minutes <=9){
        minutes = "0" + String(minutes);
    }else{
    minutes = String(minutes);
    }
    document.getElementById("clock").innerHTML = hours + ":" + minutes + ":" + seconds;
}
