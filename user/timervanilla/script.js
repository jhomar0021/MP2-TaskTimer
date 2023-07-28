const startBtn = document.querySelector('.task-start');
const resumeBtn = document.querySelector('.task-resume');
const submitBtn = document.querySelector('.task-submit');
const endBtn = document.querySelector('.end-session');
let [seconds, minutes, hours, days] = [0, 0, 0, 0];
let [wseconds, wminutes, whours] = [0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let wtimeRef = document.querySelector(".wtimer-display");
let workTimer = document.querySelector(".work-time-display")
let submitDisplay = document.getElementById("submit-counter-display")
let tabTitle = document.querySelector('.tab-title');
let int = null;
let workTime = 0;
let submittedTask = 0;
let currentSession =null;
let start = "";
let startValue = "";
let recorded = false;
let accountID = "";
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
let timer_id = urlParams.get('q');

setID();

setTimeout(setID,100);
function setID(){
    accountID = $("#userID").text();
}

document.getElementById("task-start").addEventListener("click", () => {

    int = setInterval(displayTimer, 1000);
    startBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    endBtn.classList.remove("d-none");
    stampStart();
});

document.getElementById("task-resume").addEventListener("click", () => {
    if(int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 1000);
    resumeBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    endBtn.classList.remove("d-none");
    stampStart();
});
document.getElementById("task-submit").addEventListener("click", () => {
    
    if([seconds, minutes, hours, days] !== [0,0,0,0]){
        [seconds, minutes, hours, days] = [0, 0, 0, 0];
        timeRef.innerHTML = "00:00:00";
        if(recorded == false){
            recorded = true;
            sessionStore();
        }
        else{
            console.log("Updating Session")
        }
        submittedTask +=1 ;
        document.getElementById("submit-counter-display").innerHTML = submittedTask;
        taskSubmit();
        sessionUpdate();
    }
    else{
        false;
    }
}); 

document.getElementById("end-session").addEventListener("click", () => {
    
    clearInterval(int);
    [seconds, minutes, hours, days] = [0, 0, 0, 0];
    timeRef.innerHTML = "00:00:00";
        if(recorded == false){
            sessionStore();
        }
        else{
            console.log("Updating Session")
            recorded = false;
        }
    submittedTask +=1 ;
    int = null;
    document.getElementById("submit-counter-display").innerHTML = submittedTask;

    resumeBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
    endBtn.classList.add("d-none");
    document.getElementById("tab-title").innerHTML = `On Break`;
    taskSubmit();
    sessionUpdate();

});



document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name == "s") {
        if(int !== null){
            if([seconds, minutes, hours, days] !== [0,0,0,0]){
                [seconds, minutes, hours, days] = [0, 0, 0, 0];
                timeRef.innerHTML = "00:00:00";
                if(recorded == false){
                    recorded = true;
                    sessionStore();
                }
                else{
                    console.log("Updating Session")
                }
                submittedTask +=1 ;
                document.getElementById("submit-counter-display").innerHTML = submittedTask;              
                taskSubmit();
                sessionUpdate();
            }
        }
        else{
            int = setInterval(displayTimer, 1000);
            startBtn.classList.add("d-none");
            submitBtn.classList.remove("d-none");
            endBtn.classList.remove("d-none");
            stampStart();
        }

    }
    }
 );


function displayTimer() {
    workTime +=1;

    wseconds += 1;
    if(wseconds == 60) {
        wseconds = 0;
        wminutes++;
        if(wminutes == 60) { 
            wminutes = 0;
            whours++;
            if(whours == 24) {
                whours = 0;
                wdays++;
            }
        }
    }

    seconds += 1;
    if(seconds == 60) {
        seconds = 0;
        minutes++;
        if(minutes == 60) {
            minutes = 0;
            hours++;
            if(hours == 24) {
                hours = 0;
                days++;
            }
        }
    }

    
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = 
        seconds < 10
        ? "0" + seconds
        : seconds < 60
        ? seconds
        : seconds;

    timeRef.innerHTML = `${h}:${m}:${s}`;


    document.getElementById("tab-title").innerHTML = `${h}:${m}:${s}`;

    let wh = whours < 10 ? "0" + whours : whours;
    let wm = wminutes < 10 ? "0" + wminutes : wminutes;
    let ws = 
        wseconds < 10
        ? "0" + wseconds
        : wseconds < 60
        ? wseconds
        : wseconds;

    wtimeRef.innerHTML = `${wh}:${wm}:${ws}`;

    let wtm = Math.round(((submittedTask / (workTime/60))*60)*10)/10;

    workTimer.innerHTML = `${wtm}`;
};

function taskSubmit(){
    var currentdate = new Date(); 
                
    var month = currentdate.getMonth()+1;
    if(month < 10){
        month = "0"+month;
    }
    var datetime = 
        currentdate.getFullYear()+"-"
        + month+"-"
        + currentdate.getDate()+" "
        + currentdate.getHours() +":"
        + currentdate.getMinutes() +":"
        + currentdate.getSeconds();
    
    let recordsubmit = { 
        "user_id" : accountID,
        "time_stamp" : datetime,
        "timer_id" : timer_id
    }

    $.ajax({
        "url" : TIMER_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "submits=" + JSON.stringify(recordsubmit), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
};

function stampStart(){
    var sessionStartDate = new Date(); 
    var month;           
    var shortMonth = sessionStartDate.getMonth()+1;
    if(shortMonth < 10){
        month = "0"+shortMonth;
    }
    else{
        month = shortMonth;
    }
    start = 
        sessionStartDate.getFullYear()+"-"
        + month+"-"
        + sessionStartDate.getDate()+" "
        + sessionStartDate.getHours() +":"
        + sessionStartDate.getMinutes() +":"
        + sessionStartDate.getSeconds();
    
    startValue = sessionStartDate.getHours()*60 + sessionStartDate.getMinutes();
    var year = '"'+sessionStartDate.getFullYear()+'"';
    var shortYear = year.slice(3,5);

    currentSession = timer_id + shortYear + shortMonth +sessionStartDate.getDate() + startValue + sessionStartDate.getSeconds();
    console.log("account id is " + accountID);
    console.log("session:"+ currentSession+" has started, start time is "+start+" with start value of "+startValue);
}

function sessionStore (){

    let sessionRecord = { 
        "user_id" : accountID,
        "session_start" : start,
        "start_value" : startValue,
        "timer_id" : timer_id,
        "id" : currentSession
    }

    $.ajax({
        "url" : TIMER_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "timersessionstart=" + JSON.stringify(sessionRecord), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function sessionUpdate (){
    var sessionEndDate = new Date(); 
                
    var month = sessionEndDate.getMonth()+1;
    if(month < 10){
        month = "0"+month;
    }
    var end = 
        sessionEndDate.getFullYear()+"-"
        + month+"-"
        + sessionEndDate.getDate()+" "
        + sessionEndDate.getHours() +":"
        + sessionEndDate.getMinutes() +":"
        + sessionEndDate.getSeconds();
    
    var endValue = sessionEndDate.getHours()*60 + sessionEndDate.getMinutes();
    
    let sessionRecord = { 
        "session_end" : end,
        "end_value" : endValue,
        "id" : currentSession
    }

    $.ajax({
        "url" : TIMER_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "timersessionend=" + JSON.stringify(sessionRecord), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}