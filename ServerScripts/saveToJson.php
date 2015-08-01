<?php
// DB url
$dbUri = '../SchedDB/';

// Parse the POST
$jsonFromClientAsString = $_POST['json'];
$dayFromClient = $_POST['day'];

// Response global
$response = new stdClass();
$response->day = $dayFromClient;
$response->json = $jsonFromClientAsString;

// Stringify the address to the file
$fileUri = $dbUri . $dayFromClient . '.json';

if (json_encode($jsonFromClientAsString) != null) { /* sanity check */
    $file = fopen($fileUri, 'w+');
    fwrite($file, $jsonFromClientAsString);
    fclose($file);
    $response->status = 'OK';
} else {
    $response->status = 'BAD';
}


echo json_encode($response);


?>