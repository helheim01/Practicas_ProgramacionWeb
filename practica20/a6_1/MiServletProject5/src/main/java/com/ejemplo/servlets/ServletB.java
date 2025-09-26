package com.ejemplo.servlets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/*
SERVLET B: Segundo servlet en la cadena
- Recibe objeto Usuario desde ServletA
- Modifica datos del usuario 
- Guarda en base de datos MySQL
- Pasa control a ServletC
*/
public class ServletB extends HttpServlet {

    // Logger para registrar eventos y errores
    private static final Logger logger = LoggerFactory.getLogger(ServletB.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // Recuperar objeto Usuario enviado por ServletA
        Usuario user = (Usuario) req.getAttribute("usuario");

        if (user != null) {
            // Registrar datos recibidos
            logger.info("Recibido usuario desde ServletA: nombre={}, edad={}",
                    user.getNombre(), user.getEdad());

            // Modificar el objeto Usuario
            user.setEdad(user.getEdad() + 5);                    // Aumenta edad en 5
            user.setNombre(user.getNombre() + " (procesado en B)"); // Agrega texto al nombre

            // Guardar en base de datos MySQL
            try  {
                Connection conn = DatabaseConnection.getConnection();           // Obtener conexión BD
                String sql = "INSERT INTO usuarios (nombre, edad) VALUES (?, ?)"; // Consulta SQL
                PreparedStatement ps = conn.prepareStatement(sql);             // Preparar consulta
                ps.setString(1, user.getNombre());                            // Asignar nombre al primer ?
                ps.setInt(2, user.getEdad());                                 // Asignar edad al segundo ?
                ps.executeUpdate();                                           // Ejecutar INSERT
                logger.info("Se guardo el objeto en la base de datos");
            } catch (SQLException e) {
                logger.error("Error al guardar el usuario en la base de datos", e);
                throw new ServletException("Error guardando en la base de datos", e);
            }
        }

        // Actualizar objeto modificado en request para ServletC
        req.setAttribute("usuario", user);

        // Pasar control a ServletC
        RequestDispatcher rd = req.getRequestDispatcher("/servletC");
        rd.forward(req, resp);
    }
}

/*
SCRIPT SQL - Ejecutar en MySQL antes de usar:

CREATE DATABASE servletsdb;
USE servletsdb;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL
);
*/