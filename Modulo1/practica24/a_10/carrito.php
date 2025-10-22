<?php
// Inicia el sistema de sesiones para acceder a $_SESSION
// session_start() debe ser lo primero antes de trabajar con variables de sesión
// Permite mantener el carrito persistente entre peticiones AJAX
session_start();

// Definición de productos disponibles (funciona como consulta base de datos). Array asociativo donde la clave es el ID y el valor es el nombre del producto
$productos = [
  1 => "Producto A",      // ID (clave) 1 corresponde a "Producto A" (valor)
  2 => "Producto B",      // ID (clave) 2 corresponde a "Producto B" (valor)
  3 => "Producto C"       // ID (clave) 3 corresponde a "Producto C" (valor)
];

// Verifica si la variable de sesión 'carrito' ya fue creada anteriormente
if (!isset($_SESSION['carrito'])) {
    // Si no existe, inicializa como array vacío
    // Esta será la primera vez que el usuario interactúa con el carrito
    $_SESSION['carrito'] = [];
}

// Procesamiento de la petición POST para agregar producto
if (isset($_POST['id'])) { //Verifico si se recibió el parámetro 'id' via POST desde JS
    
    $id = intval($_POST['id']); // aseguro que sea num valido con "intval()" que convierte a entero y elimina caracteres no numéricos
    
    // Verifico que el id enviado corresponda a un producto válido en el array $productos
    if (isset($productos[$id])) {
        
        // Verifico si este producto ya existe en el carrito del usuario
        if (!isset($_SESSION['carrito'][$id])) {
            $_SESSION['carrito'][$id] = 0; // Si es la primera vez que se agrega este producto, inicializa cantidad en 0
        }
        // Si ya existía, aumenta la cantidad; si no, queda en 1 (0 + 1)
        // Cada llamada a este script agrega UNA unidad del producto
        $_SESSION['carrito'][$id]++;
    }
    // Si el producto no existe (ID inválido), no se hace nada
}
// Respuesta de confirmación para JavaScript
echo "OK";
?>