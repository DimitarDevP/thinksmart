<?php
    include('../connect.php');

    $course_id = $_GET['course_id'];
    $owner_id = $_GET['owner_id'];

    $stmt = $db->query('SELECT * FROM user_owned_courses');
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    $is_owned = false;

    foreach($res as $row) {
        if($row->course_id == $course_id && $row->owner_id == $owner_id){
            $stmt = $db->prepare('DELETE FROM user_owned_courses WHERE owner_id = :owner_id AND course_id = :course_id');
            
            $stmt->bindParam(':owner_id', $owner_id);
            $stmt->bindParam(':course_id', $course_id);

            $stmt->execute();

            $is_owned = true;
            
            break;
        }
    }

    if(!$is_owned){
        $stmt = $db->prepare('INSERT INTO user_owned_courses (
            owner_id,
            course_id
        ) VALUES (
            :owner_id,
            :course_id
        )');

        $stmt->bindParam(':owner_id', $owner_id);
        $stmt->bindParam(':course_id', $course_id);

        $stmt->execute();

    }
?>