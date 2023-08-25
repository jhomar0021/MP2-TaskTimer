adminpanel();


function adminpanel() {
    console.log("updating")
    $.ajax({
        "url" : USERS_API, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "adminpanel",
        "success" : function (response) { //success yung response
            let parseResponse = JSON.parse(response);
            console.log(parseResponse);
            let sessions = parseResponse.data4;
            $('#active-users').html(parseResponse.data1);
            $('#active-projects').html(parseResponse.data2);
            $('#submit-count').html(parseResponse.data3);
            
            let activeTime = 0;

            for(let i = 0; i<sessions.length; i++){
                console.log(sessions[i].session_start+sessions[i].session_end)

                let startMins= Math.round(parseInt(new Date(sessions[i].session_start)/6000));
                let endMins = Math.round(parseInt(new Date(sessions[i].session_end)/6000));
                activeTime += (endMins - startMins)/10;}

                console.log(activeTime);
                let activeTimeInMins = Math.round(activeTime%60);
                let activeTimeinHours = Math.floor(activeTime/60);
            if(activeTimeInMins < 10){
                activeTimeInMins = "0"+activeTimeInMins;
            }
            if(activeTimeinHours < 10){
                activeTimeinHours = "0"+activeTimeinHours;
            }
            let activeTimeDisplay = activeTimeinHours+":"+activeTimeInMins;

            $('#worked-hours').html(activeTimeDisplay);
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
};