/**
 * @var change url
 */



const toastLiveExample = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

clear();


function clear(){
    $("#fname").val("");
    $("#lname").val("");
    $("#username").val("");
};




let usersTable;

setTimeout(index,100)
function index() {
    usersTable = $("#records").DataTable({
        processing : true,
        paging: true,
        scrollCollapse: true,
        scrollY: '57svh',
        ajax : {
            url : USERS_API + "?index",
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();

                for (let i = 0; i<response.data.length; i++) 
                {
                    let stat="";
                    let createdby = response.data[i].created_by;
                    let image= '<img src="'+response.data[i].image_path+
                    '" style="width:10%; min-width:60px;aspect-ratio:1;border:solid black 2px; border-radius:50px;" position:absolute;>'
                    if((response.data[i].is_active == 1 && response.data[i].created_by == userID)||(response.data[i].status == 1)){
                        stat = '<a href="#" class="badge" style="color:black;background-color:hsla(110, 100%, 50%, 0.863)">Active</a>';
                    }
                    else{
                        stat= '<a href="#" class="badge" style="color:black;background-color:rgb(255, 0, 0)">Pending</a>';
                    }
                    let id = response.data[i].id
                    return_data.push({
                        image : image,
                        fname :  response.data[i].fname,
                        lname :  response.data[i].lname,
                        username : response.data[i].username,
                        status :  stat,
                        action : "<button onclick='viewUser(" + id + ")'>VIEW</button> <button onclick='destroy(" + id+","+userID+ ")'>DELETE</button></td>"
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
            { data : 'image' },
            { data : 'fname' },
            { data : 'lname' },
            { data : 'username' },
            { data : 'status' },
            { data : 'action' },
        ],
        columnDefs: [ {
            'targets': [0,5], // column index (start from 0)
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
const addUserModal = new bootstrap.Modal('#add-userModal');

function adduser() {
    // let addUserID = $("#username").val();
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
            
            urlID = parseResponse.data;
            console.log("this is hashed  "+   urlID);

            let body=
            '<body style="font-family: sans-serif; height: 100%; width: 100%; background-color: blueviolet; '+
            'background-image: url(https://mp-2-task-timer-ixtf.vercel.app/assets/img/data-info-alt.jpg);'+
            'background-size: cover;background-position: center;background-repeat: no-repeat;"><center><table><tr><td>'+
            '<div style="width: 100%; display:block; text-align: center; color: white;" ><h1>Welcome to TaskTimer</h1><br></div><td><tr>'+
            '<tr><td><h1 style="display:hidden;">.</h1><td><tr><tr><td><h1 style="display:hidden;">.</h1><td><tr><tr><td><td><tr><tr><td><div style="width: 100%; display:block; text-align: center; color: white;">'+
            '<h2>You have been invited to join TaskTimer by your Manager, Please click the link below to activate your account</h2><br></div><td><tr>'+
            '<tr><td><div style="width: 100%;  display:block; text-align: center; "><a href="http://localhost/mp2-tasktimer/user/verification/?q='+urlID+'">'+
            '<button style="width: 50%; border: none; height: 50px; border-radius: 10px; color: white;background-color: blueviolet;">ACTIVATE ACCOUNT'+
            '</button></a></div><td><tr><tr><td><h1 style="display:hidden;">.</h1><td><tr></table></center></body>';
            

            console.log(body);


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
                            $('#alert-title').html(parseResponse.title);
                            $('#alert-description').html(parseResponse.description);
                            toastBootstrap.show()
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
                            $('#alert-status').html('<i class="fa-solid fa-circle-exclamation"></i>');
                            $('#alert-title').html(parseResponse.title);
                            $('#alert-description').html(parseResponse.description);
                            toastBootstrap.show()                        }
                       
                    },
                    "error" : function (xhr, status, error) {
                        alert("Error")
                    }
                });

        },
        "error" : function (xhr, status, error) { //error yung response
            $('#alert-status').html('<i class="fa-solid fa-circle-exclamation"></i>');
            $('#alert-title').html(parseResponse.title);
            $('#alert-description').html(parseResponse.description);
            toastBootstrap.show()    
        }
    });


    

}


function hideInactive(){
	usersTable.ajax.url(USERS_API + '?get&name=test').load()
}

function clear(){
    $("#fname").val("");
    $("#lname").val("");
    $("#username").val("");
    $("#e-username")
}

function adduserExist(){
    let registrationRequest = {
        "username" : $("#e-username").val(),
    }

    $.ajax({
        "url" : USERS_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "addexistinguser=" + JSON.stringify(registrationRequest), //auth will be our php variable $_POST['auth']
        //JS JSON.stringify -> PHP json_decode
        //PHP json_encode -> JSON.parse
        //5. Check your API and do the process
        "success" : function (response) {
            let parseResponse = JSON.parse(response);
            if(parseResponse.status == 200){

                $("#e-username").val("");
                usersTable.ajax.reload();
                addUserModal.hide();
                $('#alert-title').html(parseResponse.title);
                $('#alert-description').html(parseResponse.description);
                toastBootstrap.show()
            }
            else{
                $("#registeralert").html("<h3>" + parseResponse.title + "</h3>" + "<h5>" + parseResponse.description + "</h5>");
                $('#alert-title').html(parseResponse.title);
                $('#alert-description').html(parseResponse.description);
                toastBootstrap.show()
            }
           
        },
        "error" : function (xhr, status, error) {
            $('#alert-status').html('<i class="fa-solid fa-circle-exclamation"></i>');
            $('#alert-title').html(parseResponse.title);
            $('#alert-description').html(parseResponse.description);
            toastBootstrap.show()    
        }
    });
}



function destroy(id,createdby) {

    if (!confirm("Are you sure you want to delete?")) {
        return;
    }

    let idRequest = {
         "id" : id ,
         "added_by" : createdby
        }; 

    $.ajax({
        "url" : USERS_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "destroy=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process

            if (parseResponse.status == 200) {
                //index();

                usersTable.ajax.reload();
            }
            $('#alert-status').html('<i class="fa-solid fa-circle-exclamation"></i>');
            $('#alert-title').html(parseResponse.title);
            $('#alert-description').html(parseResponse.description);
            toastBootstrap.show()    
            
        },
        "error" : function (xhr, status, error) { //error yung response
            $('#alert-status').html('<i class="fa-solid fa-circle-exclamation"></i>');
            $('#alert-title').html(parseResponse.title);
            $('#alert-description').html(parseResponse.description);
            toastBootstrap.show()    
        }
    });
    
}