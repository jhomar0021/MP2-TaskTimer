<?php
session_start();
include "config.php";

if (isset($_POST['getLoggedUser'])) {

    if (isset($_SESSION['logged-in-user'])) {
        $response = createResponse(200, "Succesful", "Successful", $_SESSION['logged-in-user']);

        $sqlCommand = "UPDATE " . TBL_USERS . " SET 
        is_online = '1'
        WHERE id = {$_SESSION['logged-in-user']["id"]}
        ";
        $isUpdated = $connection->query($sqlCommand);

    } else {
        $response = createResponse(401, "Forbidden", "Error Accessing Page");
    }
    
    echo json_encode($response);
}

if (isset($_POST['logout'])) {

    $sqlCommand = "UPDATE " . TBL_USERS . " SET 
    is_online = '0'
    WHERE id = {$_SESSION['logged-in-user']["id"]}
    ";
    $isUpdated = $connection->query($sqlCommand);

    session_destroy();

    $response = createResponse(200, "Succesful", "Successfully Logout");

    echo json_encode($response);
}



if (isset($_POST['update'])) {
    $updaterRequest = json_decode($_POST['update']);
    $response = array();

        $sqlDuplicate = "SELECT * FROM `tbl_users` WHERE username = '$updaterRequest->username';";
        $results = $connection->query($sqlDuplicate);


        $count = $results->num_rows;

        if($count == 0){

            $sqlCommand = "UPDATE " . TBL_USERS . " SET 
            fname = '{$updaterRequest->fname}',
            lname = '{$updaterRequest->lname}',
            username = '{$updaterRequest->username}'
            WHERE id = {$updaterRequest->id}
            ";
            $isUpdated = $connection->query($sqlCommand);


            $isUpdated = $connection->query($sqlCommand);
        
            $response = array();
        
            if ($isUpdated) {
                $response = createResponse(200, "Successful", "Successfully Updated user");
            } else {
                $response = createResponse(300, "Error", "Error while updating user");
            }
    }
        
        else{
            $response = createResponse(300, "Error", "Username already exist");
        }

  
    echo json_encode($response);
}




if (isset($_FILES['my_image'])) {

    $img_name = $_FILES['my_image']['name'];
    $img_size = $_FILES['my_image']['size'];
    $tmp_name = $_FILES['my_image']['tmp_name'];
    $error = $_FILES['my_image']['error'];



    if($error === 0){

        $img_ex = pathinfo($img_name, PATHINFO_EXTENSION);

        $img_ex_lc = strtolower($img_ex);

        $allowed_exs = array("jpg", "png", "jpeg", "gif");


        if(in_array($img_ex_lc, $allowed_exs)){

            $userId =$_SESSION['logged-in-user']["id"];
            $new_img_name =  $userId.'.'.$img_ex_lc;

            $img_upload_path = "../upload/".$new_img_name;

            if(file_exists("../upload/".$userId.".jpg")){unlink("../upload/".$userId.".jpg");}
            if(file_exists("../upload/".$userId.".png")){unlink("../upload/".$userId.".png");}
            if(file_exists("../upload/".$userId.".jpeg")){unlink("../upload/".$userId.".jpeg");}
            if(file_exists("../upload/".$userId.".gif")){unlink("../upload/".$userId.".gif");}

            
            move_uploaded_file($tmp_name, $img_upload_path);

            $sqlCommand = "UPDATE " . TBL_USERS . " SET 
            image_path = '../$img_upload_path'
            WHERE id = {$userId}
            ";
            $isUpdated = $connection->query($sqlCommand);
        
            $response = array();
        
            if ($isUpdated) {
                $_SESSION['logged-in-user']["image_path"] = "../".$img_upload_path;
                $response = createResponse(200, "Successful", "Successfully Updated user",$new_img_name);
            } else {
                $response = createResponse(300, "Error", "Error while updating user");
            }


        }
        else{
            $response = createResponse(300, "Error", "file not supported");
        }
        
    }
    else{
        $response = createResponse(300, "Error", "Error While Uploading");
    }
    echo json_encode($response);
}