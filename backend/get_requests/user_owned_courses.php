<?php
    include('../connect.php');

    $stmt = $db->query('SELECT * FROM user_owned_courses');

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);
    
    $isGetting = isset($_GET['owner_id']) ? true : false;

    $res = [];

    foreach($result as $row){
    
        if($isGetting) {
    
            if($row->owner_id == $_GET['owner_id']){
                $course_id = $row->course_id;
                $stmt = $db->prepare('SELECT * FROM courses WHERE course_id = :course_id');
                $stmt->bindParam(':course_id', $course_id, PDO::PARAM_STR);
                $stmt->execute();

                $res[] = $stmt->fetch(PDO::FETCH_OBJ);
            }

        }else {
            $course_id = $row->course_id;
            $stmt = $db->prepare('SELECT * FROM courses WHERE course_id = :course_id');
            $stmt->bindParam(':course_id', $course_id, PDO::PARAM_STR);
            $stmt->execute();

            $res[] = $stmt->fetch(PDO::FETCH_OBJ);
        }
    }

    echo json_encode($res, JSON_PRETTY_PRINT);
?>