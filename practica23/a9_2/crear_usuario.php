<?php
// Script para crear/actualizar usuario 'admin' con hash PHP y para insertar 3 especialidades de ejemplo.
// Admin asegurado → el script se encarga de que siempre haya un usuario "admin" con contraseña "1234" (en hash).
// Especialidades aseguradas → inserta ejemplos solo si no existen.

// Definición de credenciales del usuario administrador
// Creamos las variables con los datos del usuario 'admin'.
$usuario = 'admin';                    // Nombre de usuario fijo: 'admin'
$password_plain = '1234';              // Contraseña en texto plano (será hasheada por seguridad)

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "a9_2");

// Verificación de conexión exitosa
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error); // Si hay error de conexión, termina el script y muestra mensaje
}

// Hash para la contraseña: Convierte "1234" en un hash seguro con bcrypt. Cada vez genera un hash distinto, aunque la contraseña sea igual.
$hash = password_hash($password_plain, PASSWORD_DEFAULT);

//Consulto si el usuario "admin" ya existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();                      // Ejecuta la consulta preparada
$stmt->bind_result($id_existente);     // Si existe, devuelvo el id

// Si existe, lo actualizo (UPDATE) la contraseña para que tenga el nuevo hash
if ($stmt->fetch()) {                  // fetch() retorna true si encuentra una fila (usuario existe)
        $stmt->close();                    // Cierra el statement de verificación antes de crear uno nuevo
    
    // Preparo consulta UPDATE
    $upd = $conn->prepare("UPDATE usuarios SET password = ? WHERE usuario = ?"); //Actualiza la contraseña hasheada.
    $upd->bind_param("ss", $hash, $usuario);
    
    // Ejecuto la actualización y verifico
    if ($upd->execute()) {
        echo "Usuario 'admin' actualizado con nueva contraseña hash.\n";
    } else {
        echo "Error actualizando usuario: " . $upd->error . "\n";
    }
    $upd->close();
    
} else {
    // Si no existe, lo creo (INSERT) con la contraseña hasheada
    $stmt->close();                    // Cierra statement de verificación
    
    // Preparo consulta INSERT
    $ins = $conn->prepare("INSERT INTO usuarios (usuario, password) VALUES (?, ?)"); //Crea el usuario con contraseña hasheada.
    $ins->bind_param("ss", $usuario, $hash);     // Ambos parámetros son strings
    
    // Ejecuto la inserción y verifico
    if ($ins->execute()) {
        echo "Usuario 'admin' creado correctamente.\n";
    } else {
        echo "Error creando usuario: " . $ins->error . "\n";
    }
    $ins->close();
}

// Defino las especialidades a insertar si no existen (por nombre) en un rray multidimensional (cada elemento contiene [nombre, descripción])
$especialidades = [
    ["Cardiología", "Especialidad médica que se ocupa de las enfermedades del corazón y del sistema circulatorio."],
    ["Pediatría", "Especialidad dedicada al cuidado y tratamiento de la salud de bebés, niños y adolescentes."],
    ["Dermatología", "Especialidad que trata las enfermedades de la piel, cabello y uñas."]
];

// Preparo los statements para manejar las especialidades y evitar duplicados
$chk = $conn->prepare("SELECT id FROM especialidades WHERE nombre = ?"); //chk para verificar si una especialidad por nombre
$insEsp = $conn->prepare("INSERT INTO especialidades (nombre, descripcion) VALUES (?, ?)"); //insEsp para insertarla si no existe

// Bucle para procesar cada especialidad
foreach ($especialidades as $esp) {    // $esp será cada sub-array [nombre, descripción]
    
    // Verifico si la especialidad ya existe (por su nombre)
    $chk->bind_param("s", $esp[0]);    // $esp[0] = nombre de la especialidad
    $chk->execute();                   // Ejecuta consulta SELECT
    $chk->store_result();              // Almacena resultado en memoria para poder contar filas
    
    // Si num_rows es 0, la especialidad no existe y debe insertarse
    if ($chk->num_rows === 0) {
        $insEsp->bind_param("ss", $esp[0], $esp[1]); // Inserto la nueva especialidad
        $insEsp->execute();            // Ejecuto el INSERT
        echo "Insertada especialidad: {$esp[0]}\n";
    } else {
        echo "Ya existe la especialidad: {$esp[0]}\n"; // Si ya existe
    }
    
    // Libera resultado para la siguiente iteración del bucle
    $chk->free_result();
}

// Limpieza de recursos
$chk->close();                         // Cierra statement de verificación
$insEsp->close();                      // Cierra statement de inserción

// Cierre de conexión a base de datos
$conn->close();

// Mensaje final de confirmación
echo "\nListo.\n";
?>