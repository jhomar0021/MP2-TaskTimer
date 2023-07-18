<?php

$sqlDuplicate = "SELECT * FROM `tbl_users` WHERE /replace with db to check/ = 'replace with data to compare';";
$results = $connection->query($sqlDuplicate);


$count = $results->num_rows;

echo $count;

if ($count == 0){}
else{}

