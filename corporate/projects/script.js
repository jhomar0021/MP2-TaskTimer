viewProject()


function viewProject(){

    $.ajax({
        "url" : TIMERRECORD_API, 
        "type" : "GET", 
        "data" : "admin-index", 
        "success" : function (response) {
            
            let parseResponse = JSON.parse(response);
            let timers = parseResponse.data1;
            let users = parseResponse.data2;
            let timersessions = parseResponse.data3;
            let submits = parseResponse.data4;
            let access = parseResponse.data5;
            let timerItem ="";
            

            for (let i = 0; i < timers.length; i++){
                let id = timers[i].timer_id;
                let name = timers[i].timer_name;
                let activeValue = 0;
                let submitValue = 0;
                let activeUsers = "";


                for (let j = 0; j < timersessions.length; j++){
                    let value = 0;
                    if(timersessions[j].timer_id == id){

                        let stVal = parseInt(timersessions[j].session_start_value);
                        let enVal = 0;
                        if( parseInt(timersessions[j].session_end_value) < parseInt(timersessions[j].session_start_value)){   
                            enVal = 1440 +parseInt(timersessions[j].session_end_value) ;

                        }
                        else{
                            enVal = parseInt(timersessions[j].session_end_value);
                        }
                        value = enVal - stVal;
                        activeValue = activeValue + value;
                    }
                }

                for (let k = 0; k < submits.length; k++ ){
                    let svalue = 0;
                    if(submits[k].timer_id == id){
                        svalue += 1;
                    }
                    submitValue = submitValue + svalue;
                }
                


                for(let l = 0; l < users.length; l++){
                    let usercheck= users[l].id;
                    let userHasAccess = 0;
                    for (let m = 0; m < access.length; m++){
                        if(access[m].user == usercheck){
                            console.log(users[l]);
                            userHasAccess+= 1;
                            console.log(userHasAccess);
                            
                        }
                        else{
                            console.log(users[l].fname+' has no access to '+ name);
                        }
                    }
                    if(userHasAccess !==0 ){
                        let activeTemplate = '<div class="">' +
                        '<div class="card" style="width: 18rem;">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + users[l].fname + ' ' + users[l].lname + '</h5>' +
                        '<p class="card-text"></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' ;
                    activeUsers += activeTemplate;
                    }
                }

                let activeMins = activeValue % 60;
                if(activeMins < 10){activeMins = "0"+ activeMins};
                let activeHrs = Math.floor(activeValue/60);
                if(activeHrs < 10){activeHrs = "0"+ activeHrs};
                let activeHoursMins = activeHrs + "Hrs " + activeMins +"Mins" ;
                let submitDisplay = submitValue + "  Task Submitted"

                let timerTemplate =
                '<div class="accordion mb-3" id="'+id+'">'+
                '<div class="accordion-item container-fluid">'+
                '<div class="accordion-header row text-center">'+
                '<div class="col-12 project-name">'+
                '<h3 id="'+id+'timerlabel">'+name+'</h3></div>'+
                '<div class="col-6 h-100 mt-2 mt-md-0 col-md-4">'+
                '<button class="project-btn my-md-3 py-2" type="button" data-bs-toggle="collapse"'+
                'data-bs-target="#'+id+'a" aria-expanded="false" aria-controls="'+id+'a">'+
                '<div class="col-12 text-center"><i class="fa-solid fa-user-group"></i>'+
                '</div><div class="col-12 text-center"><h4>Team</h4></div></button></div>'+
                '<div class="col-6 h-100 mt-2 mt-md-0 col-md-4">'+
                '<button class="project-btn my-md-3 py-2" type="button" data-bs-toggle="collapse"'+
                'data-bs-target="#'+id+'b" aria-expanded="false" aria-controls="'+id+'b">'+
                '<div class="col-12 text-center">'+
                '<i class="fa-solid fa-chart-line"></i></div>'+
                '<div class="col-12 text-center"><h4>Metrics</h4></div></button></div>'+
                '<div class="col-12 h-100 col-md-4 my-2 my-md-0">'+
                '<button class="project-btn my-md-3 py-2" type="button" data-bs-toggle="collapse"'+
                'data-bs-target="#'+id+'c" aria-expanded="false" aria-controls="'+id+'c">'+
                '<div class="col-12 text-center">'+
                '<i class="fas fa-duotone fa-gear"></i></div><div class="col-12 text-center">'+
                '<h4>Project Settings</h4></div></button></div></div>'+
                '<div id="'+id+'a" class="collapse" data-bs-parent="#projectlist"><div class="row">'+
                '<div class="col-12 my-2  col-md-8 mx-2 stats-box row">'+
                '<div class="col-12 text-center"><h4>Active Members</h4></div>'+
                '<div class="col-12">'+ activeUsers +'</div>'+
                '</div><div class="col-12 my-2  col-md-3 mx-2 row">'+
                '<button class="add-task col-6 ms-5" data-bs-toggle="modal"'+
                'data-bs-target="#manageUsers" onclick="manageUsers('+id+')">Manage Users</button></div></div></div>'+
                '<div id="'+id+'b" class="collapse" data-bs-parent="#projectlist">'+
                '<div class="container-fluid my-3 py-3 "><div class="row">'+
                '<div class="col-12 my-2  col-md-4 mx-2 stats-box row">'+
                '<div class="col-12 col-lg-6 text-center"><h4>Total Project Hours</h4></div>'+
                '<div class="col-12 col-lg-6 text-center"><h3>'+activeHoursMins+'</h3></div></div>'+
                '<div class="col-12 my-2  col-md-4 mx-2 stats-box row">'+
                '<div class="col-12 col-lg-6 text-center"><h4>Total Submitted</h4></div>'+
                '<div class="col-12 col-lg-6 text-center"><h3>'+submitDisplay+'</h3></div></div>'+
                '<div class="col-12 my-2  col-md-3 mx-2 row">'+
                '<button data-bs-toggle="modal" data-bs-target="#projectMetrics" onclick="viewRecords('+id+')">VIEW DETAILED</button></div></div></div></div>'+
                '<div id="'+id+'c" class="collapse" data-bs-parent="#projectlist">'+
                '<div class="row justify-content-evenly">'+
                '<div class="col-3"></div><div class="col-12 col-md-6">'+
                '<form id="project-update"><div class="my-4 col">'+
                '<label for="timer-name" class="form-label">Project Name</label>'+
                '<input type="text" required class="form-control" id="'+id+'timer-name"'+
                'aria-describedby="emailHelp"></div>'+
                '<div class="my-4 col row text-center align-items-bottom">'+
                '<div class="vstack gap-2 col-md-5 mx-auto">'+
                '<button type="button" onclick="update('+id+')" class="project-btn py-3">Update</button>'+
                '<button type="button" onclick="destroy('+id+')" class="project-btn py-3">Delete</button>'+
                '</div></div></form></div><div class="col-3"></div></div></div></div></div>';

                timerItem += timerTemplate;
            }

            $("#projectlist").html(timerItem);
        },
        "error" : function (xhr, status, error) {
            alert("Error")
        }
    });
}

function addtimer() {
 
    let record = { 
        "timer_name" : $("#timername").val(),
        }

    $.ajax({
        "url" : TIMERRECORD_API, 
        "type" : "POST", 
        "data" : "store=" + JSON.stringify(record),
        "success" : function (response) {
            let parseResponse = JSON.parse(response);
            viewProject();
            
        },
        "error" : function (xhr, status, error) {
            alert("Error")
            }
        })

}



function destroy(id) {


if (!confirm("Are you sure you want to delete?")) {
    return;
}

let idRequest = { "timer_id" : id };


$.ajax({
    "url" : TIMERRECORD_API, 
    "type" : "POST",
    "data" : "destroy=" + JSON.stringify(idRequest),
    "success" : function (response) { 
        let parseResponse = JSON.parse(response);
       
        

        if (parseResponse.status == 200) {
            viewProject();
            alert(parseResponse.description);
        }
    },
    "error" : function (xhr, status, error) { 
        viewProject();
        alert("Error");
    }
});
}


function update(id){

    let inputTarget = +id+'timer-name';
    let record = { 
        "timer_name" : $("#"+inputTarget).val(),
    } 

    let updateRequest = {
        "id" : id,
        "record" : record
    }

    $.ajax({
        "url" : TIMERRECORD_API,
        "type" : "POST", //GET and POST 
        "data" : "update=" + JSON.stringify(updateRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)

            viewProject()
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
};

let usersTable;

function manageUsers(id) {

    if (usersTable){
        usersTable.destroy();
    }
    let dataRequest = { 
        "timer_id" : id,
    };

    usersTable = $("#managemembers").DataTable({
        processing : true,
        ajax : {
            url :  TIMERRECORD_API +"?manageusers=" + JSON.stringify(dataRequest),
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();

                for (let i = 0; i<response.data.length; i++) 
                {
                    let userid = response.data[i].id
                    let isActive=""
                    let addRemove=""
                    let btnLabel ="";
                    if(response.data[i].is_active == 2){
                        isActive="Added";
                        addRemove="removeFromTimer";
                        btnLabel ="REMOVE";
                    }
                    else{
                        addRemove="addToTimer";
                        btnLabel ="ADD";
                    }

                    return_data.push({
                        userid : userid,
                        fname :  response.data[i].fname,
                        lname :  response.data[i].lname,
                        username : response.data[i].username,
                        status :  isActive,
                        action : "<button onclick='"+addRemove+"(" + id+','+ userid +")'>"+btnLabel+"</button>"

                    });

                    console.log(addRemove);
                }

                return return_data;
            },

        },
        columns : [
            { data : 'userid' },
            { data : 'fname' },
            { data : 'lname' },
            { data : 'username' },
            { data : 'status' },
            { data : 'action' },
        ],
    });
}

function addToTimer(id,userid){
    let addaccess = { 
        "user_id" : userid,
        "timer_id": id 
        }

    $.ajax({
        "url" : TIMERRECORD_API, 
        "type" : "POST", 
        "data" : "addaccess=" + JSON.stringify(addaccess),
        "success" : function (response) {
            viewProject();
            usersTable.ajax.reload();
        },
        "error" : function (xhr, status, error) {
            alert("Error")
            }
        })
}

function removeFromTimer(id,userid){
    let removeaccess = { 
        "user_id" : userid,
        "timer_id": id 
        }

    $.ajax({
        "url" : TIMERRECORD_API, 
        "type" : "POST", 
        "data" : "removeaccess=" + JSON.stringify(removeaccess),
        "success" : function (response) {
            viewProject();
            usersTable.ajax.reload();
        },
        "error" : function (xhr, status, error) {
            alert("Error")
            }
        })
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

let metricsTable ="";



function viewRecords(id) {
    if (metricsTable){
        // metricsTable.ajax.reload();
        metricsTable.destroy();
    }
    
    let timerlabelid = id+'timerlabel';

    let tableLabel = $('#'+timerlabelid).text();
    $('#viewMetricsLabel').text(tableLabel + ' - Project Metrics');

    $("#view-button").attr('onclick','viewRecords('+id+')');
    let fromDate = $("#from-date").val();
    let toDate = $("#to-date").val();
    let timerID = id;


        let dataRequest = { 
            "timer_id" : timerID,
            "session_start" : fromDate,
            "session_end" : toDate
        };

    metricsTable = $("#viewmetrics").DataTable({
        processing : true,
        ajax : {
            url : TIMERRECORD_API +"?getdataspanadmin=" + JSON.stringify(dataRequest),
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();
                let sessions= response.data1;
                let submits= response.data2
                let totalActiveTime = 0;
                let totalSubmits = response.data2.length;
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

                    let prodRate ="0"
                    

                    prodRate = activeTime ? (Math.round((submitted/activeTime)*600))/10 : "Cannot Determine";

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

                    return_data.push({
                        sessionid : sessions[i].id,
                        start :  displaystart,
                        end :  displayend,
                        submit : submitted,
                        time : activeTimeDisplay,
                        rate : prodRate
                    });
                }
                return return_data;
            },
            complete : function() {
                $('#records tbody').on('dblclick', 'tr', function() {
                    let data = $('#records')
                        .DataTable()
                        .row(this)
                        .data()
                    alert(data.id)
                    $("#idToBeDisplay").html(data.id)
                    $("#name").val(data.name);
                    $("#price").val(data.price);
                    $("#modalClickerShow").click();

                    $("#saveButton").hide();
                    $("#updateButton").show();
                    $("#showId").show();
                });
            },
        },
        columns : [
            { data : 'sessionid' },
            { data : 'start' },
            { data : 'end' },
            { data : 'submit' },
            { data : 'time' },
            { data : 'rate' },
        ],
        dom : 'lBfrtip',
        // buttons : [
        //     'copyHtml5',
        //     'excelHtml5',
        //     'csvHtml5',
        // ]
    });
}

