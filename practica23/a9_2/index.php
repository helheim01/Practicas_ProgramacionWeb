<?php

// Inicia el sistema de sesiones para acceder a variables almacenadas
session_start();

// Control de acceso
if (!isset($_SESSION['usuario'])) { //Si no existe la variable $_SESSION['usuario'],significa que no hay sesión activa
    header("Location: login.php"); //Redirige al login
    exit; 
}

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "a9_2");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);  // Termina script si no puede conectar
}

// Consulta SQL para traer las especialidades con su id y su nombre, para poblar el dropdown de especialidades (la descripción se carga via AJAX)
$resultado = $conn->query("SELECT id, nombre FROM especialidades");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Especialidades de la clínica</title>
        
        <!-- Función JS para manejo de peticiones AJAX -->
        <script>
        function mostrarDescripcion(id) {
            // Si no se elige nada (id vacío) → limpia el div de descripción.
            if (id === "") {
                document.getElementById("descripcion").innerHTML = "";
                return;                    // Sale de la función sin hacer petición
            }
            
            const xhr = new XMLHttpRequest();
            // Si se selecciona una especialidad
            xhr.open("GET", "descripcion.php?id=" + id, true); //Hace un GET a descripcion.php?id=<id>

            // Espera respuesta del servidors
            xhr.onload = function () {
                if (xhr.status === 200) {  // 200 = HTTP OK (petición exitosa)
                    // Inserta la descripción recibida en el div correspondiente
                    document.getElementById("descripcion").innerHTML = xhr.responseText;
                } else {
                    // Maneja errores HTTP (404, 500, etc.) mostrando mensaje genérico
                    document.getElementById("descripcion").innerHTML = "Error al cargar la descripción.";
                }
            };
            
            // Envía la petición HTTP al servidor sin recargar la pagina
            xhr.send();
        }
        </script>
    </head>
    <body>

        <!-- Barra de navegación personalizada con información del usuario -->
        <!-- Muestra un saludo con el usuario logueado y los links para cerrar sesión o agregar una nueva especialidad -->
        <h2>Bienvenido, <?= htmlspecialchars($_SESSION['usuario']) ?>!</h2>

        <!-- htmlspecialchars() previene ataques XSS escapando caracteres especiales -->

        <!-- Enlaces de navegación -->
        <a href="logout.php">Cerrar sesión</a> |
        <a href="agregar.php">Registrar nueva especialidad</a>

        <h3>Selecciona una especialidad:</h3>

        <!-- Dropdown dinámico que dispara función AJAX -->
        <!-- Muestra las especialidades en un <select>, cuando se elige una, se ejecuta mostrarDescripcion(id) que hace una petición AJAX a descripcion.php -->
        <select onchange="mostrarDescripcion(this.value)">
            <option value="">-- Selecciona --</option> <!--Primer option -->
            
            <!-- Bucle PHP para generar opciones dinámicamente desde la base de datos -->
            <?php while($row = $resultado->fetch_assoc()): ?>
                <!--Los demas option se generan según el contenido de la base de datos -->
                <!-- value: ID de la especialidad (enviado a mostrarDescripcion) -->
                <!-- texto visible: nombre de la especialidad con protección XSS -->
                <option value="<?= $row['id'] ?>"><?= htmlspecialchars($row['nombre']) ?></option>
            <?php endwhile; ?>
        </select>

        <!-- Contenedor donde se mostrará la descripción via AJAX -->
        <!-- id="descripcion": identificador usado por JavaScript para insertar contenido -->
        <!-- Inicialmente vacío, se llena dinámicamente al seleccionar especialidad -->
        <div id="descripcion" style="margin-top:20px; font-weight:bold;"></div>

    </body>
</html>

<?php 
$conn->close();
?>