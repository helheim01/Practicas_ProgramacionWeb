<?php
session_start(); //Inicia el sistema de sesiones para poder acceder y manipular $_SESSION
session_unset(); //Limpia todas las variables de sesión del usuario actual
session_destroy(); //Destruye completamente la sesión actual
header("Location: login.php"); //Redirige al login
exit;
?>