


// function check(){
//     documentPictureInPicture.addEventListener("enter", (event) => {
//         const pipWindow = event.window;
    
//         function set(){
//             placeHolder.innerHTML = pipWindow.document.body.innerHTML;
//             
//             console.log(timerCount);
//         }
        
//         if(pipWindow.document.body.innerHTML !== null){
//             set();
//             setInterval(set,1000);
//         }
        
    
//       });
    
// }
const pipWindow = documentPictureInPicture.window;

function check(){
    

    if(pipWindow.document.querySelector("timer-display").innerText !== null){
        let timerCount = pipWindow.document.querySelector("timer-display").innerText;
        console.log(timerCount);
    }
    else{
        console.log("stopped");
    }
}

check();

setTimeout(check,2000);
setInterval(check,1000);