<?php
session_start();

// Borra solo el carrito, no toda la sesión
unset($_SESSION['carrito']);

echo "OK";