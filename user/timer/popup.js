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
            width: 700,
            height: 200,

          });


        pipWindow.document.body.append(player);
        const playerContainer = document.body;
        const playerContainerHead = document.head;
        let placeHolder= document.createElement("div");
        let placeHolder2= document.createElement("div");
        let placeHolderStyle = document.createElement("link");
        let placeHolderStyle2 = document.createElement("link");
        placeHolder2.classList.add("timer-display");
        placeHolderStyle.setAttribute("rel","stylesheet");
        placeHolderStyle.setAttribute("href","style-watch.css");
        placeHolderStyle2.setAttribute("rel","stylesheet");
        placeHolderStyle2.setAttribute("crossorigin","anonymous");
        placeHolderStyle2.setAttribute("integrity","sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM");
        placeHolderStyle2.setAttribute("href","https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
        playerContainerHead.appendChild(placeHolderStyle);
        playerContainerHead.appendChild(placeHolderStyle2);
        playerContainer.appendChild(placeHolder);
        playerContainer.appendChild(placeHolder2);
        placeHolder2.innerHTML = "00:00:00";


        function updateDisplay (){
            placeHolder2.innerHTML = pipWindow.document.getElementById("timer-display").innerHTML;
        }

        updateDisplay();
        var updateDisplayinterval = setInterval(updateDisplay,1000);
        

        // Move the player back when the Picture-in-Picture window closes.
        pipWindow.addEventListener("pagehide", (event) => {
          const pipPlayer = event.target.querySelector("#player");
          playerContainer.removeChild(placeHolder);
          playerContainer.removeChild(placeHolder2);
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

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  
  show(urlParams.get('q'))
  function show(id){

      console.log(id);
      $("#frameID").text(id);
  };
  
