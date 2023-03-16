<?php

// criando conexão com o servidor mysql
$mysqli = mysqli_connect("localhost", "root", "");

// selecionando o bd
mysqli_select_db($mysqli, "php-canex");

?>