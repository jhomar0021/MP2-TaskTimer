let activityBtn = document.getElementById("activity-btn")
let timersBtn = document.getElementById("timers-btn");
let timersTab = document.getElementById("timer-item-tab");
let activeTab = document.getElementById("active-info-tab");
let hello2 = document.getElementById("hello2");
let today = "";
let todayTime ="";
let sundayDate ="";
let day ="";
let month ="";
let dayShort = "";
let dayDate ="";
let dayDateTom= "";



helloUser();
setTimeout(helloUser,100);
function helloUser(){
    hello2.innerText = document.getElementById("hello").innerText + "!";
}

function switchToActivityTab(){
    timersBtn.classList.remove("hm-btn-on");
    timersBtn.classList.add("hm-btn-off");
    activityBtn.classList.remove("hm-btn-off");
    activityBtn.classList.add("hm-btn-on");
    timersTab.classList.add("d-none");
    activeTab.classList.remove("d-none");
}

function switchToTimerTab(){
    activityBtn.classList.remove("hm-btn-on");
    activityBtn.classList.add("hm-btn-off");
    timersBtn.classList.remove("hm-btn-off");
    timersBtn.classList.add("hm-btn-on");
    timersTab.classList.remove("d-none")
    activeTab.classList.add("d-none");
}
;
setDefaultDate();

function setDefaultDate(){
    var getToday = new Date(); 
                
    month = getToday.getMonth()+1;
    if(month < 10){
        month = "0"+month;
    }
    var date  = getToday.getDate();
    if(date < 10){
        date  = "0"+ date;
    } 
    var hrs  = getToday.getHours();
    if(hrs < 10){
        hrs  = "0"+ hrs;
    } 
    var min  = getToday.getMinutes();
    if(min < 10){
        min  = "0"+ min;
    }
    var sec  = getToday.getSeconds();
    if(sec < 10){
        sec  = "0"+ sec;
    }

    today = getToday.getFullYear()+"-" + month+"-" + date +" "
        + "00" +":"+ "00" +":"+ "00";
    todayTime = getToday.getFullYear()+"-" + month+"-" + getToday.getDate()+" "+ hrs +":"+ min +":"+ sec;

    sundayDate = date - getToday.getDay();

    dayToDay = getToday.getDay();

    switch (new Date().getDay()) {
        case 0:
          day = "Sunday";
          dayShort ="SUN"
          tommShort =" MON"
          break;
        case 1:
          day = "Monday";
          dayShort ="MON"
          tommShort =" TUE"
          break;
        case 2:
           day = "Tuesday";
           dayShort ="TUE"
           tommShort =" WED"
          break;
        case 3:
          day = "Wednesday";
          dayShort ="WED"
          tommShort ="THRS"
          break;
        case 4:
          day = "Thursday";
          dayShort ="THRS"
          tommShort ="FRI"
          break;
        case 5:
          day = "Friday";
          dayShort ="FRI"
          tommShort =" SAT"
          break;
        case 6:
          day = "Saturday";
          dayShort ="SAT"
          tommShort =" SUN"
      }

      let dateTom = parseInt(date)+1;
      if(dateTom < 10){dateTom = "0"+dateTom;}

      $("#graphdatestart").html(month+"-"+date+"<br/>"+dayShort);
      $("#graphdateend").html(month+"-"+dateTom+"<br/>"+tommShort);

    let greetings ="";

    if (hrs >= 1 && hrs < 12){
        greetings = "Good morning,";
    }
    if (hrs >= 12 && hrs < 17){
        greetings = "Good afternoon,";
    }
    if (hrs >= 17 || hrs < 1){ 
        greetings = "Good evening,";
    }
    $("#greetings").text(greetings);
    $("#datetimeview").html(day+" "+month+"-"+date);

    

    if(hrs >=18 || hrs <= 4){
        $("#nightimg").show();
    }
    if(hrs >=5 && hrs <= 17){
        $("#dayimg").show();
    }
}