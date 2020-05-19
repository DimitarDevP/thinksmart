<?php

    include('../connect.php');

    $stmt = $db->query('SELECT * FROM users');

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    $res = [];

    $username = $_POST['username'];
    $password = md5($_POST['password']);

    foreach($result as $row){
        if($row->username == $username && $row->password == $password){
            $res[] = $row;
        }
    }

    echo json_encode($res, JSON_PRETTY_PRINT);
?>
