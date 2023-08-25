

const toastLiveExample = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

let inviteCount= 0;

setInterval(getNotif,1000);
getNotif();
function getNotif(){
    let record = { 
        "user_id" :userID,
        }

    $.ajax({
        "url" : USERS_API, 
        "type" : "POST", 
        "data" : "updatenotif=" + JSON.stringify(record),
        "success" : function (response) {
            let parseResponse = JSON.parse(response);
            let invites = parseResponse.data;
            let notifs ="";
            let count = 0;
            for(let i=0; i<invites.length;i++){
                count +=1;
                console.log("invite count is " + inviteCount);
                let newNotif =
                '<tr class="mt-1 mb-1" id="'+invites[i].created_by+'toast"><td style="width:50%;"><bold>'+invites[i].fname+' '+invites[i].lname+'</bold> invites you to join his group</td>'+
                '<td class="text-center"><button type="button" class="btn btn-primary" onclick="accept('+userID+','+invites[i].created_by+')">Accept</button></td>'+
                '<td class="text-center"><button type="button" class="btn btn-danger" onclick="decline('+userID+','+invites[i].created_by+')">Decline</button></td>'+
                '</tr>';

                notifs += newNotif;
            }
            inviteCount = count;
            $('#invite-list').html(notifs);
            if(inviteCount !== 0){
                if($('#liveToast').is(':hidden')){
                    toastBootstrap.show();
                    
                }
            }
            closeToast();
        },
        "error" : function (xhr, status, error) {
            alert("Error")
            }
        });
    
}


function accept(id,created_by){
        let trID = created_by+'toast';
         let record = { 
        "user_id" :id,
        "created_by" : created_by,
        }
        $.ajax({
            "url" : USERS_API, 
            "type" : "POST", 
            "data" : "acceptinvite=" + JSON.stringify(record),
            "success" : function (response) {
                inviteCount =  inviteCount - 1;
                console.log(inviteCount);
                $('#'+trID).remove();
                closeToast();
            },
            "error" : function (xhr, status, error) {
                alert("Error")
                }
            });

}

function decline(id,created_by){

    let trID = created_by+'toast';
    let record = { 
   "user_id" :id,
   "created_by" : created_by,
   }
   $.ajax({
       "url" : USERS_API, 
       "type" : "POST", 
       "data" : "declineinvite=" + JSON.stringify(record),
       "success" : function (response) {
        $('#'+trID).remove();
        inviteCount =  inviteCount - 1;
        console.log(inviteCount);
        closeToast();
       },
       "error" : function (xhr, status, error) {
           alert("Error")
           }
       });

}

function closeToast(){
    if(inviteCount < 1){
        toastBootstrap.hide();
    }
}