viewtimer()

function viewtimer(){
    $.ajax({
        "url" : TIMERRECORD_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "index", //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            
            let contents = parseResponse.data;
            let timerItem = "";
            for (let i = 0; i <contents.length; i++) {
                let id = contents[i].timer_id;
            
                timerItem +='<a href="production.html" id="'+ contents[i].timer_name +'" onclick="setTarget(this.id)">'+'</a>'+
                '<div class="timer-a-container newtimer">'+
                    '<div class="timer-label text-center">'+
                        '<h3 class="mt-2" style="font-size: 0px;">'+id+'</h3>'+
                        '<h3>'+ contents[i].timer_name +'</h3>'+
                        '<button class="timer-remove"'+
                        'onclick="destroy('+id+')">'+
                        '<i class="fa-solid fa-square-minus"></i>'+
                        '</button>'+
                    "</div>"+
                    '<div class="timer-details text-center container-fluid">'+
                        '<div class="row">'+
                           ' <div class="col border-end">'+
                                '<h5>Productivity /Rate per Hour</h5>'+
                                '<h3 id="totalrate">??/Hour</h3>'+
                            '</div>'+
                            '<div class="col border-end">'+
                                '<h5>Total Task Submitted</h5>'+
                                '<h3 id="totaltask">??? submits</h3>'+
                            '</div>'+
                            '<hr class="d-block d-md-none" />'+
                            '<div class="col-12 col-md-4 border-end">'+
                                '<h5>Total Working Hours</h5>'+
                                '<h3 id="totaltime">?? Hour/s ?? Min/s</h3>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</a>';
            
            }

            $("#timerlist").html(timerItem);
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function addtimer() {
    let record = { 
        "timer_name" : $("#timername").val(),
     }

    $.ajax({
        "url" : TIMERRECORD_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "store=" + JSON.stringify(record), //auth will be our php variable $_POST['auth']
        "success" : function (response) {
            console.log(response)
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
            "url" : TIMERRECORD_API, //URL of the API
            "type" : "POST", //GET and POST 
            "data" : "destroy=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
            "success" : function (response) { //success yung response
                console.log(response)
                let parseResponse = JSON.parse(response);
                //Do certain process
                
    
                if (parseResponse.status == 200) {
                    viewtimer();
                    alert(parseResponse.description);
                }
            },
            "error" : function (xhr, status, error) { //error yung response
                viewtimer();
                alert("Error");
            }
        });
    }