<?php
    include('../connect.php');


    $owner_id = $_GET['owner_id'];
    $course_id = $_GET['course_id'];
    $found = false;

    $stmt = $db->query('SELECT * FROM user_owned_courses');

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    foreach($result as $row){
        if($row->owner_id == $owner_id && $row->course_id == $course_id){
            $found = true;
            break;
        }
    }

    $response = array("course_found" => $found);

    echo json_encode($response, JSON_PRETTY_PRINT);

?>