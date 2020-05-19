<?php
    include('../connect.php');

    $res;

    if(isset($_GET['post_id'])){
        $post_id = $_GET['post_id'];
        $stmt = $db->prepare('SELECT * FROM answers WHERE under_post = :post_id');
        $stmt->execute([':post_id' => $post_id]);

        $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    echo json_encode($res, JSON_PRETTY_PRINT);

?>