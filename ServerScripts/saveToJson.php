<?php
// DB url
$dbUri = '../SchedDB/';

// Parse the POST
$jsonFromClientAsString = $_POST['json'];
$dayFromClient = $_POST['day'];

// Response global
$response = new stdClass();
$response->day = $dayFromClient;

// Stringify the address to the file
if (isset($_POST['db'])){
    $fileUri = $dbUri . 'defaults/' . $dayFromClient . '.json';
}else{
    $fileUri = $dbUri . $dayFromClient . '.json';
}

$response->URI = $fileUri;


if (json_encode($jsonFromClientAsString) != null) { /* sanity check */
    $file = fopen($fileUri, 'w');
    if($file){
        $response->fwrite = fwrite($file, $jsonFromClientAsString);
        fclose($file);
        $response->status = 'OK';
    }else{
        $response->status = 'Error with writing';
    }

} else {
    $response->status = 'BAD';
}


echo json_encode($response);


?>