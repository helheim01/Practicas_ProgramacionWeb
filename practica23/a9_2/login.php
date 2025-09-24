<?php
session_start();

// Si ya está logueado, redirigir
if (isset($_SESSION['usuario'])) {
    header("Location: index.php");
    exit;
}

$conn = new mysqli("localhost", "root", "", "a9_1");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT id, password FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->bind_result($id, $hash);

    if ($stmt->fetch()) {
        if (password_verify($password, $hash)) {
            // Login correcto
            $_SESSION['usuario'] = $usuario;
            $_SESSION['id_usuario'] = $id;
            $stmt->close();
            header("Location: index.php");
            exit;
        } 
    }

    // Si llega aquí, error de login
    $error = "Usuario o contraseña incorrectos.";
    $stmt->close();
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

<form method="POST">
    <label>Usuario:</label><br>
    <input type="text" name="usuario" required><br><br>

    <label>Contraseña:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Entrar</button>
</form>

<?php if (isset($error)) echo "<p style='color:red;'>" . htmlspecialchars($error) . "</p>"; ?>

</body>
</html>