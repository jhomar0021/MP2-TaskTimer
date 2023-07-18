/**
 * @var change url
 */
index();
function index() {
    $.ajax({
        "url" : USERS_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "index", //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            let parseResponse = JSON.parse(response);
            //Do certain process

            let contents = parseResponse.data;
            let tr = "";
            let cards = "";
            for (let i = 0; i <contents.length; i++) {
                let id = contents[i].id
                tr += "<tr>" + 
                    "<td>" + id + "</td>" + 
                    "<td>" + contents[i].fname + "</td>" + 
                    "<td>" + contents[i].lname + "</td>" + 
                    "<td>" + contents[i].username + "</td>" + 
                    "<td>" + contents[i].created_at + "</td>" + 
                    "<td><button onclick='viewUser(" + id + ")' class='btn btn-warning'>VIEW</button> <button class='btn btn-danger' onclick='destroy(" + id + ")'>DELETE</button></td>" + 
                "</tr>";

                cards += '<div class="col">' +
                    '<div class="card" style="width: 18rem;">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + contents[i].fname + ' ' + contents[i].lname + '</h5>' +
                            '<p class="card-text"></p>' +
                            "<button onclick='viewUser(" + id + ")' class='btn btn-warning'>VIEW</button> <button class='btn btn-danger' onclick='destroy(" + id + ")'>DELETE</button>" +
                        '</div>' +
                    '</div>' +
                '</div>' 

            }
         
            $("#cards").html(cards)
            $("#content").html(tr)
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function show(id) {
    let idRequest = { "id" : id}; //$("#id").val() <- dito naka lagay yung specific id

    $.ajax({
        "url" : USERS_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "show=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response

            let parseResponse = JSON.parse(response);
            
            $("#id").val(parseResponse.data[0].id)
            $("#fname").val(parseResponse.data[0].fname)
            $("#lname").val(parseResponse.data[0].lname)
            $("#username").val(parseResponse.data[0].username)

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
    } 

    let id = $("#id").val(); //$("#id").val() <- dito naka lagay yung specific id
    let updateRequest = {
        "id" : id,
        "record" : record
    }

    $.ajax({
        "url" : USERS_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "update=" + JSON.stringify(updateRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
            $("#container").html("<h1>" + parseResponse.title + "</h1>" + "<h2>" + parseResponse.description + "</h2>");
            show(id)
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
        "url" : USERS_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "destroy=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
            alert(parseResponse.description)

            if (parseResponse.status == 200) {
                index();
            }
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function viewUser(id) {
    window.location.href = "view.html?q=" + id 
}