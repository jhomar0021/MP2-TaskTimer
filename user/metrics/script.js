let today = "";
let todayTime ="";
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
            
            let contents = parseResponse.data;
            let timerItem = "";
            for (let i = 0; i <contents.length; i++) {
                let id = contents[i].timer_id;
                let name = contents[i].timer_name;
                let timerTemplate = '<option value ="'+id+'">'+ name +'</option>'
                timerItem = timerTemplate + timerItem;
            
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

    $("#from-date").val(today);
    $("#to-date").val(todayTime);

}




function viewRecords(){
    let fromDate = $("#from-date").val();
    let toDate = $("#to-date").val();
    console.log(timerID);
    console.log(fromDate);
    console.log(toDate);
}