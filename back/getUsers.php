<?php

    require "conn.php";
    $offset = (isset($_GET['offset']) ? ($_GET['offset']) : (0));
    $limit = (isset($_GET['limit']) ? ($_GET['limit']): (10));
    $regex = '/^\d+$/';
    if(preg_match($regex,$limit) && preg_match($regex,$offset)){
        $validation = true;
    }else{
        $validation = false;
    }
    
    try {
        if(!$validation){
            $response['ok'] = false;
            $response['message'] = 'início ou limite inválidos';
        }else{
            $sql = "SELECT id, name, email, created_at FROM user ORDER BY id LIMIT :limit OFFSET :offset";
            $qry = $conn->prepare($sql);
            $qry->bindParam(':offset',$offset,PDO::PARAM_INT);
            $qry->bindParam(':limit',$limit,PDO::PARAM_INT);
            $qry->execute();
            $response['users'] = $qry->fetchAll(PDO::FETCH_OBJ);
            $response['ok'] = true;
            $response['message'] = 'Usuarios retornados com sucesso';
        }
    } catch (PDOException $error) {
        $response['ok'] = false;
        $response['message'] = 'Something went wrong with the query';
        $response['error'] = $error->getMessage();
    }

    echo json_encode($response);

?>