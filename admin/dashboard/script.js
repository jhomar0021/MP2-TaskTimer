retrieveDashboardCards()

setInterval(retrieveDashboardCards, 3000)

function retrieveDashboardCards() {
    $.ajax({
        "url" : DASHBOARD_API, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "index", //auth will be our php variable $_POST['auth']
        //JS JSON.stringify -> PHP json_decode
        //PHP json_encode -> JSON.parse
        //5. Check your API and do the process
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            $("#total_users").text(parseResponse.data[0].total_users)
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}