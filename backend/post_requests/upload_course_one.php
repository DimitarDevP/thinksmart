<?php
    include('../connect.php');

    $course_name = $_POST['course_name'];
    $course_description = $_POST['course_description'];
    $course_thumbnail = $_POST['course_thumbnail'];
    $course_creator_id = $_POST['course_creator_id'];

    $stmt = $db->query('SELECT * FROM courses');
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    $error = false;
    foreach($res as $row){
        if($row->course_name == $course_name){
            $error = true;
        }
    }
    if(!$error){
        $stmt = $db->prepare('INSERT INTO courses (
            course_name, 
            course_description, 
            course_thumbnail, 
            course_creator_id
        ) VALUES (
            :course_name, 
            :course_description, 
            :course_thumbnail, 
            :course_creator_id
        )');
        $stmt->bindParam(':course_name', $course_name);
        $stmt->bindParam(':course_description', $course_description);
        $stmt->bindParam(':course_thumbnail', $course_thumbnail);
        $stmt->bindParam(':course_creator_id', $course_creator_id);
        $stmt->execute();
            
        $stmt = $db->prepare('SELECT * FROM courses WHERE course_thumbnail = :course_thumbnail');
        $stmt->execute(array(':course_thumbnail' => $course_thumbnail));
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    $categories = $_POST['categories'];
    $categories = explode(',', $categories);
    $course_id = $res[0]->course_id;
    foreach($categories as $category){
        $stmt = $db->prepare('INSERT INTO course_categories (category_id, course_id) VALUES (:category_id, :course_id)');
        $stmt->bindParam(':category_id', $category);
        $stmt->bindParam(':course_id', $course_id);
        $stmt->execute();
    }

    echo json_encode($res, JSON_PRETTY_PRINT);

?>