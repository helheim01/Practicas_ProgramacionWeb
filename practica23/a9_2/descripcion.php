<?php
// Inicia el sistema de sesiones para acceder a variables almacenadas
session_start();

// Requiere sesión activa (evita que lo llame cualquiera desde fuera)
if (!isset($_SESSION['usuario'])) { //Si no existe la variable $_SESSION['usuario'],significa que no hay sesión activa
    http_response_code(401);
    echo "No autorizado.";
    exit;
}

if (!isset($_GET["id"])) {
    exit;
}

// Obtiene el id pasado por GET y lo conecta a la base de datos con la conexión de abajo
$id = intval($_GET["id"]);
$conn = new mysqli("localhost", "root", "", "a9_2");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta la descripción de la especialidad con el id recibido usando una consulta preparada.
$stmt = $conn->prepare("SELECT descripcion FROM especialidades WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($descripcion);

// Busca la descripción, si la encuentra la imprime con htmlspecialchars y le agrega saltos de linea con nl2br. Si no existe muestra un mensaje.
if ($stmt->fetch()) {
    echo nl2br(htmlspecialchars($descripcion));
} else {
    echo "Especialidad no encontrada.";
}

$stmt->close();
$conn->close();
?>