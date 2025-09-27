<?php
// Validación de seguridad para verificar que el parámetro 'id' existista y no sea null
// $_GET["id"] es el parámetro enviado por la petición AJAX desde index.php
// El operador ! (NOT) invierte el resultado
if (!isset($_GET["id"])) {
    exit; //Si no hay, termina
}

// Conversion del parámetro recibido, ya que el $_GET["id"] viene como string desde la URL
// intval() convierte a entero y elimina caracteres peligrosos
$id = intval($_GET["id"]);

// Cada petición AJAX es independiente, necesita su propia conexión, por lo que hacemos otra
$conn = new mysqli("localhost", "root", "", "a9_php");

// Verificación de conexión (manejo básico de errores)
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// LÍNEA 18: Prepara consulta SQL, para en base al id que se trajo, consultar la descripcion que tiene
$stmt = $conn->prepare("SELECT descripcion FROM especialidad WHERE id = ?");


// Vincula el parámetro (id) a la consulta preparada
// "i" especifica que el parámetro es un INTEGER. $id es la variable que se insertará en lugar del ?
$stmt->bind_param("i", $id);

// Ejecuta la consulta preparada (envía la consulta real a MySQL)
// El valor de $id se inserta de forma segura en el SQL
$stmt->execute();

// Vincula el resultado de la consulta a una variable
// $descripcion recibirá el valor de la columna 'descripcion'
// Cuando se ejecute fetch(), $descripcion contendrá el valor
$stmt->bind_result($descripcion);

// Procesamiento del resultado y respuesta
// fetch() intenta obtener una fila del resultado. Retorna true si encuentra una fila, false si no hay resultados
if ($stmt->fetch()) {
    // Si encontró la especialidad, envía su descripción
    // Esta respuesta será capturada por xhr.responseText en JavaScript
    echo $descripcion; //echo envía el contenido directamente al navegador
} else {
    echo "Especialidad no encontrada.";
}

// Cierra la consulta preparada
$stmt->close();

// Cierra la conexión a la base de datos
$conn->close();
?>