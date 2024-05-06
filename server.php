<?php

$carbonaraJson = file_get_contents('carbonara.json');
// var_dump($carbonaraJson);
$carbonara = json_decode($carbonaraJson, true);
$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'GET') {
    
    if (isset($_POST['id'], $_POST['text'], $_POST['done'])) {
        $carbonaraIns = [
            'id' => (int)$_POST['id'],
            'text' => $_POST['text'],
            'done' => $_POST['done'] === 'true',
        ];
        $carbonara[] = $carbonaraIns;
    }
    $carbonaraJson = json_encode($carbonara, JSON_PRETTY_PRINT);
    file_put_contents('carbonara.json', $carbonaraJson);
}

header('Content-Type: application/json');
echo $carbonaraJson;