<?php
$conn = new mysqli("localhost", "root", "", "a9_php");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Debug: mostrar qué se recibe
echo "ID recibido: " . (isset($_GET['id']) ? $_GET['id'] : 'ninguno') . "<br>";

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']);
    
    // Primero probemos una consulta simple
    $result = $conn->query("SELECT Descripcion FROM especialidad WHERE ID = $id");
    
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "Descripción encontrada: " . htmlspecialchars($row['Descripcion']);
    } else {
        echo "No se encontró la descripción para ID: $id";
    }
} else {
    echo "ID no válido";
}

$conn->close();
?>