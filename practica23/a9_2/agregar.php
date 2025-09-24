<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit;
}

$conn = new mysqli("localhost", "root", "", "a9_1");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST['nombre']);
    $descripcion = trim($_POST['descripcion']);

    if ($nombre !== "" && $descripcion !== "") {
        $stmt = $conn->prepare("INSERT INTO especialidades (nombre, descripcion) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombre, $descripcion);
        if ($stmt->execute()) {
            $stmt->close();
            header("Location: index.php");
            exit;
        } else {
            $error = "Error al guardar la especialidad: " . $stmt->error;
            $stmt->close();
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
<a href="index.php">Volver</a>

<form method="POST">
    <label>Nombre:</label><br>
    <input type="text" name="nombre" required><br><br>

    <label>Descripción:</label><br>
    <textarea name="descripcion" required></textarea><br><br>

    <button type="submit">Guardar</button>
</form>

<?php if (isset($error)) echo "<p style='color:red;'>" . htmlspecialchars($error) . "</p>"; ?>

</body>
</html>