<?php
//Esta carpeta con los dos archivos se debe poner en C:\xampp\htdocs
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
        console.log("Función llamada con ID:", id);
        
        if (id === "") {
            document.getElementById("descripcion").innerHTML = "";
            return;
        }

        const xhr = new XMLHttpRequest();
        const url = "2.php?id=" + id; //pongo el 2.php
        console.log("Haciendo petición a:", url);
        
        xhr.open("GET", url, true);
        xhr.onload = function () {
            console.log("Status de respuesta:", xhr.status);
            console.log("Respuesta del servidor:", xhr.responseText);
            
            if (xhr.status === 200) {
                document.getElementById("descripcion").innerHTML = xhr.responseText;
            } else {
                document.getElementById("descripcion").innerHTML = "Error en la petición: " + xhr.status;
            }
        };
        
        xhr.onerror = function() {
            console.log("Error en la petición AJAX");
            document.getElementById("descripcion").innerHTML = "Error en la conexión";
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

<div id="descripcion" style="margin-top:20px; font-weight:bold; border: 1px solid #ccc; padding: 10px; min-height: 50px;"></div>

</body>
</html>

<?php $conn->close(); ?>