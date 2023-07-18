<?php
include "env.php";
include "models.php";
include "functions.php";

/**
 * Connection string
 */

 $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

 if ($connection->connect_errno) {
    echo "<h3>Cannot connect to database please contact your administrator</h3>";
    return;
 }
