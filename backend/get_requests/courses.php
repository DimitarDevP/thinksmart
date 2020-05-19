<?php

    include('../connect.php');

    $stmt = $db->query('SELECT * FROM courses');

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    $res = [];

    foreach($result as $row){
    
        if(isset($_GET['course_id'])){
            if($row->course_id == $_GET['course_id']){
                $res[] = $row;
            }
        } else if (isset($_GET['creator_id'])){
            if($row->course_creator_id == $_GET['creator_id']){
                $res[] = $row;
            }
        } else {
            $res[] = $row;
        }
    
    }

    echo json_encode($res, JSON_PRETTY_PRINT);

?>