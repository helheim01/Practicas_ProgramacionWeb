<?php
session_start();

// Productos disponibles 
$productos = [
  1 => "Producto A",
  2 => "Producto B",
  3 => "Producto C"
];

if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);
    if (isset($productos[$id])) {
        if (!isset($_SESSION['carrito'][$id])) {
            $_SESSION['carrito'][$id] = 0;
        }
        $_SESSION['carrito'][$id]++;
    }
}

echo "OK";