$("#login-form").on("submit", function (e) {
    e.preventDefault();
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
            $("#loginalert").removeClass('bg-success-subtle');
            $("#loginalert").addClass('bg-danger-subtle');
            $("#loginalert").html("<h3>" + parseResponse.title + "</h3>" + "<h5>" + parseResponse.description + "</h5>");

            /**
             * If successful yung login
             */
            if (parseResponse.status == 200 && parseResponse.description =="Admin Access"){
                $("#loginalert").removeClass('bg-danger-subtle');
                $("#loginalert").addClass("bg-success-subtle");
                window.location.href = "corporate/dashboard admin";
            }
            if (parseResponse.status == 200 && parseResponse.description =="User Access") {
                $("#loginalert").removeClass('bg-danger-subtle');
                $("#loginalert").addClass("bg-success-subtle");
                window.location.href = "user/dashboard";
            }
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
});


const registerModal = new bootstrap.Modal('#registerModal');
const loginModal = new bootstrap.Modal('#loginModal')

$("#reg-form").on("submit", function (e) {
    e.preventDefault();
    let registrationRequest = {
        "fname" : $("#fname").val(),
        "lname" : $("#lname").val(),
        "username" : $("#username").val(),
        "password" : $("#rpassword").val(),
        "confirmPassword" : $("#rconfirmPassword").val(),
        "level" : $("input[type='radio'][name='account-level']:checked").val()
    }

    $.ajax({
        "url" : REGISTER_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "register=" + JSON.stringify(registrationRequest), //auth will be our php variable $_POST['auth']
        //JS JSON.stringify -> PHP json_decode
        //PHP json_encode -> JSON.parse
        //5. Check your API and do the process
        "success" : function (response) {
            let parseResponse = JSON.parse(response);
            if(parseResponse.status == 200){

                $("#loginalert").removeClass('bg-danger-subtle');
                $("#loginalert").addClass("bg-success-subtle");
                $("#loginalert").html("<h3>" + parseResponse.title + "</h3>" + "<h5>" + parseResponse.description + "</h5>");       
            }
            else{
                $("#registeralert").html("<h3>" + parseResponse.title + "</h3>" + "<h5>" + parseResponse.description + "</h5>");
            }
           
        },
        "error" : function (xhr, status, error) {
            alert("Error")
        }
    });
})
