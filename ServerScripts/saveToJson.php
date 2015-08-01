<?php
// DB url
$dbUri = '../SchedDB/';

// Parse the POST
$jsonFromClientAsString = $_POST['json'];
$dayFromClient = $_POST['day'];

// Stringify the address to the file
$fileUri = $dbUri . $dayFromClient . '.json';

if (json_encode($jsonFromClientAsString) != null) { /* sanity check */
    $file = fopen('test.json', 'w+');
    fwrite($file, $jsonFromClientAsString);
    fclose($file);
} else {
    // handle error
}


echo json_encode('{test:"'.$fileUri.'"}');


?>