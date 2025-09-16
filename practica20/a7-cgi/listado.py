#!C:/Python313/python.exe
#poner en C:\xampp\cgi-bin
#http://localhost:8012/cgi-bin/listado.py

import sys

# Rutas donde Python buscará los módulos instalados
sys.path.append('C:\\Python313\\Lib\\site-packages')
sys.path.append(r'C:\Users\Jero\AppData\Roaming\Python\Python313\site-packages')

try:
    import mysql.connector
except Exception as e:
    print("Content-Type: text/html\n")
    print(f"<h1>Error importando mysql.connector</h1><p>{e}</p>")
    exit()

# Intentamos conectar a la base de datos
try:
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",      # Pon tu contraseña si tiene
        database="ejemplo_cgi" # Tu base de datos
    )
except Exception as e:
    print("Content-Type: text/html\n")
    print(f"<h1>Error conectando a MySQL</h1><p>{e}</p>")
    exit()

print("Content-Type: text/html\n")
print("<html><head><title>Listado de Usuarios</title>")
print("<style>")
print("table {border-collapse: collapse; width: 60%;}")
print("th, td {border: 1px solid #333; padding: 8px; text-align: left;}")
print("th {background-color: #f2f2f2;}")
print("</style>")
print("</head><body>")
print("<h1>Usuarios registrados</h1>")

cursor = conexion.cursor()
cursor.execute("SELECT id, nombre, email FROM usuarios")
resultados = cursor.fetchall()

if resultados:
    print("<table>")
    print("<tr><th>ID</th><th>Nombre</th><th>Email</th></tr>")
    for fila in resultados:
        print(f"<tr><td>{fila[0]}</td><td>{fila[1]}</td><td>{fila[2]}</td></tr>")
    print("</table>")
else:
    print("<p>No hay usuarios registrados.</p>")

# Cerrar conexión
cursor.close()
conexion.close()
print("</body></html>")
