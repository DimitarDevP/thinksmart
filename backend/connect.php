<?php

    try {
        $db = new PDO(
            'mysql:host=localhost;
             dbname=thinksmart;
             charset=utf8', 
            'root', 
            'fuckingpassword',
            array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            )
        );
    } catch(Exception $e) {
        echo $e;
    }

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Methods: UPDATE');
    header('Access-Control-Allow-Headers: Content-Type'); 

?>