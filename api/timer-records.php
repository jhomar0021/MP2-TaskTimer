<?php
include "config.php";

session_start();

$sessionID = $_SESSION['logged-in-user']["id"];
$sessionLevel = $_SESSION['logged-in-user']["account_level"];

if (isset($_GET['index'])) {
    if($sessionLevel == 3){
        $sqlCommand = "SELECT * FROM `timer_access` WHERE `user` = $sessionID;";
        $results = $connection->query($sqlCommand);
        $delete = false;
    }
    else{
        $sqlCommand = "SELECT * FROM `tbl_timer` WHERE `id` = $sessionID;";
        $results = $connection->query($sqlCommand);

        $sqlCommand4 = "SELECT * FROM `timer_access` WHERE `user` = $sessionID;";
        $results4 = $connection->query($sqlCommand4);

        $delete = true;
    }

    $sqlCommand2 = "SELECT * FROM `tbl_timer_session` WHERE `user_id` = $sessionID;";
    $results2 = $connection->query($sqlCommand2);

    $sqlCommand3 = "SELECT * FROM `submit_stamp` WHERE `user_id` = $sessionID;";
    $results3 = $connection->query($sqlCommand3);

    $response = array();
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $getname= array();

    while ($row = $results4->fetch_assoc()) {
        array_push($getname, $row);
    }
    $nameget = array();

    for ($i = 0; $i < count($getname) ; $i++) {

        if(count($getname) !==0){
        $getnameID = $getname[$i]['timer_id'];
        $sql = "SELECT * FROM tbl_timer WHERE timer_id = $getnameID;";
        $gotname = $connection->query($sql);
        
        while ($row = $gotname->fetch_assoc()) {
            array_push($nameget, $row);
        }
        
        $getname[$i]['timer_name'] = $nameget[$i]['timer_name'];
        
        array_push($records, $getname[$i]);
        }

      }

    $records2 = array();

    while ($row = $results2->fetch_assoc()) {
        array_push($records2, $row);
    }

    $records3 = array();

    while ($row = $results3->fetch_assoc()) {
        array_push($records3, $row);
    }

    $response = createResponses(200, "Successful", "Succesful", $records,$records2,$records3,$delete);

    echo json_encode($response);
}




if (isset($_GET['admin-index'])) {

    $sqlCommand = "SELECT * FROM `tbl_timer` WHERE `id` = $sessionID;";
    $results = $connection->query($sqlCommand);

    $sqlCommand2 = "SELECT * FROM `tbl_users` WHERE `added_by` = $sessionID AND  `is_active` = 1;";
    $results2 = $connection->query($sqlCommand2);

    $sqlCommandsub2 = "SELECT * FROM `associate` WHERE `added_by` = $sessionID AND  `status` = 1 ;";
    $subresult = $connection->query($sqlCommandsub2);

    $sqlCommand3 = "SELECT * FROM `timer_access` WHERE `admin` = $sessionID;";
    $results3 = $connection->query($sqlCommand3);




    $response = array();
    $timers = array();

    while ($row = $results->fetch_assoc()) {
        array_push($timers, $row);
    }

    $users = array();

    while ($row = $results2->fetch_assoc()) {
        array_push($users, $row);
    }

    $subusers= array();

    while ($row = $subresult->fetch_assoc()) {
        array_push($subusers, $row);
    }


    for ($i = 0; $i < count($subusers) ; $i++) {

        $userid = $subusers[$i]['user_id'];


        $sqlCommandsub3 = "SELECT * FROM `tbl_users` WHERE `id` = $userid;";
        $results2 = $connection->query($sqlCommandsub3);

        while ($row = $results2->fetch_assoc()) {
            array_push($users, $row);
        }
      }

    $timersessions = array();

    for ($i = 0; $i < count($timers) ; $i++) {

        $timerID = $timers[$i]['timer_id'];
        $sqlCommand4 = "SELECT * FROM `tbl_timer_session` WHERE `timer_id` = $timerID;";
        $results4 = $connection->query($sqlCommand4);

        while ($row = $results4->fetch_assoc()) {
            array_push($timersessions, $row);
        }
      }

      $submits = array();

      for ($i = 0; $i < count($timers) ; $i++) {

        $timerID = $timers[$i]['timer_id'];
        $sqlCommand5 = "SELECT * FROM `submit_stamp` WHERE `timer_id` = $timerID;";
        $results5 = $connection->query($sqlCommand5);

        while ($row = $results5->fetch_assoc()) {
            array_push($submits, $row);
        }
      }
    $response = createResponses(200, "Successful", "Succesful", $timers,$users,$timersessions,$submits );
    echo json_encode($response);
}



if (isset($_GET['getdataspan'])) {

    $dataRequest = json_decode($_GET['getdataspan']);

    $sql1 = "SELECT * FROM `tbl_timer_session` WHERE `session_start` BETWEEN '$dataRequest->session_start' AND '$dataRequest->session_end' AND `user_id` = '$sessionID' AND `timer_id` = '$dataRequest->timer_id' OR `session_end` BETWEEN '$dataRequest->session_start' AND '$dataRequest->session_end' AND `user_id` = '$sessionID' AND `timer_id` = '$dataRequest->timer_id';";
    $results = $connection->query($sql1);

    $response = array();

    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $sql2 = "SELECT * FROM `submit_stamp` WHERE `time_stamp` BETWEEN '$dataRequest->session_start' AND '$dataRequest->session_end' AND `timer_id` = $dataRequest->timer_id AND `user_id` = '$sessionID';";
    $results2 = $connection->query($sql2);

    $records2 = array();

    while ($row = $results2->fetch_assoc()) {
        array_push($records2, $row);
    }

    $response = createResponses(200, "Successful", "Succesful", $records,$records2);

    echo json_encode($response);
}


if (isset($_GET['getdataspanadmin'])) {

    $dataRequest = json_decode($_GET['getdataspanadmin']);

    $sql1 = "SELECT * FROM `tbl_timer_session` WHERE `session_start` BETWEEN '$dataRequest->session_start' AND '$dataRequest->session_end' AND `timer_id` = '$dataRequest->timer_id' OR `session_end` BETWEEN '$dataRequest->session_start' AND '$dataRequest->session_end' AND `timer_id` = '$dataRequest->timer_id';";
    $results = $connection->query($sql1);

    $response = array();

    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $sql2 = "SELECT * FROM `submit_stamp` WHERE `time_stamp` BETWEEN '$dataRequest->session_start' AND '$dataRequest->session_end' AND `timer_id` = $dataRequest->timer_id;";
    $results2 = $connection->query($sql2);

    $records2 = array();

    while ($row = $results2->fetch_assoc()) {
        array_push($records2, $row);
    }

    $response = createResponses(200, "Successful", "Succesful", $records,$records2);

    echo json_encode($response);
}


if (isset($_POST['store'])) {

    $registerRequest = json_decode($_POST['store']);
    $response = array();
    if($registerRequest->timer_name == "" || $registerRequest->timer_name == null ){
        $response = createResponse(300, "error", "Use Valid Inputs");
    }
    else{

        $timerName = ucwords($registerRequest->timer_name);
        
        $sql = "INSERT INTO ". TBL_TIMER. " (`timer_name`, `id`)
        VALUES ('{$timerName}','{$sessionID}')";
    
        $isInserted = $connection->query($sql);
    
        if ($isInserted) {
            $response = createResponse(200, "Successful", "Successfully Saved");
        } else {
            $response = createResponse(300, "Error", "Error while saving user");
        }
    }

    echo json_encode($response);
}

if (isset($_POST['destroy'])) {
    $request = json_decode($_POST['destroy']);


    $sqlCommand = "DELETE FROM " . TBL_TIMER . " WHERE timer_id = '" . $request->timer_id . "'";;
    $isDeleted = $connection->query($sqlCommand);

    $response = array();

    if ($isDeleted) {
        $response = createResponse(200, "Successful", "Successfully Deleted");
    } else {
        $response = createResponse(300, "Error", "Error while deleting user");
    }

    echo json_encode($response);
}


if (isset($_POST['remove'])) {
    $request = json_decode($_POST['remove']);


    $sqlCommand = "DELETE FROM `timer_access` WHERE `user` = $sessionID AND `timer_id` = $request->timer_id;";
    $isDeleted = $connection->query($sqlCommand);
 

    $response = array();

    if ($isDeleted) {
        $response = createResponse(200, "Successful", "Successfully Deleted");
    } else {
        $response = createResponse(300, "Error", "Error while deleting user");
    }

    echo json_encode($response);
}


if (isset($_GET['showsessionvalue'])) {
    $request = json_decode($_GET['showsessionvalue']);

    $sql = "SELECT * FROM `tbl_timer_session` WHERE `session_end` BETWEEN '$request->from_time' AND '$request->to_time' AND `user_id` = $request->user_id;";

    $sql2 = "SELECT * FROM `submit_stamp` WHERE `time_stamp` BETWEEN '$request->from_time' AND '$request->to_time' AND `user_id` = $request->user_id;";

    $results = $connection->query($sql);
    $results2 = $connection->query($sql2);


    $response = array();
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $count = $results2->num_rows;

    $response = createResponses(200, "Successful", "values are updated", $records,$count);

    echo json_encode($response);
}


if (isset($_POST['update'])) {
    $request = json_decode($_POST['update']);

    $newName = ucwords(strtolower($request->record->timer_name));

    $sqlCommand = "UPDATE " . TBL_TIMER . " SET 
    timer_name = '{$newName}'
    WHERE timer_id = {$request->id}
    ";
    $isUpdated = $connection->query($sqlCommand);

    $response = array();

    if ($isUpdated) {
        $response = createResponse(200, "Successful", "Successfully Updated user");
    } else {
        $response = createResponse(300, "Error", "Error while updating user");
    }

    echo json_encode($response);
}


if (isset($_GET['manageusers'])){

    $timerID = json_decode($_GET['manageusers']);

    $timerID = $timerID->timer_id ;

    $sqlCommand = "SELECT * FROM `tbl_users` WHERE `added_by` = $sessionID AND `is_active` = 1 ;";
    $results = $connection->query($sqlCommand);

    $sqlCommand2 = "SELECT * FROM `associate` WHERE `added_by` = $sessionID AND `status` = 1 ;";
    $results2 = $connection->query($sqlCommand2);

    $response = array();
    $users = array();

    $filter = array();

    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }

    $associates  = array();

    while ($row = $results2->fetch_assoc()) {
        array_push($associates , $row);
    }

    for ($i = 0; $i < count($associates) ; $i++) {

        $associatesID = $associates[$i]['user_id'];
        $sqlCommandassociatesID = "SELECT * FROM `tbl_users` WHERE `id` = $associatesID;";
        $addedassociate = $connection->query($sqlCommandassociatesID);

        while ($row = $addedassociate->fetch_assoc()) {
            array_push($users, $row);
        }
      }


      for ($i = 0; $i < count($users) ; $i++) {

        $userID = $users[$i]['id'];

        $checkAccess = "SELECT * FROM `timer_access` WHERE `user` = $userID AND  `timer_id` = $timerID;";
        $access = $connection->query($checkAccess);
        
        $count = $access->num_rows;

        if($count == 0 ){
            $users[$i]['is_active'] = 1;
        }
        else{
            $users[$i]['is_active']= 2;
        }

        array_push($filter, $users[$i]);
      }

    $response = createResponse(200, "Successful", "Succesful", $filter);

    echo json_encode($response);
}


if (isset($_POST['addaccess'])) {

    $registerRequest = json_decode($_POST['addaccess']);
    $response = array();
    
    $timerID = $registerRequest->timer_id ;
    $userID = $registerRequest->user_id ;
    $timerName = $registerRequest->timer_name ;
    
    $sql = "INSERT INTO `timer_access` (`admin`, `user`, `timer_id`, `timer_name`) VALUES ('{$sessionID}','{$userID}', '{$timerID}', '{$timerName}');";

    $isInserted = $connection->query($sql);

    if ($isInserted) {
        $response = createResponse(200, "Successful", "Successfully Saved");
    } else {
        $response = createResponse(300, "Error", "Error while saving user");
    }


    echo json_encode($response);
}


if (isset($_POST['removeaccess'])) {

    $registerRequest = json_decode($_POST['removeaccess']);
    $response = array();
    
    $timerID = $registerRequest->timer_id ;
    $userID = $registerRequest->user_id ;
    
    $sql = "DELETE FROM `timer_access` WHERE user = $userID AND timer_id = $timerID;";

    $isInserted = $connection->query($sql);

    if ($isInserted) {
        $response = createResponse(200, "Successful", "Successfully Saved");
    } else {
        $response = createResponse(300, "Error", "Error while saving user");
    }


    echo json_encode($response);
}
