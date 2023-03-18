<?php

// pagina de listar não atualiza, forçando a apertar F5 para ver lista atualizada
// esse codigo abaixo força o navegador a não fazer cache para evitar esse problema
header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Connection: close");

// criando conexão com o servidor mysql
$mysqli = mysqli_connect("localhost", "root", "");

// selecionando o bd
mysqli_select_db($mysqli, "php-canex");

?>