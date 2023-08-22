const urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('q');

checkValidity();

function checkValidity(){
    if(username == ""){
        window.location.href = "../../index.html";
    }
    else{
    let loginRequest = {
        "username" : username
    }

    $.ajax({
        "url" : SEND_API, 
        "type" : "POST", 
        "data" : "validate=" + JSON.stringify(loginRequest), 
        "success" : function (response) { 
            let parseResponse = JSON.parse(response);
            console.log(parseResponse.data)

            if(parseResponse.description !== "valid"){  
                window.location.href = "../../index.html";
            }

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}
}

$("#verify-form").on("submit", function (e) {
    e.preventDefault();
    let update = {
        "username" : username,
        "password" : $("#password").val(),
        "confirmpassword" : $("#confirmpassword").val(),
    }

    $.ajax({
        url: SEND_API, //URL of the API
        type: "POST", //GET and POST
        data: "verify=" + JSON.stringify(update), //auth will be our php variable $_POST['auth']
        success: function (response) {
          //success yung response
          console.log(response);
          let parseResponse = JSON.parse(response);

          if(parseResponse.status == 200){
            console.log(parseResponse.description);
            let loading = '<div class="spinner-border" role="status">'+
            '<span class="visually-hidden">Loading...</span></div>';
            $('#verify-body').html(loading);
            setTimeout(gotodash,1000);
            function gotodash(){
                window.location.href = "../dashboard";
            }
          }
          else{
            console.log("error is "+parseResponse.description);
          }
        },
        error: function (xhr, status, error) {
          //error yung response
          alert("Error");
        },
      });
});