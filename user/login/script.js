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

document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name == "Enter") {
        login();
    }
    }
 );



function register() {
    window.location.href = "user/register";
}

// let animationTime = 0;

// function animatetim(){
//     animationTime =animationTime +1;
//     console.log(animationTime)
//     if(animationTime == 10){
//         animationTime = 0;
//     }
// }

// animatetim()

// setInterval(animatetim,400)

// animateText();

// setInterval(animateText,400)
// function animateText(){
//         switch (animationTime) {
//         case 0:
//         console.log("1");
//         text = "T|";
//         break;
//         case 1:
//         console.log("1");
//         text = "TR";
//         break;
//         case 2:
//         console.log("1");
//         text = "TRA|";
//         break;
//         case 3:
//         console.log("1");
//         text = "TRAC";
//         break;

//         case 4:
//         console.log("1");
//         text = "TRACK|";
//         break;
//         case 5:
//         console.log("1");
//         text = "TRACK T";
//         break;
//         case 6:
//         console.log("1");
//         text = "TRACK TI|";
//         break;
//         case 7:
//         console.log("1");
//         text = "TRACK TIM";
//         break;
//         case 8:
//         console.log("1");
//         text = "TRACK TIME|";
//         break;
//     }
//         // case 1:
//         //     console.log("2");
//         //     text = "KEEP RECORDS";
//         //     break;
//         // case 2:
//         //     console.log("3")
//         //     text = "CREATE INVOCE";
//         //     break;
//         // case 3:
//         //     console.log("4")
//         //     text = "INCREASE PRODUCTIVITY";
//         //     break;
//     $("#animatedtext").html(text);
//       }
      