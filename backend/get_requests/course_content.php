<?php
    include('../connect.php');

    $course_id = $_GET['course_id']; // .php?user_id=42?user_name="Username1" 

    $stmt = $db->prepare('SELECT * FROM course_content WHERE under_course_id = :course_id ORDER BY content_id');
    $stmt->bindParam(':course_id', $course_id);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    echo json_encode($result, JSON_PRETTY_PRINT);

?>

.then (
    let res = res.data;
    ".php?car_type="audi"&model="a3""
    res.map(item => {
        loade.load(item.stlname)
    })
)