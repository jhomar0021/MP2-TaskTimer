<?php   
include "config.php";

session_start();
$sessionID = $_SESSION['logged-in-user']["id"];

if (isset($_GET['index'])) {
    
    $sql = "SELECT *,users.added_by as 
    created_by,associate.added_by as nil from tbl_users as users LEFT JOIN associate 
    as associate ON users.id = associate.user_id WHERE users.added_by = $sessionID or associate.added_by = $sessionID;";
    $results = $connection->query($sql);

    
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }


    $response = array();

    $response = createResponse(200, "Successful", "Succesful", $records);

    echo json_encode($response);
}

if (isset($_GET['show'])) {
    $request = json_decode($_GET['show']);

    $sqlCommand = "SELECT * FROM " . TBL_USERS . " WHERE id = " . $request->id;
    $results = $connection->query($sqlCommand);

    $response = array();
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $response = createResponse(200, "Successful", "Succesful", $records);

    echo json_encode($response);
}

if (isset($_POST['store'])) {
    $registerRequest = json_decode($_POST['register']);
    $response = array();

    if ($registerRequest->password != $registerRequest->confirmPassword) {
        $response = createResponse(401, "Error", "Password does not match");
    } else {
        $password = password_hash($registerRequest->password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO `tbl_users`(`fname`, `lname`, `course_id`, `username`, `password`, `is_active`) 
        VALUES ('{$registerRequest->fname}','{$registerRequest->lname}','1','{$registerRequest->username}','{$password}','1')";

        $isInserted = $connection->query($sql);

        if ($isInserted) {
            $response = createResponse(200, "Successful", "Successfully Saved");
        } else {
            $response = createResponse(300, "Error", "Error while saving user");
        }
    }

    
    echo json_encode($response);
}

if (isset($_POST['update'])) {
    $request = json_decode($_POST['update']);

    $sqlCommand = "UPDATE " . TBL_USERS . " SET 
    fname = '{$request->record->fname}',
    lname = '{$request->record->lname}',
    username = '{$request->record->username}'
    WHERE id = {$request->id}
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



if (isset($_POST['adduser'])) {
    $registerRequest = json_decode($_POST['adduser']);

    $response = array();

    if (strlen($registerRequest->fname) <1 || strlen($registerRequest->lname) <1 || strlen($registerRequest->username) <4 )
    {
        echo strlen($registerRequest->fname); 
        echo strlen($registerRequest->fname); 
        echo strlen($registerRequest->username); 
        $response = createResponse(401, "Registration Failed", "Please check all required fields are properly filled up");
        }
    else{
            $password = password_hash($registerRequest->password, PASSWORD_DEFAULT);

            $sqlDuplicate = "SELECT * FROM `tbl_users` WHERE username = '$registerRequest->username';";
            $results = $connection->query($sqlDuplicate);


            $count = $results->num_rows;

            if($count == 0){


                $fname = ucwords(strtolower($registerRequest->fname));
                $lname = ucwords(strtolower($registerRequest->lname));

                $sql = "INSERT INTO `tbl_users`(`fname`, `lname`, `account_level`, `username`, `password`, `added_by`, `is_active`) 
                VALUES ('{$fname}','{$lname}','{$registerRequest->level}','{$registerRequest->username}','{$password}','{$registerRequest->addedby}','0')";
        
                $isInserted = $connection->query($sql);
        
                if ($isInserted) {
                    $response = createResponse(200, "Successfully Registered", "You may now use your TaskTimer Account");
                    
                } else {
                    $response = createResponse(300, "Error", "Error while saving user");
                }
            }
            else{
                $response = createResponse(300, "Error", "Username already exist");
            }
        }
    echo json_encode($response);
}


if (isset($_POST['addexistinguser'])) {
    $registerRequest = json_decode($_POST['addexistinguser']);

    $response = array();


            $sqlDuplicate = "SELECT * FROM `tbl_users` WHERE username = '$registerRequest->username';";
            $results = $connection->query($sqlDuplicate);


            $count = $results->num_rows;

            $user = array();

            while ($row = $results->fetch_assoc()) {
                array_push($user, $row);
            }

            if($count == 0){
                $response = createResponse(300, "Error", "Username doesn't exist");

            }
            else{
                $sql = "INSERT INTO `associate`(`added_by`, `user_id`) 
                VALUES ('{$sessionID}','{$user[0]['id']}')";
        
                $isInserted = $connection->query($sql);
        
                if ($isInserted) {
                    $response = createResponse(200, "Successfully Registered", "",$user);
                    
                } else {
                    $response = createResponse(300, "Error", "Error while saving user");
                }
            }
        
    echo json_encode($response);
}


if (isset($_POST['destroy'])) {
    $request = json_decode($_POST['destroy']);



    $sqlCommand = "DELETE FROM tbl_users WHERE id = $request->id AND added_by = $sessionID";
    $sqlCommand2 = "DELETE FROM associate WHERE user_id = $request->id AND added_by = $sessionID";

    $isDeleted = $connection->query($sqlCommand);
    $isDeleted2 = $connection->query($sqlCommand2);

    $response = array();

    if ($isDeleted||$isDeleted2) {
        $response = createResponses(200, "Successful", "Successfully Deleted",$isDeleted,$isDeleted2);
    } else {
        $response = createResponse(300, "Error", "Error while deleting user");

    }
    
    echo json_encode($response);
}


if (isset($_POST['updatenotif'])) {
    $request = json_decode($_POST['updatenotif']);



    $sqlCommand = "SELECT tbl_users.fname,tbl_users.lname,tbl_users.id as created_by FROM associate LEFT JOIN tbl_users ON tbl_users.id = associate.added_by WHERE associate.user_id = $sessionID AND associate.status = 0;";

    

    $results = $connection->query($sqlCommand);

    $records = array();
    $response = array();


    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $response = createResponse(200, "Success", "Notification Updated", $records);

    echo json_encode($response);
}

if (isset($_POST['declineinvite'])) {
    $request = json_decode($_POST['declineinvite']);


    $sqlCommand = "DELETE FROM associate WHERE user_id = $request->user_id AND added_by = $request->created_by";



    $isDeleted = $connection->query($sqlCommand);

    $response = array();

    if ($isDeleted) {
        $response = createResponses(200, "Successful", "Successfully Deleted",$isDeleted,$isDeleted2);
    } else {
        $response = createResponse(300, "Error", "Error while deleting user");

    }
    
    echo json_encode($response);
}


if (isset($_POST['acceptinvite'])) {
    $request = json_decode($_POST['acceptinvite']);

    $sqlCommand = "UPDATE " . TBL_ASSOC . " SET 
    status = '1'
    WHERE user_id = {$request->user_id}
    AND added_by = {$request->created_by}
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


if (isset($_POST['adminpanel'])) {

    $sqlCommand = "SELECT tbl_users.id FROM tbl_users LEFT JOIN associate as associate on tbl_users.id = associate.user_id WHERE tbl_users.added_by = $sessionID AND tbl_users.is_active = 1 OR associate.status = 1 AND associate.added_by = $sessionID;";
    $users = $connection->query($sqlCommand);

    $countUsers= $users->num_rows;

    
    $sqlCommand2 = "SELECT timer_id FROM tbl_timer WHERE id = $sessionID;";
    $timers = $connection->query($sqlCommand2);

    $countTimers= $timers->num_rows;

    $sqlCommand3 = "SELECT submit FROM submit_stamp LEFT JOIN tbl_timer on submit_stamp.timer_id = tbl_timer.timer_id WHERE tbl_timer.id = $sessionID;";
    $submits = $connection->query($sqlCommand3);

    $countsubmits= $submits->num_rows;

    $sqlCommand4 = "SELECT session_start,session_end FROM tbl_timer_session LEFT JOIN tbl_timer ON tbl_timer_session.timer_id = tbl_timer.timer_id WHERE tbl_timer.id = $sessionID;";
    $timersessions = $connection->query($sqlCommand4);

    $records= array();

    while ($row = $timersessions->fetch_assoc()) {
        array_push($records, $row);
    }


    $countSubmits = $submits->num_rows;
    $response = createResponses(200, "Success", "Notification Updated", $countUsers,$countTimers,$countsubmits,$records);


    echo json_encode($response);
}
