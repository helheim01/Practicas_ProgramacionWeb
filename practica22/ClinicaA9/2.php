<?php
$conn = new mysqli("localhost", "root", "", "a9_php");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']);

    $stmt = $conn->prepare("SELECT Descripcion FROM especialidad WHERE ID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($descripcion);

    if ($stmt->fetch()) {
        echo htmlspecialchars($descripcion);
    } else {
        echo "No se encontró la descripción.";
    }

    $stmt->close();
}

$conn->close();
?>
