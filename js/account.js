getProfile()

let userID = "";
let userFirstName = "";
let userLastName = "";
let username ="";
let userFull ="";

function getProfile() {
    $.ajax({
        "url" : PROFILE_API,
        "type" : "POST", 
        "data" : "getLoggedUser",
        "success" : function (response) {
            let parseResponse = JSON.parse(response);
            userID =parseResponse['data']['id'];
            userFirstName =parseResponse['data']['fname'];
            userLastName =parseResponse['data']['lname'];
            username =  parseResponse['data']['username'];
            userFull = userFirstName + " " + userLastName;
            let image = parseResponse['data']['image_path'];

            let profilepic = '<img src="'+image+'" class="uploadpic mt-5 mt-md-0" alt=""></img>'


            if (parseResponse.status == 401) {
                window.location.href = "../../index.html";
            }
            else{
                $('#fname').val(userFirstName);
                $('#lname').val(userLastName);
                $("#hello").text(userFull);
                $("#title").text(userFull+"-TaskTimer");    
                $("#userID").text(userID);
                $('#username').val(username);
                $('#pro-pic').html(profilepic);
                $('#uploader').html(profilepic);
    
            }

        },
        "error" : function (xhr, status, error) {
            alert("Error")
        }
    });
 }




 function logout() {
    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    $.ajax({
        "url" : PROFILE_API,
        "type" : "POST", 
        "data" : "logout",
        "success" : function (response) { 

            let parseResponse = JSON.parse(response);

            if (parseResponse.status == 200) {
                window.location.href = "../../index.html";
            }
            
        },
        "error" : function (xhr, status, error) { 
            alert("Error")
        }
    });

 }
 
