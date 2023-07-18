function register() {
    let registrationRequest = {
        "fname" : $("#fname").val(),
        "lname" : $("#lname").val(),
        "username" : $("#username").val(),
        "password" : $("#password").val(),
        "confirmPassword" : $("#confirmPassword").val()
    }

    $.ajax({
        "url" : REGISTER_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "register=" + JSON.stringify(registrationRequest), //auth will be our php variable $_POST['auth']
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

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}