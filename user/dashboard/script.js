viewtimer()

function viewtimer(){


    $.ajax({
        "url" : TIMERRECORD_API, 
        "type" : "GET", 
        "data" : "index", 
        "success" : function (response) {
            
            let parseResponse = JSON.parse(response);
            let contents = parseResponse.data1;
            let sessionrecords = parseResponse.data2;
            let submitrecords = parseResponse.data3;
            let timerItem = "";
            let activeValue = 0;
            let submitValue = 0;

            for (let i = 0; i < contents.length; i++){
                let id = contents[i].timer_id;
                for (let j = 0; j < sessionrecords.length; j++){
                    let value = 0;
                    if(sessionrecords[j].timer_id == id){
                        let stVal = sessionrecords[j].session_start_value;
                        let enVal = sessionrecords[j].session_end_value
                        if( stVal > enVal){   
                            enVal = enVal + 1140; 
                        }
                    
                        value = enVal - stVal;
                        activeValue = activeValue + value;
                        console.log(activeValue);
                    }
                }

                for (let k = 0; k < submitrecords.length; k++ ){
                    let svalue = 0;
                    if(submitrecords[k].timer_id == id){
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
                let WorkRate =Math.floor(submitValue/activeValue*6000);
                let RPH = WorkRate/100;
                if(activeMins == 0 || submitValue == 0){
                    workRateDisplay = "No Submitted Task"
                }
                else{
                    workRateDisplay = RPH + "/Hour";
                }

                let timerTemplate =
                '<div class="timer-a-container newtimer">'+
                '<div class="timer-top text-center">'+
                '<a onclick="viewUser('+id+')" class="timer-top">'+
                '<h3 class="mt-2" style="font-size: 0px;">id</h3>'+
                '<h3 class="projectlabel"> '+contents[i].timer_name+' </h3>'+
                '<h3></h3>'+
                '</a>'+
                '<button class="timer-remove"'+
                'onclick="destroy('+id+')">'+
                '<i class="fa-solid fa-square-minus"></i>'+
                '</button>'+
                '</div>'+
                '<a onclick="viewUser('+id+')">'+
                '<div  class="py-1">'+
                '<div class="timer-details text-center container-fluid">'+
                '<div class="row">'+
                '<div class="col border-end">'+
                '<h5>Productivity /Rate per Hour</h5>'+
                '<h3 id="'+id+'totalrate">'+workRateDisplay+'</h3>'+
                '</div>'+
                '<div class="col border-end">'+
                '<h5>Total Task Submitted</h5>'+
                '<h3 id="'+id+'totaltask">'+submitDisplay+'</h3>'+
                '</div>'+
                '<hr class="d-block d-md-none" />'+
                '<div class="col-12 col-md-4 border-end">'+
                '<h5>Total Working Hours</h5>'+
                '<h3 id="'+id+'totaltime">'+activeHoursMins+'</h3>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</a>'+
                '</div>'
                ;
                timerItem = timerTemplate + timerItem;
            }

            $("#timerlist").html(timerItem);
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
                viewtimer();
                
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
                viewtimer();
                alert(parseResponse.description);
            }
        },
        "error" : function (xhr, status, error) { 
            viewtimer();
            alert("Error");
        }
    });
}

function viewUser(id) {

    window.open("../timer/index.html?q=" + id,'_blank')
}

