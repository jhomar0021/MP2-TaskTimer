function update() {
    let updateRequest = {
        "id" : $("#userID").text(),
        "fname" : $("#fname").val(),
        "lname" : $("#lname").val(),
        "username" : $("#username").val(),
        "password" : $("#password").val(),
        "confirmPassword" : $("#confirmPassword").val()
    }


    $.ajax({
        "url" : REGISTER_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "update=" + JSON.stringify(updateRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}