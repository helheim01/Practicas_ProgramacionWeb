package com.ejemplo.servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/servletsdb";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    static {
        try {
            Class.forName("com.mysql.jdbc.Driver"); // Driver para MySQL 5.x
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("No se pudo cargar el driver de MySQL", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        /*
        System.out.println(): Imprime en consola el classpath
        - java.class.path: ruta donde Java busca las clases (.jar)
        - Útil para debugging si hay problemas con drivers
        - Permite verificar que mysql-connector.jar está disponible
        */
        System.out.println("Classpath: " + System.getProperty("java.class.path"));
        
        /*
        DriverManager.getConnection(): Crea conexión a la base de datos
        - URL: dirección de la BD (jdbc:mysql://localhost:3306/servletsdb)
        - USER: usuario para autenticarse (root)
        - PASSWORD: contraseña del usuario (vacía)
        - return: objeto Connection listo para ejecutar consultas SQL
        */
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}