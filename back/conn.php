<?php

    $conn = new PDO('mysql:host=localhost;dbname=importing;charset=utf8','root','');

    function checkObj($obj,$requiredData){
        foreach ($obj as $key => $value) {
            if(in_array($key,$requiredData)){
                if(empty($value)){
                    return false;
                }
            }
        }
        return true;
    }

    $response = array(
        'ok' => '',
        'message' => ''
    );

?>