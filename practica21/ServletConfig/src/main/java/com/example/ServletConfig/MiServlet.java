package com.example.ServletConfig;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MiServlet extends HttpServlet {

    private String mensaje;
    private String version;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        mensaje = config.getInitParameter("config");
        version = config.getInitParameter("version");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // Configurar tipo de contenido
        resp.setContentType("text/html");

        // Obtener PrintWriter para escribir la respuesta
        PrintWriter out = resp.getWriter();

        // Escribir respuesta simple como en tu código
        out.println("<h1>" + mensaje + "</h1>");
        out.println("<h2>" + version + "</h2>");
    }

}
