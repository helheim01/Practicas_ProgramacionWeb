<?php
session_start();

// Requiere sesión activa (evita que lo llame cualquiera desde fuera)
if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo "No autorizado.";
    exit;
}

if (!isset($_GET["id"])) {
    exit;
}

$id = intval($_GET["id"]);

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "a9_1");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT descripcion FROM especialidades WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($descripcion);

if ($stmt->fetch()) {
    echo nl2br(htmlspecialchars($descripcion));
} else {
    echo "Especialidad no encontrada.";
}

$stmt->close();
$conn->close();
?>