<?php

    include('../connect.php');
    $is_getting = false;
    if(isset($_GET['question_id'])){
        $question_id = $_GET['question_id'];
        $is_getting = true;
    }

    if($is_getting){
        $stmt = $db->prepare('SELECT * FROM user_questions WHERE question_id = :question_id');
        $stmt->bindParam('question_id', $question_id);
        $stmt->execute();

        $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    }else {
        $stmt = $db->query('SELECT * FROM user_questions ORDER BY question_id DESC');
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    echo json_encode($res, JSON_PRETTY_PRINT);

?>