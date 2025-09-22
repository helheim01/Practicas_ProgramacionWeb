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
        System.out.println("Classpath: " + System.getProperty("java.class.path"));
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}