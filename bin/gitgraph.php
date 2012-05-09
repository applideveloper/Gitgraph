<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");
$html = implode('', file('http://github.com/'.$_GET['user'].'/'.$_GET['repo'].'/graphs/participation'));
print($html);
?>
