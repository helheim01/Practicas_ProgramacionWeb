<?php
// Inicia el sistema de sesiones de PHP
// Permite crear/acceder a variables $_SESSION para guardar datos entre páginas.
// Inicia la sesión para poder almacenar variables si el login es correcto.
session_start();

// Control de acceso - Evita login doble
if (isset($_SESSION['usuario'])) { // Si la variable $_SESSION['usuario'] ya existe significa que el usuario ya está logueado.
    header("Location: index.php");     // // Si ya está logueado, lo redirige al index.php
    exit;                              // Detiene ejecución para evitar que continúe procesando
}

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "a9_2");
if ($conn->connect_error) { // Verifica si la conexión falló
    die("Error de conexión: " . $conn->connect_error);
}

// Procesamiento del formulario de login (HTML)
if ($_SERVER["REQUEST_METHOD"] === "POST") { // Como el formulario fue enviado por POST, recoge el usuario y la contraseña ingresadas.
    
    // Recupera los datos ingresados en el formulario. trim() elimina espacios en blanco innecesarios.
    $usuario = trim($_POST['usuario']);
    $password = trim($_POST['password']);

    // Consulta SQL para buscar al usuario ingresado en la tabla usuarios
    $stmt = $conn->prepare("SELECT id, password FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();                          // Ejecuta consulta SELECT
    $stmt->bind_result($id, $hash);            // Devuelve: id (número de usuario) y password (hash de la contraseña guardado en la BD).

    // Validación de credenciales y manejo de sesión
    // Si se encontró un registro: Verifica, almacena y redirige al index.php
    
    if ($stmt->fetch()) {                      // fetch() verifica si el usuario existe en la base de datos
        if (password_verify($password, $hash)) { //password_verify() compara la contraseña escrita con el hash en la base de datos
            // Si el login es correcto, almacena datos del usuario en variables de sesión (persisten entre páginas)
            $_SESSION['usuario'] = $usuario;       // Guarda nombre de usuario en sesión
            $_SESSION['id_usuario'] = $id;         // Guarda ID numérico del usuario en sesión
            $stmt->close();                        
            header("Location: index.php");        // Redirige a index.php
            exit;                                  // Detiene ejecución para evitar procesamiento adicional
        } 
    }

    // Si no se encontró un registro: Muestra un mensaje de error.
    $error = "Usuario o contraseña incorrectos.";   // Variable que se mostrará en el HTML
    $stmt->close();                                 // Cerramos la consulta
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Iniciar sesión</title>
    </head>
    <body>
            <h2>Login</h2>
            <!-- Formulario HTML para capturar credenciales -->
            <!-- method="POST": Los datos se envían de forma oculta (más seguro que GET) -->
            <!-- Al no especificar 'action', el formulario se envía a la misma página (login.php) -->
            <form method="POST">
                
                <label>Usuario:</label><br>
                <!-- name="usuario": este valor se captura en $_POST['usuario'] -->
                <input type="text" name="usuario" required><br><br>

                <label>Contraseña:</label><br>
                <!-- name="password": este valor se captura en $_POST['password'] -->
                <input type="password" name="password" required><br><br>
                <button type="submit">Entrar</button>
            </form>

            <!-- Si $error existe, muestra un mensaje en rojo. htmlspecialchars() evita inyecciones de código en el mensaje (protección contra XSS). -->
            <?php if (isset($error)) echo "<p style='color:red;'>" . htmlspecialchars($error) . "</p>"; ?>
        </body>
</htm