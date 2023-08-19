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
            let timerItem = "";
            
            

            for (let i = 0; i < timers.length; i++){
                let id = timers[i].timer_id;
                let name = timers[i].timer_name;
                let createdBy = timers[i].id;
                let activeValue = 0;
                let submitValue = 0;

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
                    else{
                        console.log("is not equal"+timersessions[j].timer_id+"/"+id);
                    }
                }

                for (let k = 0; k < submits.length; k++ ){
                    let svalue = 0;
                    if(submits[k].timer_id == id){
                        svalue += 1;
                    }
                    submitValue = submitValue + svalue;
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
                '<h3>'+ name+'</h3></div>'+
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
                '<div class="col-12"><h2> '+id+' </h2></div>'+
                '</div><div class="col-12 my-2  col-md-3 mx-2 row">'+
                '<button class="add-task col-6 ms-5" data-bs-toggle="modal"'+
                'data-bs-target="#manageUsers">Manage Users</button></div></div></div>'+
                '<div id="'+id+'b" class="collapse" data-bs-parent="#projectlist">'+
                '<div class="container-fluid my-3 py-3 "><div class="row">'+
                '<div class="col-12 my-2  col-md-4 mx-2 stats-box row">'+
                '<div class="col-12 col-lg-6 text-center"><h4>Total Project Hours</h4></div>'+
                '<div class="col-12 col-lg-6 text-center"><h3>'+activeHoursMins+'</h3></div></div>'+
                '<div class="col-12 my-2  col-md-4 mx-2 stats-box row">'+
                '<div class="col-12 col-lg-6 text-center"><h4>Total Submitted</h4></div>'+
                '<div class="col-12 col-lg-6 text-center"><h3>'+submitDisplay+'</h3></div></div>'+
                '<div class="col-12 my-2  col-md-3 mx-2 row">'+
                '<button>VIEW DETAILED</button></div></div></div></div>'+
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

