/*
 * ============================================================================
 * HOLASERVLET.JAVA - SERVLET DE EJEMPLO
 * ============================================================================
 * 
 * ¿QUÉ ES UN SERVLET?
 * • Es una clase Java que puede recibir y responder peticiones HTTP
 * • Funciona como el "backend" de tu aplicación web
 * • Puede procesar datos de formularios, consultar bases de datos, etc.
 * • Es como un "programa servidor" que espera peticiones del navegador
 * 
 * ¿CÓMO FUNCIONA?
 * • El navegador envía una petición HTTP (GET o POST)
 * • El servidor web (Tomcat) recibe la petición
 * • Busca qué servlet debe manejarla (usando web.xml)
 * • Ejecuta el método correspondiente (doGet o doPost)
 * • El servlet genera una respuesta y la envía de vuelta
 * 
 * ESTE SERVLET ESPECÍFICAMENTE:
 * • Recibe nombre y edad como parámetros
 * • En GET: devuelve JSON
 * • En POST: devuelve HTML y valida si es mayor de edad
 * ============================================================================
 */

package com.ejemplo;
import javax.servlet.*;          // Clases básicas para servlets
import javax.servlet.http.*;     // Clases específicas para HTTP (GET, POST, etc.)
import java.io.IOException;      // Para manejar errores de entrada/salida
import java.io.PrintWriter;      // Para "escribir" la respuesta al navegador

public class HolaServlet extends HttpServlet {
/*
 * ¿QUÉ SIGNIFICA "extends HttpServlet"? HttpServlet es una clase que ya tiene todo lo necesario para ser un servidor web
 * • Al heredar de ella, nuestra clase automáticamente puede:
 *   - Recibir peticiones HTTP
 *   - Procesar parámetros
 *   - Enviar respuestas
 *   - Manejar cookies, sesiones, etc.
 */

    // MÉTODO doGet() - MANEJA PETICIONES GET
    @Override  // Indica que estamos sobrescribiendo un método de la clase padre
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    /*
     * ¿CUÁNDO SE EJECUTA?
     * • Cuando el usuario escribe la URL en el navegador
     * • Cuando JavaScript hace una llamada AJAX con método GET
     * 
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

        // EXTRACCIÓN DE PARÁMETROS
        // ====================================================================
        String nombre = request.getParameter("nombre");
        String edad = request.getParameter("edad");
        /*
         * ¿QUÉ HACE getParameter()?
         * • Busca en la URL parámetros enviados después del ?
         * • Ejemplo: /hola?nombre=Juan&edad=25
         *   - request.getParameter("nombre") devuelve "Juan"
         *   - request.getParameter("edad") devuelve "25"
         * • Si no existe el parámetro, devuelve null
         * 
         * SIEMPRE devuelve String, aunque sea un número
         */

        // Validamos que el nombre exista en la URL, y si está vacío.
        //Los usuarios pueden escribir URLs malformadas; JavaScript puede enviar datos vacíos; Sin validación, la aplicación se rompería
        if (nombre == null || nombre.isEmpty()) {
            nombre = "invitado";
        }
        
        if (edad == null || edad.isEmpty()) {
            edad = "desconocida";
        }

        response.setContentType("application/json;charset=UTF-8");
        /*
         * ¿QUÉ HACE setContentType()?
         * • Le dice al navegador: "Lo que te voy a enviar es JSON"
         * • application/json → Tipo MIME para JSON
         */

        // OBTENER EL "ESCRITOR"
        // ====================================================================
        PrintWriter out = response.getWriter();
        /*
         * ¿QUÉ ES PrintWriter?
         * • Es como un "lápiz" para escribir la respuesta
         * • Todo lo que escribas con 'out' se enviará al navegador
         * • Es la conexión directa entre tu código y la pantalla del usuario
         * 
         * ANALOGÍA:
         * • response es como un sobre
         * • PrintWriter es como el lápiz
         * • Lo que escribes va dentro del sobre
         * • El navegador abre el sobre y lee el contenido
         */

        // GENERAR RESPUESTA JSON
        // ====================================================================
        out.write("{\"mensaje\":\"Hola, " + nombre + ". Tienes " + edad + " años.\"}");
        /*
         * CONSTRUCCIÓN DEL JSON:
         * • \" → Comilla escapada (para que sea parte del JSON)
         * • + → Concatenación de strings
         * • El resultado final es: {"mensaje":"Hola, Juan. Tienes 25 años."}
         */
    }

    // MÉTODO doPost() - MANEJA PETICIONES POST
    // ========================================================================
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    /*
     * ¿CUÁNDO SE EJECUTA?
     * • Cuando se envía un formulario HTML con method="POST"
     * • Cuando JavaScript hace AJAX con método POST
     * • Para operaciones que modifican datos (crear, actualizar, eliminar)
     * 
     * GET vs POST:
     * GET  → Para obtener/mostrar información (como leer un libro)
     * POST → Para enviar/modificar información (como enviar una carta)
     */

        // EXTRACCIÓN DE PARÁMETROS POST
        String nombre = request.getParameter("nombre");
        String edadStr = request.getParameter("edad");
        /*
         * IMPORTANTE: En POST, los parámetros vienen en el BODY, no en la URL
         * • getParameter() funciona igual para GET y POST
         * • En POST los datos no aparecen en la barra de direcciones
         * • Es más seguro para datos sensibles (contraseñas, etc.)
         */

        // CONFIGURACIÓN PARA RESPUESTA HTML
        // ====================================================================
        response.setContentType("text/html;charset=UTF-8");
        /*
         * DIFERENCIA CON doGet():
         * • doGet() devuelve JSON → "application/json"
         * • doPost() devuelve HTML → "text/html"
         * 
         * ¿POR QUÉ HTML?
         * • Para mostrar páginas web completas
         * • Para mostrar mensajes de error formateados
         * • Para crear experiencias visuales ricas
         */

        PrintWriter out = response.getWriter();

        // CONVERSIÓN Y VALIDACIÓN DE DATOS
        // ====================================================================
        int edad = 0;
        try {
            edad = Integer.parseInt(edadStr);
        } catch (NumberFormatException e) {
            /*
             * MANEJO DE ERRORES:
             * • Integer.parseInt() convierte String a int
             * • Si edadStr no es un número válido ("abc", ""), lanza excepción
             * • try-catch captura el error para evitar que la aplicación se rompa
             * 
             * EJEMPLOS:
             * • "25" → 25 (exitoso)
             * • "abc" → NumberFormatException
             * • "" → NumberFormatException
             * • null → NullPointerException (por eso validamos antes)
             */
            
            // RESPUESTA DE ERROR
            out.println("<html><body>");
            out.println("<h2>Error: la edad debe ser un número válido.</h2>");
            out.println("</body></html>");
            return; // Return para no continuar ejecutando el resto del código

        }

        // LÓGICA DE NEGOCIO
        String mayorOMenor = (edad >= 18) ? "mayor" : "menor";
        /*
         * EQUIVALE A:
         * String mayorOMenor;
         * if (edad >= 18) {
         *     mayorOMenor = "mayor";
         * } else {
         *     mayorOMenor = "menor";
         * }
         */

        // GENERAR RESPUESTA HTML
        out.println("<html><body>");
        out.println("<h2>El usuario " + nombre + " tiene " + edad + " años. Es " + mayorOMenor + " de edad.</h2>");
        out.println("</body></html>");
        /*
         * CONSTRUCCIÓN DE HTML:
         * • println() añade automáticamente un salto de línea
         * • Cada línea genera parte del HTML final
         * • El navegador interpreta este HTML y lo muestra como página web
         * 
         * RESULTADO FINAL (ejemplo):
         * <html><body>
         * <h2>El usuario Juan tiene 25 años. Es mayor de edad.</h2>
         * </body></html>
         */
    }
}

/*
 * ============================================================================
 * RESUMEN EJECUTIVO
 * ============================================================================
 * 
 * ESTE SERVLET HACE:
 * 1. Recibe peticiones HTTP en dos "sabores":
 *    • GET → Devuelve JSON con saludo simple
 *    • POST → Devuelve HTML con validación de mayoría de edad
 * 
 * 2. Procesa parámetros de entrada:
 *    • nombre → String
 *    • edad → String (convertido a int en POST)
 * 
 * 3. Valida datos:
 *    • Valores por defecto para parámetros vacíos
 *    • Validación numérica para la edad
 * 
 * 4. Genera respuestas dinámicas:
 *    • JSON para APIs/AJAX
 *    • HTML para páginas web
 * 
 * FLUJO TÍPICO:
 * Usuario → Navegador → Tomcat → web.xml → HolaServlet → doGet/doPost → Respuesta → Usuario
 * 
 * ¿POR QUÉ ES ÚTIL?
 * • Base para APIs REST
 * • Procesamiento de formularios
 * • Lógica de negocio en el servidor
 * • Separación entre frontend y backend
 * ============================================================================
 */