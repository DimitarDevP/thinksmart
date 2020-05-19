<?php
    include('../connect.php');

    $image_source = $_POST['image_source'];
    $user_id = (int)$_POST['user_id'];

    var_dump($_POST);

    try{
        $stmt = $db->prepare('UPDATE users SET profile_image_source =? WHERE user_id=?');
        $stmt->bindParam(1, $image_source);
        $stmt->bindParam(2, $user_id);
        $stmt->execute();
    }catch(PDOException $e){
        echo $e->getMessage();
    }

?>