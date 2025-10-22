<?php

// Requiere sesión activa para agregar especialidades.
session_start();                       // Inicia sistema de sesiones para acceder a $_SESSION
if (!isset($_SESSION['usuario'])) { //Si no existe la variable $_SESSION['usuario'],significa que no hay sesión activa
    header("Location: login.php");     // Redirige al login 
    exit; 
}

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "a9_2");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error); // Termina script si no puede conectar
}

// Procesamiento del formulario de nueva especialidad (solo cuando se envía)
// Verifica si el formulario fue enviado via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    // Captura y limpieza de datos del formulario
    // trim() elimina espacios en blanco al inicio y final
    $nombre = trim($_POST['nombre']);           // Campo "nombre" del formulario
    $descripcion = trim($_POST['descripcion']); // Campo "descripcion" del formulario

    // Verificación de campos no vacíos después del trim
    if ($nombre !== "" && $descripcion !== "") {
        
        // CONSULTA PREPARADA para el INSERT
        $stmt = $conn->prepare("INSERT INTO especialidades (nombre, descripcion) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombre, $descripcion);  // "ss" = ambos parámetros son strings
        
        // Intenta ejecutar la inserción
        if ($stmt->execute()) {
            // INSERCIÓN EXITOSA
            $stmt->close();                    // Libera recursos de la consulta
            header("Location: index.php");    // Redirige al index.php
            exit;                              // Detiene ejecución
        } else {
            // ERROR EN LA INSERCIÓN (ej: especialidad duplicada, problema BD)
            $error = "Error al guardar la especialidad: " . $stmt->error;
            $stmt->close();                    // Libera recursos incluso en caso de error
        }
    } else {
        $error = "Debes completar todos los campos.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Registrar especialidad</title>
</head>
<body>

<h2>Registrar nueva especialidad</h2>
<a href="index.php">Volver</a><!-- Link de retorno a la página principal -->

<!-- Formulario para capturar nueva especialidad -->
<form method="POST">
    
    <label>Nombre:</label><br> <!-- name="nombre": se captura en $_POST['nombre'] -->
    <input type="text" name="nombre" required><br><br>
    <label>Descripción:</label><br><!-- name="descripcion": se captura en $_POST['descripcion'] -->
    <textarea name="descripcion" required></textarea><br><br>
    <button type="submit">Guardar</button>
</form>

<?php if (isset($error)) echo "<p style='color:red;'>" . htmlspecialchars($error) . "</p>"; ?> <!-- Mostrar mensajes de error si existen -->

</body>
</html>