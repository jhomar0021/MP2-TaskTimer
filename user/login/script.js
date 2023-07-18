function login() {
    let loginRequest = {
        "username" : $("#email").val(),
        "password" : $("#password").val()
    }

    $.ajax({
        "url" : LOGIN_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "auth=" + JSON.stringify(loginRequest), //auth will be our php variable $_POST['auth']
        //JS JSON.stringify -> PHP json_decode
        //PHP json_encode -> JSON.parse
        //5. Check your API and do the process
        "success" : function (response) { //success yung response
            console.log(response)
            /**
             * 6. Check the response and parse it thru JSON.parse
             */
            let parseResponse = JSON.parse(response);
            $("#container").html("<h1>" + parseResponse.title + "</h1>" + "<h2>" + parseResponse.description + "</h2>");

            /**
             * If successful yung login
             */
            if (parseResponse.status == 200 && parseResponse.description =="Admin Access"){
                window.location.href = "admin/dashboard";
            }
            if (parseResponse.status == 200 && parseResponse.description =="User Access") {
                window.location.href = "user/dashboard";
            }
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function register() {
    window.location.href = "user/register";
}