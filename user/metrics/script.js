let today = "";
let todayTime ="";
let sundayDate ="";
let timerID = $("#timerlist").val();

viewtimer()
function viewtimer(){


    $.ajax({
        "url" : TIMERRECORD_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "index", //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            
            let contents = parseResponse.data1;
            let sessions = parseResponse.data2;
            let timerItem = "";
            for (let i = 0; i <contents.length; i++) {
                let id = contents[i].timer_id;
                let name = contents[i].timer_name;
                let timerTemplate = '<option value ="'+id+'">'+ name +'</option>'
                timerItem = timerTemplate + timerItem;
            
            }

            for (let i = 0; i <sessions.length; i++){
            }

            $("#timerlist").html(timerItem);
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

setDefaultDate();

function setDefaultDate(){
    var getToday = new Date(); 
                
    var month = getToday.getMonth()+1;
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

    $("#from-date").val(today);
    $("#to-date").val(todayTime);

}

graphRecords();

function graphRecords(){

    console.log(sundayDate + " is sunday")

    let recordRequest = {
        'user_id' : $('#userID').text(),
    }
}



function viewRecords(){
    let fromDate = $("#from-date").val();
    let toDate = $("#to-date").val();
    let timerID = $("#timerlist").val();


    let datetest1 = Math.floor(new Date(toDate));
    console.log("see "+datetest1)
    let datetest2 = new Date(fromDate);
    console.log(parseInt(datetest1/1000));

        let dataRequest = { 
            "timer_id" : timerID,
            "session_start" : fromDate,
            "session_end" : toDate
        };
        

        $.ajax({
            "url" : TIMERRECORD_API, //URL of the API
            "type" : "GET", //GET and POST 
            "data" : "getdataspan=" + JSON.stringify(dataRequest), //auth will be our php variable $_POST['auth']
            "success" : function (response) { //success yung response
                let parseResponse = JSON.parse(response);
                let sessions= parseResponse.data1;
                let submits= parseResponse.data2
                let totalActiveTime = 0;
                let totalSubmits = parseResponse.data2.length;
                let tableItems = "";

                for(let i = 0; i<sessions.length; i++){
                    console.log(sessions[i].session_start+sessions[i].session_end)
                    let start = sessions[i].session_start;
                    let end = sessions[i].session_end;
                    let startMins= Math.round(parseInt(new Date(sessions[i].session_start)/6000));
                    let endMins = Math.round(parseInt(new Date(sessions[i].session_end)/6000));
                    let activeTime = (endMins - startMins)/10;
                    totalActiveTime = totalActiveTime + activeTime;
                    let activeTimeInMins = Math.round(activeTime%60);
                    let activeTimeinHours = Math.floor(activeTime/60);

                    if(activeTimeInMins < 10){
                        activeTimeInMins = "0"+activeTimeInMins;
                    }
                    if(activeTimeinHours < 10){
                        activeTimeinHours = "0"+activeTimeinHours;
                    }
                    let activeTimeDisplay = activeTimeinHours+":"+activeTimeInMins;
                    console.log(activeTimeDisplay);
                    let submitted = 0;  
                    for(let j=0; j < submits.length; j++){
                        if(submits[j].time_stamp >= start && submits[j].time_stamp <= end){
                        submitted = submitted +1;
                        }
                    }
                    let prodRate = (Math.round((submitted/activeTime)*600))/10;

                    displaystart = start.slice(0,19);
                    displayend = end.slice(0,19);
                    console.log(submitted);
                    tableItems += "<tr>" + 
                    "<td>" + sessions[i].id + "</td>" + 
                    "<td>" + displaystart + "</td>" + 
                    "<td>" + displayend + "</td>" + 
                    "<td>" + submitted + "</td>" + 
                    "<td>" + activeTimeDisplay + "</td>" + 
                    "<td>" + prodRate + "</td>" + 
                    "</tr>";
                }
                console.log(tableItems);
                $("#sessionsrecord").html(tableItems);
                console.log("total active : "+ totalActiveTime + " total submit : "+ totalSubmits);
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        });
    
}

