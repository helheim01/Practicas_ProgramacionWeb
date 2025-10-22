//SERVLET: Clase Java que puede recibir y responder peticiones HTTP Funciona como el "backend" de tu aplicación web
package com.ejemplo;
import javax.servlet.*;          // Clases básicas para servlets
import javax.servlet.http.*;     // Clases específicas para HTTP (GET, POST, etc.)
import java.io.IOException;      // Para manejar errores de entrada/salida
import java.io.PrintWriter;      // Para "escribir" la respuesta al navegador

public class HolaServlet extends HttpServlet { //HttpServlet es una clase que ya tiene todo lo necesario para ser un servidor web

    // MÉTODO doGet()----Devuelve JSON
    //Get: Para obtener/mostrar información (como leer un libro)
    @Override  // Indica que estamos sobrescribiendo un método de la clase padre
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    /*
     * PARÁMETROS:
     * • HttpServletRequest request → Contiene TODO lo que envió el navegador
     *   - Parámetros de la URL (?nombre=Juan&edad=25)
     *   - Headers, cookies, información del navegador
     *   - Es como el "sobre" de una carta con la dirección y remitente
     * 
     * • HttpServletResponse response → Lo que vamos a enviar de vuelta
     *   - El contenido de la respuesta (HTML, JSON, etc.)
     *   - Headers, tipo de contenido, códigos de estado
     *   - Es como la "hoja en blanco" donde escribimos la respuesta
     */

        // Tomo los parametros de la URL después del ? (/hola?nombre=Juan&edad=25)
        String nombre = request.getParameter("nombre");
        String edad = request.getParameter("edad");
        //Si no existe el parámetro, devuelve null. SIEMPRE devuelve String, aunque sea un número

        // Valido que el nombre exista en la URL, y si está vacío.
        if (nombre == null || nombre.isEmpty()) {
            nombre = "invitado";
        }
        if (edad == null || edad.isEmpty()) {
            edad = "desconocida";
        }

        response.setContentType("application/json;charset=UTF-8"); //setContentType() le dice al navegador: "Lo que te voy a enviar es JSON"

        // Obtengo el escritor para preparar el JSON (lo que voy a mostrar en el div de respuesta)
        PrintWriter out = response.getWriter();

        // Genero la respuesta JSON
        out.write("{\"mensaje\":\"Hola, " + nombre + ". Tienes " + edad + " años.\"}");
    }

    // MÉTODO doPost()----Devuelve HTML y valida si es mayor de edad
    //Post: Para enviar/modificar información (como enviar una carta). Los parámetros vienen en el BODY, no en la URL
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        //Obtengo los parametros 
        String nombre = request.getParameter("nombre");
        String edadStr = request.getParameter("edad");

        // Configuro la respuesta del HTML
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        // Valido datos
        int edad = 0;
        try {
            edad = Integer.parseInt(edadStr); //convierte String a int
        } catch (NumberFormatException e) { //Si edadStr no es un número válido ("abc", ""), lanza excepción
            
            out.println("<html><body>");
            out.println("<h2>Error: la edad debe ser un número válido.</h2>");
            out.println("</body></html>");
            return; // Return para no continuar ejecutando el resto del código

        }

        //Mayor o menor de edad
        String mayorOMenor = (edad >= 18) ? "mayor" : "menor";
        out.println("<html><body>"); //El navegador interpreta este HTML y lo muestra como página web
        out.println("<h2>El usuario " + nombre + " tiene " + edad + " años. Es " + mayorOMenor + " de edad.</h2>");
        out.println("</body></html>");
    }
}