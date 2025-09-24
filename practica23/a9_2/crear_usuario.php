<?php
// crear_usuario.php
// Script para crear/actualizar usuario 'admin' con hash PHP y para insertar 3 especialidades de ejemplo.

$usuario = 'admin';
$password_plain = '1234'; // cambialo si quieres otra contraseña

$conn = new mysqli("localhost", "root", "", "a9_1");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Crear hash con password_hash
$hash = password_hash($password_plain, PASSWORD_DEFAULT);

// Verificar si existe el usuario
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$stmt->bind_result($id_existente);

if ($stmt->fetch()) {
    // Actualizar contraseña
    $stmt->close();
    $upd = $conn->prepare("UPDATE usuarios SET password = ? WHERE usuario = ?");
    $upd->bind_param("ss", $hash, $usuario);
    if ($upd->execute()) {
        echo "Usuario 'admin' actualizado con nueva contraseña hash.\n";
    } else {
        echo "Error actualizando usuario: " . $upd->error . "\n";
    }
    $upd->close();
} else {
    $stmt->close();
    // Insertar nuevo usuario
    $ins = $conn->prepare("INSERT INTO usuarios (usuario, password) VALUES (?, ?)");
    $ins->bind_param("ss", $usuario, $hash);
    if ($ins->execute()) {
        echo "Usuario 'admin' creado correctamente.\n";
    } else {
        echo "Error creando usuario: " . $ins->error . "\n";
    }
    $ins->close();
}

// Insertar 3 especialidades si no existen (por nombre)
$especialidades = [
    ["Cardiología", "Especialidad médica que se ocupa de las enfermedades del corazón y del sistema circulatorio."],
    ["Pediatría", "Especialidad dedicada al cuidado y tratamiento de la salud de bebés, niños y adolescentes."],
    ["Dermatología", "Especialidad que trata las enfermedades de la piel, cabello y uñas."]
];

$chk = $conn->prepare("SELECT id FROM especialidades WHERE nombre = ?");
$insEsp = $conn->prepare("INSERT INTO especialidades (nombre, descripcion) VALUES (?, ?)");

foreach ($especialidades as $esp) {
    $chk->bind_param("s", $esp[0]);
    $chk->execute();
    $chk->store_result();
    if ($chk->num_rows === 0) {
        $insEsp->bind_param("ss", $esp[0], $esp[1]);
        $insEsp->execute();
        echo "Insertada especialidad: {$esp[0]}\n";
    } else {
        echo "Ya existe la especialidad: {$esp[0]}\n";
    }
    $chk->free_result();
}

$chk->close();
$insEsp->close();

$conn->close();

echo "\nListo.\n";
?>