<?php

    include('../connect.php');

    $short_bio = $_POST['short_bio'];
    $bio_info = $_POST['bio_info'];
    $bio_exp = $_POST['bio_exp'];
    $user_id = $_POST['user_id'];
    $image_source = $_POST['image_source'];
    $user_id = (int)$user_id;
    $user_type = isset($_POST['instructor']) ? 'instructor' : 'student';

    echo $image_source;

    if($image_source == ''){
        $image_source = 'https://firebasestorage.googleapis.com/v0/b/thinksmart-54f50.appspot.com/o/profile_pictures%2Fdefault.jpg?alt=media&token=698c0d4d-3693-4045-8bfd-6850557bc593';
    }

    try{
        $stmt = $db->prepare("UPDATE users SET short_bio=?, bio_info=?, bio_exp=?, user_type=?, profile_image_source=? WHERE user_id=?"); 
        $stmt->bindParam(1, $short_bio);
        $stmt->bindParam(2, $bio_info);
        $stmt->bindParam(3, $bio_exp);
        $stmt->bindParam(4, $user_type);
        $stmt->bindParam(5, $image_source);
        $stmt->bindParam(6, $user_id);
        $stmt->execute();
    }catch(PDOException $e){
        echo $e->getMessage();
    }

    $stmt = $db->prepare('SELECT * FROM users WHERE user_id = :user_id');
    $stmt->execute(array(':user_id' => $user_id));
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($res, JSON_PRETTY_PRINT);

?>