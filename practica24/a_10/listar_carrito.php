<?php
session_start();

$productos = [
  1 => "Producto A",
  2 => "Producto B",
  3 => "Producto C"
];

$items = [];
$totalItems = 0;

if (isset($_SESSION['carrito'])) {
    foreach ($_SESSION['carrito'] as $id => $cantidad) { //id: clave  cantidad:valor
        $items[] = [
            "nombre" => $productos[$id],
            "cantidad" => $cantidad
        ];
        $totalItems += $cantidad;
    }
}

echo json_encode([
    "totalItems" => $totalItems,
    "items" => $items
]);