<?php
include "config.php";

session_start();

$createdBy = $_SESSION['logged-in-user']["id"];

if (isset($_GET['index'])) {
    $sqlCommand = "SELECT * FROM `db_timer`.`tbl_timer` WHERE `id` = $createdBy;";
    $results = $connection->query($sqlCommand);

    $sqlCommand2 = "SELECT * FROM `db_timer`.`tbl_timer_session` WHERE `user_id` = $createdBy;";
    $results2 = $connection->query($sqlCommand2);

    $sqlCommand3 = "SELECT * FROM `db_timer`.`submit_stamp` WHERE `user_id` = $createdBy;";
    $results3 = $connection->query($sqlCommand3);

    $response = array();
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $records2 = array();

    while ($row = $results2->fetch_assoc()) {
        array_push($records2, $row);
    }

    $records3 = array();

    while ($row = $results3->fetch_assoc()) {
        array_push($records3, $row);
    }

    $response = createResponses(200, "Successful", "Succesful", $records,$records2,$records3);

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
        VALUES ('{$timerName}','{$createdBy}')";
    
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
