<?php

    require "conn.php";
    
    $data = json_decode(file_get_contents('php://input'),true);
    $validation = checkObj($data,['user','email','password']);

    try {
        if(!filter_var($data['email'],FILTER_VALIDATE_EMAIL)){
            $response['ok'] = false;
            $response['message'] = 'E-mail inválido';
        }else{
            if(!$validation){
                $response['ok'] = false;
                $response['message'] = 'Preencha todas as informações';
            }else{
                $sql = "INSERT INTO user (name, email, password) VALUES (:name, :email, :password)";
                $qry = $conn->prepare($sql);
                $qry->bindParam(':name',$data['name'],PDO::PARAM_STR);
                $qry->bindParam(':email',$data['email'],PDO::PARAM_STR);
                $qry->bindParam(':password',$data['password'],PDO::PARAM_STR);
                $qry->execute();
                $response['ok'] = true;
                $response['message'] = 'Usuário criado com sucesso';
            }
        }
    } catch (PDOException $error) {
        $response['ok'] = false;
        $response['message'] = 'Algo deu errado com a inserção';
        $response['error'] = $error->getMessage();
    }

    echo json_encode($response);

?>