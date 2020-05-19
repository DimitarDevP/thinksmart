<?php
    include('../connect.php');

    $under_course_id = $_POST['under_course_id'];
    $video_name = $_POST['video_name'];
    $video_source = $_POST['video_source'];
    $content_id = $_POST['content_id'];

    $stmt = $db->query('SELECT * FROM course_content');
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    $error = false;

    foreach($res as $row) {
        if($row->under_course_id == $under_course_id && $row->content_id == $content_id){
            $error = true;
        }
    }
    if(!$error){
        $stmt = $db->prepare('INSERT INTO course_content (
            under_course_id,
            video_name,
            video_source,
            content_id
        ) VALUES (
            :under_course_id,
            :video_name,
            :video_source,
            :content_id
        )');
    
        $stmt->bindParam(':under_course_id', $under_course_id);
        $stmt->bindParam(':video_name', $video_name);
        $stmt->bindParam(':video_source', $video_source);
        $stmt->bindParam(':content_id', $content_id);
    
        $stmt->execute();
    }

?>