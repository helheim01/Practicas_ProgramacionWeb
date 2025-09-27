#!C:/Python313/python.exe
# Script CGI Python para mostrar usuarios desde MySQL
# Ubicación: C:\xampp\cgi-bin\listado.py
# URL: http://localhost:8012/cgi-bin/listado.py

import sys

# CONFIGURACIÓN DE RUTAS PYTHON:
# sys.path.append(): agrega rutas donde Python busca módulos
# Necesario porque CGI no tiene acceso automático a paquetes instalados
sys.path.append('C:\\Python313\\Lib\\site-packages')                    # Paquetes estándar de Python
sys.path.append(r'C:\Users\Jero\AppData\Roaming\Python\Python313\site-packages')  # Paquetes usuario

# IMPORTAR MYSQL CONNECTOR:
try:
    import mysql.connector  # Conector MySQL para Python
except Exception as e:
    # Si falla la importación, mostrar error en HTML y terminar
    print("Content-Type: text/html\n")   # Header HTTP obligatorio
    print(f"<h1>Error importando mysql.connector</h1><p>{e}</p>")
    exit()      # Terminar ejecución

# CONECTAR A BASE DE DATOS:
try:
    conexion = mysql.connector.connect(
        host="localhost",   # Servidor MySQL local
        user="root",        # Usuario MySQL
        password="",        # Contraseña vacía (XAMPP por defecto)
        database="ejemplo_cgi"   # Nombre de la base de datos
    )
except Exception as e:
    # Si falla conexión, mostrar error y terminar
    print("Content-Type: text/html\n")
    print(f"<h1>Error conectando a MySQL</h1><p>{e}</p>")
    exit()

# GENERAR RESPUESTA HTML:
print("Content-Type: text/html\n")# Content-Type: le dice al navegador qué tipo de contenido recibe

# HTML + CSS inline para la página
print("<html><head><title>Listado de Usuarios</title>")
print("<style>")
print("table {border-collapse: collapse; width: 60%;}")    # Tabla con bordes unidos
print("th, td {border: 1px solid #333; padding: 8px; text-align: left;}")  # Estilo celdas
print("th {background-color: #f2f2f2;}")   # Fondo gris para headers
print("</style>")
print("</head><body>")
print("<h1>Usuarios registrados</h1>")

# EJECUTAR CONSULTA SQL:
cursor = conexion.cursor()  # Crear cursor para ejecutar SQL
cursor.execute("SELECT id, nombre, email FROM usuarios")  # Consulta SELECT
resultados = cursor.fetchall()   # Obtener todos los resultados

# MOSTRAR RESULTADOS:
if resultados:     # Si hay registros de usuarios
    print("<table>")
    print("<tr><th>ID</th><th>Nombre</th><th>Email</th></tr>")  # Encabezados de tabla
    for fila in resultados:    # Iterar cada registro
        # fila[0]=id, fila[1]=nombre, fila[2]=email
        print(f"<tr><td>{fila[0]}</td><td>{fila[1]}</td><td>{fila[2]}</td></tr>")
    print("</table>")
else:
    print("<p>No hay usuarios registrados.</p>")  # Mensaje si tabla vacía

# LIMPIAR RECURSOS:
cursor.close()    # Cerrar cursor
conexion.close()  # Cerrar conexión MySQL
print("</body></html>") # Cerrar HTML

# CONCEPTOS IMPORTANTES:
# 1. CGI (Common Gateway Interface): permite ejecutar scripts desde servidor web
# 2. Shebang (#!): le dice al sistema qué intérprete usar
# 3. Content-Type: header HTTP obligatorio en CGI
# 4. sys.path: rutas donde Python busca módulos
# 5. mysql.connector: librería para conectar Python con MySQL