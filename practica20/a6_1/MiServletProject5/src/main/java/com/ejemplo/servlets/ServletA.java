package com.ejemplo.servlets;


import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class ServletA extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String nombre = req.getParameter("nombre");
        if (nombre == null || nombre.trim().isEmpty()) {
            nombre = "Invitado";
        }

        Usuario user = new Usuario(nombre, 25); // edad fija de ejemplo
        req.setAttribute("usuario", user);

        // Pasar a ServletB
        RequestDispatcher rd = req.getRequestDispatcher("/servletB");
        rd.forward(req, resp);
    }
}