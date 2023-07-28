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

      let dateTom = date+1;

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



setTimeout(graphRecords,500);

function graphRecords(){
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
            $("#active-submit-count").text(parseResponse.data2 + " Submits");
            let contents = parseResponse.data1;
            let activeTime = 0;
            let graph ="";
            let graphdefaultitems =                                
                '<div class="graphline" style="grid-column:1/1;"></div>'+
                '<div class="graphline" style="grid-column:450/450;"></div>'+
                '<div class="graphline" style="grid-column:900/900;"></div>'+
                '<div class="graphline" style="grid-column:1350/1350;"></div>'+
                '<div class="graphline" style="grid-column:1800/1800;"></div>'+
                '<div class="graphline" style="grid-column:2250/2250;"></div>'+
                '<div class="graphline" style="grid-column:2700/2700;"></div>'+
                '<div class="graphline" style="grid-column:3150/3150;"></div>'+
                '<div class="graphline" style="grid-column:3600/3600;"></div> ';
            for (let i = 0; i <contents.length; i++) {

                if(contents[i].session_start < today){
                    contents[i].session_start_value = 0.4;
                    }

                    let correctionstart = contents[i].session_start_value * 2.5;
                    let correctionend = contents[i].session_end_value * 2.5;
                    let graphstart = Math.round(correctionstart);
                    let graphend =  Math.round(correctionend);

                    let graphItem = '<div class="gridgraphitem" style="grid-column:'+
                    + graphstart+'/'+ graphend +
                    ';"></div>';

                    graph = graph + graphItem;
                    
                

                let difference = contents[i].session_end_value - contents[i].session_start_value;
                if(difference < 1){difference = 1}
                activeTime = activeTime + difference ;     
            }
            let activeMins = Math.round((activeTime % 60)*10)/10;
            if(activeMins < 10){activeMins = "0"+ activeMins};
            let activeHrs = Math.floor(activeTime/60);
            if(activeHrs < 10){activeHrs = "0"+ activeHrs};
            $("#active-time-value").text(activeHrs+":"+activeMins);
            $("#gridgraph").html(graphdefaultitems+graph);

            let productivity =Math.floor(parseResponse.data2/activeTime*6000);
            let prodvalue = productivity/100;
            if(parseResponse.data2 == 0){
                $("#active-productivity-count").text("No Subbmitted Task");
            }
            else{$("#active-productivity-count").text(prodvalue+"/Hour");}
            
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}


updateValues();

setInterval(updateValues,1000);

function updateValues (){
    console.log("updating..");
    setDefaultDate();
    graphRecords();
}