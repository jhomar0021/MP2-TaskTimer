const startBtn = document.querySelector('.task-start');
const resumeBtn = document.querySelector('.task-resume');
const submitBtn = document.querySelector('.task-submit');
const endBtn = document.querySelector('.end-session');
let [seconds, minutes, hours, days] = [0, 0, 0, 0];
let [wseconds, wminutes, whours] = [0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let wtimeRef = document.querySelector(".wtimer-display");
let workTimer = document.querySelector(".work-time-display")
let tabTitle = document.querySelector('.tab-title');
let int = null;
let workTime = 0;
let submittedTask = 0;


document.getElementById("task-start").addEventListener("click", () => {
    if(int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 1000);
    startBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    endBtn.classList.remove("d-none");
});

document.getElementById("task-resume").addEventListener("click", () => {
    if(int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 1000);
    resumeBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    endBtn.classList.remove("d-none");
});
document.getElementById("task-submit").addEventListener("click", () => {
    
    if([seconds, minutes, hours, days] !== [0,0,0,0]){
        [seconds, minutes, hours, days] = [0, 0, 0, 0];
        timeRef.innerHTML = "00:00:00";
        submittedTask +=1 ;
        document.getElementById("submit-counter-display").innerHTML = submittedTask;
    }
    else{
        false;
    }
}); 




// document.addEventListener('keydown', (event) => {
//     var name = event.key;
//     if (name === ' ') {

//         if(int !== null){
//         [seconds, minutes, hours, days] = [0, 0, 0, 0];
//         timeRef.innerHTML = "00:00:00";
//         submittedTask +=1 ;
//         document.getElementById("submit-counter-display").innerHTML = submittedTask;
//         }

//     }
//     else{
//         int = setInterval(displayTimer, 1000);
//         startBtn.classList.add("d-none");
//         returnBtn.classList.add("d-none");
//         submitBtn.classList.remove("d-none");
//         endBtn.classList.remove("d-none");
//     }  
//     }
//  );

document.getElementById("end-session").addEventListener("click", () => {
    clearInterval(int);
    [seconds, minutes, hours, days] = [0, 0, 0, 0];
    timeRef.innerHTML = "00:00:00";
    submittedTask +=1 ;
    int = null;
    document.getElementById("submit-counter-display").innerHTML = submittedTask;
    resumeBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
    endBtn.classList.add("d-none");
});

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

    // document.getElementById("tab-title").innerHTML = `${h}:${m}:${s}`;

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
