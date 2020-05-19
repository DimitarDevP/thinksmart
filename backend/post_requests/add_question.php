<?php

    include('../connect.php');

    $title = $_POST['question_title'];
    $body = $_POST['question_body'];
    $poster_id = $_POST['poster_id'];
    $null = 0;
    $stmt = $db->prepare('INSERT INTO user_questions (
        poster_id,
        question_title,
        question_body,
        upvotes,
        downvotes,
        solved
    ) VALUES (
        :poster_id,
        :question_title,
        :question_body,
        :upvotes,
        :downvotes,
        :solved
    )');
    $stmt->bindParam(':poster_id', $poster_id);
    $stmt->bindParam(':question_title', $title);
    $stmt->bindParam(':question_body', $body);
    $stmt->bindParam(':upvotes', $null);
    $stmt->bindParam(':downvotes', $null);
    $stmt->bindParam(':solved', $null);
    $stmt->execute();

    $stmt = $db->prepare('SELECT * FROM user_questions WHERE poster_id = :poster_id AND question_title = :question_title');
    $stmt->bindParam(':poster_id', $poster_id);
    $stmt->bindParam(':question_title', $title);
    $stmt->execute();

    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    echo json_encode($res, JSON_PRETTY_PRINT);

?>