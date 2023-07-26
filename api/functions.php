<?php
function createResponse($status, $title, $description, $data = array()) {
    $response = array();
    $response["status"] = $status;
    $response["description"] = $description;
    $response["title"] = $title;
    $response["data"] = $data;
    
    return $response;
}


function createResponses($status, $title, $description, $data1 = array(), $data2 = array(), $data3 = array(), $data4 = array()) {
    $response = array();
    $response["status"] = $status;
    $response["description"] = $description;
    $response["title"] = $title;
    $response["data1"] = $data1;
    $response["data2"] = $data2;
    $response["data3"] = $data3;
    $response["data4"] = $data4;
    
    return $response;
}