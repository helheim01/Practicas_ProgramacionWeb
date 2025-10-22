<?php
// ==========================================
// conexión a base de datos mysql
// ==========================================

//Esta carpeta con los dos archivos se debe poner en C:\xampp\htdocs
    // UBICACIÓN: C:\xampp\htdocs\nombre_carpeta\index.php
    // NAVEGADOR: localhost:8012/Practica_a9/index.php
    
// Establece conexión MySQLi con parámetros estándar de XAMPP: new mysqli(servidor, usuario, contraseña, nombre_base_datos)
$conn = new mysqli("localhost", "root", "", "a9_php");


// Verificación de conexión a la base de datos
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error); // Si hay error, die() detiene la ejecución y muestra el mensaje
}

// Ejecuta consulta SQL para obtener datos del dropdown
// Hago una consulta SQL con SELECT id, nombre (para obtener los campos necesarios para el dropdown)
// FROM especialidad: tabla que contiene las especialidades médicas
// Resultado: objeto MySQLi_Result con todas las filas
$resultado = $conn->query("SELECT id, nombre FROM especialidad");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Especialidades de la clínica</title>
    
    <script>
    // Definición de función JavaScript para manejar AJAX. Parámetro 'id': valor seleccionado del dropdown
    function mostrarDescripcion(id) {
        // Si id está vacío (opción "-- Selecciona --"), limpia el div y termina
        if (id === "") {
            document.getElementById("descripcion").innerHTML = "";
            return; // Sale de la función sin hacer petición AJAX
        }

        // Crea nuevo objeto XMLHttpRequest para petición AJAX (XMLHttpRequest es la API nativa de JavaScript para comunicación asíncrona)
        const xhr = new XMLHttpRequest();
        
        // Configura la petición HTTP GET hacia descripcion.php
        xhr.open("GET", "descripcion.php?id=" + id, true); // Envía ID de especialidad seleccionada de forma asíncrona (true = no bloquea navegador)
        
        // Defino qué hacer cuando llegue la respuesta
        // onload se ejecuta cuando la petición se completa exitosamente
        xhr.onload = function () {
            // status 200 = HTTP OK (petición exitosa)
            if (xhr.status === 200) {  // Solo verifica éxito (sin manejo de errores)
                // responseText contiene la respuesta del servidor (HTML/texto)
                document.getElementById("descripcion").innerHTML = xhr.responseText; // innerHTML inserta la respuesta dentro del div
            }
        };
        
        // Ejecuta la petición HTTP - aquí inicia la comunicación real con el servidor
        xhr.send();  // Dispara la petición AJAX hacia descripcion.php
    }
    </script>
</head>

<body>

    <h2>Selecciona una especialidad:</h2>

    <!--DROPDOWN CON ESPECIALIDADES -->
    <!-- LÍNEA 71: Select HTML que dispara la función JavaScript -->
    <!-- onchange: evento que se ejecuta cuando cambia la selección -->
    <!-- this.value: valor del option seleccionado (será el ID de la especialidad) -->
    <select onchange="mostrarDescripcion(this.value)"> <!--onchange: evento que se dispara automáticamente cada vez que el usuario selecciona una opción diferente, mostrando la descripcion al cambiar. -->
        
        <!-- Opción por defecto con valor vacío -->
        <option value="">-- Selecciona --</option>

         
        <!-- Bucle PHP que recorre cada fila devuelta por la consulta -->
            <?php while($row = $resultado->fetch_assoc()): ?> <!--fetch_assoc trae la proxima fila y la devuelve como array asociativo -->
                <!--Basicamente, toma los resultados de la columna (id, nombre) y lo convierte en un arreglo de filas para que se muestren las distintas especialidades -->
                <!-- Por cada fila, se genera dinámicamente un <option> dentro del <select> -->

                <!-- value="<?= $row['id'] ?>": el valor del option será el ID de la especialidad (enviado a mostrarDescripcion()) -->
                <!-- <?= $row['nombre'] ?>: texto visible del option, es decir, el nombre de la especialidad -->

                <option value="<?= $row['id'] ?>"><?= $row['nombre'] ?></option>
                <!--La primera vuelta de este bucle, muestra: <option value="1">Cardiología</option> -->

            <?php endwhile; ?>
    </select>

    <!-- Contenedor donde se insertará dinámicamente la descripción recibida vía AJAX -->
    <div id="descripcion" style="margin-top:20px; font-weight:bold;"></div>

</body>
</html>

<?php 
// Cierro la conexión a la base de datos MySQL para liberar recursos del servidor
$conn->close(); 
?>

<!--
Resumen del flujo completo:
1. El usuario selecciona una especialidad desde el <select>.
2. JavaScript ejecuta mostrarDescripcion(id), que hace una petición AJAX a descripcion.php enviando el ID.
3. descripcion.php devuelve la descripción correspondiente desde la base de datos.
4. El contenido del <div id="descripcion"> se actualiza sin recargar la página.
-->
