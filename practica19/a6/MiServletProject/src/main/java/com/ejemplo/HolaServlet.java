package com.ejemplo;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class HolaServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Obtener parámetros
        String nombre = request.getParameter("nombre");
        String edad = request.getParameter("edad");

        if (nombre == null || nombre.isEmpty()) {
            nombre = "invitado";
        }
        if (edad == null || edad.isEmpty()) {
            edad = "desconocida";
        }

        // Configuro la respuesta como JSON
        response.setContentType("application/json;charset=UTF-8");

        PrintWriter out = response.getWriter();
        out.write("{\"mensaje\":\"Hola, " + nombre + ". Tienes " + edad + " años.\"}");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Tomo parámetros enviados desde el formulario
        String nombre = request.getParameter("nombre");
        String edadStr = request.getParameter("edad");

        // Configuro la respuesta como HTML
        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = response.getWriter();

        int edad = 0;
        try {
            edad = Integer.parseInt(edadStr);
        } catch (NumberFormatException e) {
            out.println("<html><body>");
            out.println("<h2>Error: la edad debe ser un número válido.</h2>");
            out.println("</body></html>");
            return;
        }

        // Determino si es mayor o menor de edad
        String mayorOMenor = (edad >= 18) ? "mayor" : "menor";

        // Respuesta al cliente
        out.println("<html><body>");
        out.println("<h2>El usuario " + nombre + " tiene " + edad + " años. Es " + mayorOMenor + " de edad.</h2>");
        out.println("</body></html>");
    }
}
