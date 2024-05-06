<?php

$carbonaraJson = file_get_contents('carbonara.json');
// var_dump($carbonaraJson);

header('Content-Type: application/json');
echo $carbonaraJson;