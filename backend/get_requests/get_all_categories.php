<?php

    include('../connect.php');

    $stmt = $db->query('SELECT * FROM categories');

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    echo json_encode($result, JSON_PRETTY_PRINT);

?>