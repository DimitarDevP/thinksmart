<?php

    include('../connect.php');

    $username = $_POST['username'];
    $display_name = $_POST['display_name'];
    $password = md5($_POST['password']);
    $email = $_POST['email'];

    $stmt = $db->query('SELECT * FROM users');

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    $res = [];
    $error = false;

    foreach($result as $row){
    
        if($username == $row->username || $email == $row->email){
            $error = true;
            $error_type = array('error' => 'Username Or Email Already In Use');

            echo json_encode($error_type, JSON_PRETTY_PRINT);

        }
    }



    if($error == false) {
            $stmt = $db->prepare('INSERT INTO users (
                username, 
                display_name, 
                password, 
                email
            ) VALUES (
                :username, 
                :display_name, 
                :password, 
                :email
            )');
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':display_name', $display_name);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
        
        $stmt = $db->prepare('SELECT * FROM users WHERE username = :username');
        $stmt->execute(array(':username' => $username));
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

?>