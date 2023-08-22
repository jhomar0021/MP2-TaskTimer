/**
 * @var change url
 */

let usersTable;
index();
function index() {
    usersTable = $("#records").DataTable({
        processing : true,
        ajax : {
            url : USERS_API + "?index",
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();

                for (let i = 0; i<response.data.length; i++) 
                {
                    let stat="";

                    if(response.data[i].is_active == 1){
                        stat ="Active";
                    }
                    else{
                        stat="Pending";
                    }
                    let id = response.data[i].id
                    return_data.push({
                        id : id,
                        fname :  response.data[i].fname,
                        lname :  response.data[i].lname,
                        username : response.data[i].username,
                        status : stat ,
                        action : "<button onclick='viewUser(" + id + ")'>VIEW</button> <button onclick='destroy(" + id + ")'>DELETE</button></td>"
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
            { data : 'id' },
            { data : 'fname' },
            { data : 'lname' },
            { data : 'username' },
            { data : 'status' },
            { data : 'action' },
        ],
        columnDefs: [ {
            'targets': [5], // column index (start from 0)
            'orderable': false, // set orderable false for selected columns
      }],
        dom : 'lBfrtip',
        buttons : [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
        ]
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

const registerModal = new bootstrap.Modal('#registerModal');


function adduser() {
    let addUserID = $("#username").val();
    let urlID= "";
    let hash = {
        "username" : $("#username").val()
    }

    $.ajax({
        "url" : SEND_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" :"hash=" + JSON.stringify(hash),
        "success" : function (response) { //success yung response
            let parseResponse = JSON.parse(response);
            console.log(parseResponse);

            urlID = parseResponse.data;
            console.log("this is hashed  "+   urlID);

            let body=
            '<body style="font-family: sans-serif; height: 100%; width: 100%; background-color: blueviolet; '+
            'background-image: url(https://mp-2-task-timer-ixtf.vercel.app/assets/img/data-info-alt.jpg);'+
            'background-size: cover;background-position: center;background-repeat: no-repeat;"><center><table><tr><td>'+
            '<div style="width: 100%; display:block; text-align: center; color: white;" ><h1>Welcome to TaskTimer</h1><br></div><td><tr>'+
            '<tr><td><h1 style="display:hidden;">.</h1><td><tr><tr><td><h1 style="display:hidden;">.</h1><td><tr><tr><td><td><tr><tr><td><div style="width: 100%; display:block; text-align: center; color: white;">'+
            '<h2>You have been invited to join TaskTimer by your Manager, Please click the link below to activate your account</h2><br></div><td><tr>'+
            '<tr><td><div style="width: 100%;  display:block; text-align: center; "><a href="http://localhost/mp2-tasktimer/user/verification/?q='+addUserID+'">'+
            '<button style="width: 50%; border: none; height: 50px; border-radius: 10px; color: white;background-color: blueviolet;">ACTIVATE ACCOUNT'+
            '</button></a></div><td><tr><tr><td><h1 style="display:hidden;">.</h1><td><tr></table></center></body>';
            
                let registrationRequest = {
                    "fname" : $("#fname").val(),
                    "lname" : $("#lname").val(),
                    "username" : $("#username").val(),
                    "password" : "userpass",
                    "level" : "3",
                    "active": "0",
                    'body' : body,
                    'addedby': userID
                }
            
                $.ajax({
                    "url" : USERS_API, //URL of the API
                    "type" : "POST", //GET and POST 
                    "data" : "adduser=" + JSON.stringify(registrationRequest), //auth will be our php variable $_POST['auth']
                    //JS JSON.stringify -> PHP json_decode
                    //PHP json_encode -> JSON.parse
                    //5. Check your API and do the process
                    "success" : function (response) {
                        let parseResponse = JSON.parse(response);
                        if(parseResponse.status == 200){
                            $("#fname").val("");
                            $("#lname").val("");
                            $("#username").val("");
                            usersTable.ajax.reload();
                            registerModal.hide();
            
                            $.ajax({
                                "url" : SEND_API, //URL of the API
                                "type" : "POST", //GET and POST 
                                "data" :"sendinvite=" + JSON.stringify(registrationRequest),
                                "success" : function (response) { //success yung response
                                },
                                "error" : function (xhr, status, error) { //error yung response
                                    alert("Error")
                                }
                            });
                        }
                        else{
                            $("#registeralert").html("<h3>" + parseResponse.title + "</h3>" + "<h5>" + parseResponse.description + "</h5>");
                        }
                       
                    },
                    "error" : function (xhr, status, error) {
                        alert("Error")
                    }
                });

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });


    

}