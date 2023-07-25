function buttonHide(){
    let popupBtn = document.getElementById("pipButton");
    let popupIcon = document.getElementById("pipButton-icon");
    popupBtn.classList.add("d-none");
    popupIcon.classList.add("d-none");
};

pipButton.addEventListener("click", async () => {

    if ('documentPictureInPicture' in window) {
        const player = document.querySelector("#player");

        // Open a Picture-in-Picture window.
        const pipWindow = await documentPictureInPicture.requestWindow({
            width: 475,
            height: 120,

          });


        pipWindow.document.body.append(player);
        
let popUpSub ='<head>'+
'<meta charset="UTF-8">'+
'<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
'<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
'<title id="tab-title">Production</title>'+
'<link rel="stylesheet" href="styles2.css">'+
'<link rel="stylesheet" href="styles.css">'+
'<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"'+
'integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">'+
'</head>'+
'<body>'+
'<div class="d-none">'+
'</div>'+
'<div class="gridlayout">'+
'<div class="master-timer bigbox">'+
'<div class="mt-3 pt-5 timer-display text-center" id="timer-display">'+
'00:00:00'+
'</div>'+
'<div class="mt-3 pt-0 timer-display text-center">'+
'PIP Mode'+
'</div>'+
'</div>'+
'<div class="metrics-box medbox text-center">'+
'<p class="mb-text">Production Time</p>'+
'<div class="text-center">'+
'<p class="wtimer-display display">00:00:00</p>'+
'</div>'+
'</div>'+
'<div class="metrics-box smbox1 text-center">'+
'<div>'+
'<p class="mb-text">Submitted</p>'+
'<div class="">'+
'<p id="submit-counter-display" class="display submit-counter-display">0</p>'+
'</div>'+
'</div>'+
'</div>'+
'<div class="metrics-box smbox2 text-center">'+
'<div>'+
'<p class="mb-text">Productivity</p>'+
'<div class="">'+
'<p class="work-time-display display">0</p>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';
$("#playerContainer").html(popUpSub);




        function updateDisplay (){
          document.getElementById("timer-display").innerHTML = pipWindow.document.getElementById("timer-display").innerHTML;
          document.querySelector(".work-time-display").innerHTML = pipWindow.document.querySelector(".work-time-display").innerHTML;
          document.querySelector(".wtimer-display").innerHTML = pipWindow.document.querySelector(".wtimer-display").innerHTML;
          pipWindow.document.getElementById("submit-counter-display").innerText = document.getElementById("submit-counter-display").innerText ;
        }

        updateDisplay();
        var updateDisplayinterval = setInterval(updateDisplay,200);
        

        // Move the player back when the Picture-in-Picture window closes.
        pipWindow.addEventListener("pagehide", (event) => {
          const pipPlayer = event.target.querySelector("#player");
          $("#playerContainer").html("");
          playerContainer.append(pipPlayer);
          clearInterval(updateDisplayinterval);

          function buttonShow (){
            let popupBtn = document.getElementById("pipButton");
            let popupIcon = document.getElementById("pipButton-icon");
            popupBtn.classList.remove("d-none");
            popupIcon.classList.remove("d-none");
         
          };
            
          buttonShow();
        });
    }
    else {
        alert("feature is not enebled chrome://flags/#document-picture-in-picture-api")
        open("url","chrome://flags/#document-picture-in-picture-api");

    }

  });

  
