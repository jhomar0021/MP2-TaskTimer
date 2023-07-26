/**
 * @var change url
 */
index();
function index() {
    $.ajax({
        "url" : DASHBOARD_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "index", //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function show() {
    let idRequest = { "id" : $("#id").val()}; //$("#id").val() <- dito naka lagay yung specific id

    $.ajax({
        "url" : DASHBOARD_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "show=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}


function store() {
    let record = { 
        "fname" : $("#fname").val(),
        "lname" : $("#lname").val(),
        "username" : $("#username").val(),
        "password" : $("#password").val(),
        "confirmPassword" : $("#confirmPassword").val()
     } //$("#id").val() <- dito naka lagay yung specific id

    $.ajax({
        "url" : DASHBOARD_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "store=" + JSON.stringify(record), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function update() {
    let record = { 
        "fname" : $("#fname").val(),
        "lname" : $("#lname").val(),
        "username" : $("#username").val(),
        "password" : $("#password").val(),
        "confirmPassword" : $("#confirmPassword").val()
    } 

    let id = $("#id").val(); //$("#id").val() <- dito naka lagay yung specific id
    let updateRequest = {
        "id" : id,
        "record" : record
    }

    $.ajax({
        "url" : DASHBOARD_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "update=" + JSON.stringify(updateRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function destroy(id) {

    if (!confirm("Are you sure you want to delete?")) {
        return;
    }

    let idRequest = { "id" : id }; //$("#id").val() <- dito naka lagay yung specific id

    $.ajax({
        "url" : DASHBOARD_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "destroy=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}