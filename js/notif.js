

const toastLiveExample = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

let inviteCount= 0;

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
            let inviteCount =0;
            for(let i=0; i<invites.length;i++){
                inviteCount =1;
                let newNotif =
                '<tr id="'+invites[i].created_by+'toast"><td style="width:50%;">'+invites[i].fname+' '+invites[i].lname+' invites you to join his group</td>'+
                '<td class="text-center"><button type="button" class="btn btn-primary" onclick="accept('+userID+','+invites[i].created_by+')">Accept</button></td>'+
                '<td class="text-center"><button type="button" class="btn btn-danger" onclick="decline('+userID+','+invites[i].created_by+')">Decline</button></td>'+
                '</tr>';

                notifs += newNotif;
            }
            $('#invite-list').html(notifs);
            if(inviteCount !== 0){
                toastBootstrap.show();
            }
            
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
                $('#'+trID).remove();
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

       },
       "error" : function (xhr, status, error) {
           alert("Error")
           }
       });

}