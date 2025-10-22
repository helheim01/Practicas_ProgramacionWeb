<?php
// ==========================================
// INICIO DE SESIÓN
// ==========================================

// Inicia el sistema de sesiones para acceder al carrito almacenado
// session_start() permite usar $_SESSION como almacenamiento persistente entre peticiones
session_start();

// ==========================================
// CATÁLOGO DE PRODUCTOS
// ==========================================

// Vuelvo a definir el array asociativo idéntico al de carrito.php para mantener consistencia
// Clave: ID numérico del producto | Valor: nombre legible del producto
$productos = [
  1 => "Producto A",      // ID 1 = Producto A
  2 => "Producto B",      // ID 2 = Producto B
  3 => "Producto C"       // ID 3 = Producto C
];

// ==========================================
// VARIABLES PARA RESPUESTA
// ==========================================

// Inicialización de variables para construir la respuesta JSON
$items = []; //contendrá los productos con su nombre y cantidad
$totalItems = 0; // contará la suma total de productos en carrito

// ==========================================
// CONSTRUCCIÓN DE ITEMS DEL CARRITO
// ==========================================

// Verifica si existe carrito en la sesión
if (isset($_SESSION['carrito'])) {
    
    // Itera sobre cada producto en el carrito
    // foreach: $id = clave del array (ID del producto), $cantidad = valor (cantidad guardada en la session)
    foreach ($_SESSION['carrito'] as $id => $cantidad) { 
        
        // Construyo objeto item con información completa
        $items[] = [
            "nombre" => $productos[$id],   // Busca nombre según ID en $productos
            "cantidad" => $cantidad        // Copia la cantidad de ese producto en carrito
        ];
        
        // Sumo esta cantidad al total general
        $totalItems += $cantidad;
    }
}
// Si no existe $_SESSION['carrito'], $items queda [] y $totalItems = 0

// ==========================================
// RESPUESTA EN FORMATO JSON
// ==========================================

// Genera respuesta JSON que recibirá el script
echo json_encode([ // json_encode convierte arrays PHP a JSON válido
    "totalItems" => $totalItems,  // Total acumulado de productos
    "items" => $items             // Detalle de cada producto en carrito
]);

// ==========================================
// EJEMPLOS DE RESPUESTA
// ==========================================

// Caso 1 - Carrito vacío:
// {"totalItems":0,"items":[]}

// Caso 2 - Carrito con productos:
// {
//   "totalItems": 4,
//   "items": [
//     {"nombre": "Producto A", "cantidad": 2},
//     {"nombre": "Producto B", "cantidad": 1},
//     {"nombre": "Producto C", "cantidad": 1}
//   ]
// }
?>
