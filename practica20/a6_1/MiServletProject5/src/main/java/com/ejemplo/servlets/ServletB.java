package com.ejemplo.servlets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ServletB extends HttpServlet {

    private static final Logger logger = LoggerFactory.getLogger(ServletB.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Usuario user = (Usuario) req.getAttribute("usuario");

        if (user != null) {
            logger.info("Recibido usuario desde ServletA: nombre={}, edad={}",
                    user.getNombre(), user.getEdad());

            // Modificamos el objeto
            user.setEdad(user.getEdad() + 5);
            user.setNombre(user.getNombre() + " (procesado en B)");

            // Guardar en la base de datos
            //try (Connection conn = DatabaseConnection.getConnection()) {
            try  {
                Connection conn = DatabaseConnection.getConnection();
                String sql = "INSERT INTO usuarios (nombre, edad) VALUES (?, ?)";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setString(1, user.getNombre());
                ps.setInt(2, user.getEdad());
                ps.executeUpdate();
                logger.info("Se guardo el objeto en la base de datos");
            } catch (SQLException e) {
                logger.error("Error al guardar el usuario en la base de datos", e);
                throw new ServletException("Error guardando en la base de datos", e);
            }
        }

        req.setAttribute("usuario", user);

        // Encadenamos hacia ServletC
        RequestDispatcher rd = req.getRequestDispatcher("/servletC");
        rd.forward(req, resp);
    }
}


/*
CREATE DATABASE servletsdb;
USE servletsdb;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL
);

*/