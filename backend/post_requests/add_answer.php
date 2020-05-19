<?php

    include('../connect.php');

    $poster_id = (int)$_POST['poster_id'];
    $under_post = (int)$_POST['under_post'];
    $answer = $_POST['answer_body'];
    $null = 0;

    if(isset($_POST['poster_id']) && isset($_POST['under_post']) && isset($_POST['answer_body'])){
        $stmt = $db->prepare('INSERT INTO answers (
            poster_id,
            under_post,
            answer
        ) VALUES (
            :poster_id,
            :under_post,
            :answer
        )');
        $stmt->execute([
            ':poster_id' => $poster_id,
            ':under_post' => $under_post,
            ':answer' => $answer,
        ]);
    }
?>