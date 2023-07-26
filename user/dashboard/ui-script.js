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
          tommShort ="MON"
          break;
        case 1:
          day = "Monday";
          dayShort ="MON"
          tommShort ="TUE"
          break;
        case 2:
           day = "Tuesday";
           dayShort ="TUE"
           tommShort ="WED"
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
          tommShort ="SAT"
          break;
        case 6:
          day = "Saturday";
          dayShort ="SAT"
          tommShort ="SUN"
      }
    dayDate = month+"-"+date+" "+dayShort;
    console.log(dayDate);
      let dateTom = date+1;

    dayDateTom = month+"-"+dateTom;

    dayDateTom = dayDateTom +" "+ tommShort;



    let greetings ="";

    if (hrs >= 1 && hrs < 12){
        greetings = "Good morning,";
    }
    if (hrs >= 12 && hrs <= 17){
        greetings = "Good afternoon,";
    }
    if (hrs >= 17 || hrs <= 1){ 
        greetings = "Good evening,";
    }
    $("#greetings").text(greetings);
}

graphRecords();

let graphrefresh = setInterval(graphRecords,3000);

setTimeout(graphRecords,500);

function graphRecords(){
    console.log("updating");
    let recordRequest = {
        'user_id' : $('#userID').text(),
        'from_time': today,
        'to_time': todayTime
    }

    $.ajax({
        "url" : TIMERRECORD_API, 
        "type" : "GET", 
        "data" : "showsessionvalue=" + JSON.stringify(recordRequest),
        "success" : function (response) { 
            let parseResponse = JSON.parse(response);
            
            let contents = parseResponse.data;
            let activeTime = 0;
            let graph ="";
            let graphdefaultitems =                                
                '<div class="graphlinelabeldate" style="grid-column: 1/50;"><bold class="datelabel">'+dayDate+'</bold></div>'+
                '<div class="graphlinelabel" style="grid-column:460/460;"><bold class="hourlabel">03:00</bold></div>'+
                '<div class="graphlinelabel" style="grid-column:910/910;"><bold class="hourlabel">06:00</bold></div>'+
                '<div class="graphlinelabel" style="grid-column:1350/1350;"><bold class="hourlabel">09:00</bold></div>'+
                '<div class="graphlinelabel" style="grid-column:1800/1800;"><bold class="hourlabel">12:00</bold></div>'+
                '<div class="graphlinelabel" style="grid-column:2250/2250;"><bold class="hourlabel">15:00</bold></div>'+
                '<div class="graphlinelabel" style="grid-column:2700/2700;"><bold class="hourlabel">18:00</bold></div>'+
                '<div class="graphlinelabel" style="grid-column:3150/3150;"><bold class="hourlabel">21:00</bold></div>'+
                '<div class="graphlinelabeldate" style="grid-column:3640/3641;"><bold class="datelabel">'+dayDateTom+'</bold></div>'+
                '<div class="graphline" style="grid-column:40/40;"></div>'+
                '<div class="graphline" style="grid-column:500/500;"></div>'+
                '<div class="graphline" style="grid-column:950/950;"></div>'+
                '<div class="graphline" style="grid-column:1390/1350;"></div>'+
                '<div class="graphline" style="grid-column:1840/1840;"></div>'+
                '<div class="graphline" style="grid-column:2290/2290;"></div>'+
                '<div class="graphline" style="grid-column:2740/2740;"></div>'+
                '<div class="graphline" style="grid-column:3190/3190;"></div>'+
                '<div class="graphline" style="grid-column:3640/3641;"></div> ';
            for (let i = 0; i <contents.length; i++) {
                if(contents[i].session_start < today){
                    contents[i].session_start_value = 0;
                    }
                    let correctionstart = contents[i].session_start_value * 2.5;
                    let correctionend = contents[i].session_end_value * 2.5;
                    let graphstart = 40 + Math.round(correctionstart);
                    let graphend = 40 + Math.round(correctionend);
                    let graphItem = '<div class="gridgraphitem" style="grid-column:'+
                    + graphstart+'/'+ graphend +
                    ';"></div>';

                    graph = graph + graphItem;
                    
                

                let difference = contents[i].session_end_value - contents[i].session_start_value;
                if(difference < 1){difference = 1}
                activeTime = activeTime + difference ;     
            }

            let activeMins = activeTime % 60;
            if(activeMins < 10){activeMins = "0"+ activeMins};
            let activeHrs = Math.floor(activeTime/60);
            if(activeHrs < 10){activeHrs = "0"+ activeHrs};
            $("#active-time-value").text(activeHrs+":"+activeMins);
            $("#gridgraph").html(graphdefaultitems+graph);
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

