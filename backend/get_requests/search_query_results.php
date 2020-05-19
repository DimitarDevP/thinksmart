<?php
    include('../connect.php');

    $query_string = $_GET['query_string'];
    $query_string = explode('-', $query_string);
    $all_results = [];

    foreach($query_string as $query){
        $stmt = $db->prepare('SELECT * FROM course_categories WHERE category_id = :query');
        $stmt->bindParam(':query', $query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_OBJ);
        
        $all_results = array_merge($all_results, $results);
    }

    $course_ids = [];

    foreach($all_results as $result){
        array_push($course_ids, $result->course_id);
    }

    $course_ids = array_unique($course_ids);

    $response = [];

    foreach($course_ids as $course_id){
        $stmt = $db->prepare('SELECT * FROM courses WHERE course_id = :course_id');
        $stmt->bindParam(':course_id', $course_id);
        $stmt->execute();
        $course = $stmt->fetch(PDO::FETCH_OBJ);

        array_push($response, $course);
    }

    echo json_encode($response, JSON_PRETTY_PRINT);
?>