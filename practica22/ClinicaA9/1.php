<?php
// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "a9_php");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$resultado = $conn->query("SELECT ID, Nombre FROM especialidad");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
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
            }
        };
        xhr.send();
    }
    </script>
</head>
<body>

<h2>Selecciona una especialidad:</h2>

<select onchange="mostrarDescripcion(this.value)">
    <option value="">-- Selecciona --</option>
    <?php while($row = $resultado->fetch_assoc()): ?>
        <option value="<?= $row['ID'] ?>"><?= $row['Nombre'] ?></option>
    <?php endwhile; ?>
</select>

<div id="descripcion" style="margin-top:20px; font-weight:bold;"></div>

</body>
</html>

<?php $conn->close(); ?>
