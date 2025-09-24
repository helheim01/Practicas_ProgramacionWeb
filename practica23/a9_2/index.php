<?php
session_start();

// Si el usuario no está logueado, redirigir a login
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit;
}

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "a9_1");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$resultado = $conn->query("SELECT id, nombre FROM especialidades");
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Especialidades de la clínica</title>
    <script>
    function mostrarDescripcion(id) {
        if (id === "") {
            document.getElementById("descripcion").innerHTML = "";
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "descripcion.php?id=" + id, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                document.getElementById("descripcion").innerHTML = xhr.responseText;
            } else {
                document.getElementById("descripcion").innerHTML = "Error al cargar la descripción.";
            }
        };
        xhr.send();
    }
    </script>
</head>
<body>

<h2>Bienvenido, <?= htmlspecialchars($_SESSION['usuario']) ?>!</h2>
<a href="logout.php">Cerrar sesión</a> |
<a href="agregar.php">Registrar nueva especialidad</a>

<h3>Selecciona una especialidad:</h3>

<select onchange="mostrarDescripcion(this.value)">
    <option value="">-- Selecciona --</option>
    <?php while($row = $resultado->fetch_assoc()): ?>
        <option value="<?= $row['id'] ?>"><?= htmlspecialchars($row['nombre']) ?></option>
    <?php endwhile; ?>
</select>

<div id="descripcion" style="margin-top:20px; font-weight:bold;"></div>

</body>
</html>

<?php $conn->close(); ?>