<?php

    include('../connect.php');

    $stmt = $db->query('SELECT * FROM users');

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);
    
    $isGetting = isset($_GET['id']) ? true : false;

    $res = [];

    foreach($result as $row){
    
        if($isGetting) {
    
            if($row->user_id == $_GET['id']){
                $res[] = $row;
            }
    
        }else {
            $res[] = $row;
        }
    
    }

    echo json_encode($res, JSON_PRETTY_PRINT);

?>