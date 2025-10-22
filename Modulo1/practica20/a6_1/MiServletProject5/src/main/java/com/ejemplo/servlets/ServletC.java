package com.ejemplo.servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

/*
SERVLET C: Servlet final de la cadena
- Recibe objeto Usuario desde ServletB
- Genera respuesta HTML para mostrar al usuario
- Termina la cadena de servlets
*/
public class ServletC extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // Recuperar objeto Usuario procesado por servlets anteriores
        Usuario user = (Usuario) req.getAttribute("usuario");

        // Configurar tipo de contenido de la respuesta
        resp.setContentType("text/html;charset=UTF-8");    // HTML con codificación UTF-8
        PrintWriter out = resp.getWriter();                // Objeto para escribir HTML al navegador

        // Generar página HTML de respuesta
        out.println("<html><body>");
        out.println("<h1>Resultado Final</h1>");
        
        if (user != null) {
            // Mostrar datos del usuario procesado
            out.println("<p>Nombre: " + user.getNombre() + "</p>");    // Nombre modificado por ServletB (user.setNombre(user.getNombre() + " (procesado en B)");)
            out.println("<p>Edad: " + user.getEdad() + "</p>");        // Edad modificada por ServletB (+5)
        } else {
            // Mensaje si no se recibió usuario
            out.println("<p>No se recibió usuario.</p>");
        }
        
        out.println("</body></html>");// Cerrar HTML
    }
}

/*
RESUMEN DEL FLUJO COMPLETO:

1. index.html → Formulario con nombre
2. ServletA → Recibe nombre, crea Usuario, forward a ServletB
3. ServletB → Modifica Usuario, guarda en BD, forward a ServletC  
4. ServletC → Genera HTML final con datos procesados

Resultado final mostrado al usuario:
- Nombre: [nombre original] (procesado en B)
- Edad: 30 (25 inicial + 5 agregados por ServletB)
*/