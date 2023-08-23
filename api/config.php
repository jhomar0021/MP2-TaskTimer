<?php

include "../accounts/env.php";
include "models.php";
include "functions.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 * Connection string
 */

 $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

 if ($connection->connect_errno) {
    echo "<h3>Cannot connect to database please contact your administrator</h3>";
    return;
 }
