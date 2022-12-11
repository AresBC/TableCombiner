<input name="pw">
<input type="submit">

<?php

if ($_GET['pw'] !== '123') die;


ob_start();
require 'views/table.php';
$view = ob_get_clean();

ob_start();
require 'templates/main.php';
$template = ob_get_clean();



echo $template;