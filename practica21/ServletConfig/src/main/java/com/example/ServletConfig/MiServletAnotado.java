package com.example.ServletConfig;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(
        name = "MiServletAnotado",
        urlPatterns = {"/anotado"},
        initParams = {
                @WebInitParam(name = "mensaje", value = "Hola soy un Servlet con anotaciones"),
                @WebInitParam(name = "version", value = "2.0")
        }
)
public class MiServletAnotado extends HttpServlet {

    private String mensaje;
    private String version;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        mensaje = config.getInitParameter("mensaje");
        version = config.getInitParameter("version");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // Configurar tipo de contenido
        resp.setContentType("text/html");

        // Obtener PrintWriter para escribir la respuesta
        PrintWriter out = resp.getWriter();

        // Escribir respuesta simple
        out.println("<h1>" + mensaje + "</h1>");
        out.println("<h2>" + version + "</h2>");

        // Información adicional para mostrar la diferencia
        out.println("<p><strong>Tipo:</strong> Servlet configurado con anotaciones</p>");
        out.println("<p><strong>URL Pattern:</strong> /anotado</p>");
    }
}