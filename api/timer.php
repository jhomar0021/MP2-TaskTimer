<?php
include "config.php";

if (isset($_POST['submits'])) {
    $timestamp = json_decode($_POST['submits']);
    $response = array();
    echo $timestamp->timer_id;


    $sql = "INSERT INTO `submit_stamp`(`submit`, `timer_id`, `time_stamp`) VALUES ('1','{$timestamp->timer_id}','{$timestamp->time_stamp}');";


    $isInserted = $connection->query($sql);

    if ($isInserted) {
        $response = createResponse(200, "Successful", "Successfully Saved",$timestamp);
    } else {
        $response = createResponse(300, "Error", "Error while saving user");
    }

    
    echo json_encode($response);
};

if (isset($_POST['timersessionstart'])) {
    $sessionRecord = json_decode($_POST['timersessionstart']);
    $response = array();
    echo $sessionRecord->timer_id;

    /**
     * Please change column names and values
     */
    $sql = "INSERT INTO `tbl_timer_session`(`session_start`, `timer_id`, `session_start_value`, `id`) VALUES ('{$sessionRecord->session_start}','{$sessionRecord->timer_id}', '{$sessionRecord->start_value}','{$sessionRecord->id}');";


    $isInserted = $connection->query($sql);

    if ($isInserted) {
        $response = createResponse(200, "Successful", "Successfully Saved",$sessionRecord);
    } else {
        $response = createResponse(300, "Error", "Error while saving user");
    }

    
    echo json_encode($response);
};

if (isset($_POST['timersessionend'])) {
    $sessionRecord = json_decode($_POST['timersessionend']);
    $response = array();

    $sqlCommand = "UPDATE `tbl_timer_session` SET `session_end` = '{$sessionRecord->session_end}', `session_end_value` = '{$sessionRecord->end_value}' WHERE `tbl_timer_session`.`id` = {$sessionRecord->id};";
    $isUpdated = $connection->query($sqlCommand);

    if ($isUpdated) {
        $response = createResponse(200, "Successful", "Successfully Saved",$sessionRecord);
    } else {
        $response = createResponse(300, "Error", "Error while saving user");
    }

    
    echo json_encode($response);
};
