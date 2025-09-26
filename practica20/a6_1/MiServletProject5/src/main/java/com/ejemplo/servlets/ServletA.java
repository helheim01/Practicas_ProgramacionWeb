package com.ejemplo.servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

/*
SERVLET A: Primer servlet en la cadena de "Servlet Chaining"

¿Qué hace este servlet?
- Recibe peticiones GET desde index.html
- Procesa el parámetro "nombre" del formulario
- Crea un objeto Usuario con los datos
- Pasa el control a ServletB usando forward()
- NO genera respuesta HTML directa (eso lo hace ServletB)
*/
public class ServletA extends HttpServlet {
    
    /*
    MÉTODO doGet(): Maneja peticiones HTTP GET
    - Se ejecuta cuando llega una petición GET a este servlet
    - HttpServletRequest req: contiene datos de la petición (parámetros, headers, etc.)
    - HttpServletResponse resp: para enviar respuesta al cliente
    - throws: declara que puede lanzar excepciones ServletException e IOException
    */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        /*
        OBTENER PARÁMETRO DEL FORMULARIO:
        - req.getParameter("nombre"): extrae el valor del parámetro "nombre"
        - Si el formulario envió: servletA?nombre=Juan → devuelve "Juan"
        - Si no existe el parámetro → devuelve null
        - String nombre: almacena el valor extraído
        */
        String nombre = req.getParameter("nombre");
        
        /*
        VALIDACIÓN:
        - if (nombre == null): verifica si no se recibió el parámetro
        - nombre.trim().isEmpty(): verifica si está vacío o solo espacios
        - trim(): elimina espacios al inicio y final
        - isEmpty(): verifica si la cadena está vacía después del trim
        - Si cualquier condición es true: asigna "Invitado" como valor por defecto
        */
        if (nombre == null || nombre.trim().isEmpty()) {
            nombre = "Invitado";
        }

        /*
        CREAR OBJETO USUARIO:
        - new Usuario(nombre, 25): crea instancia de la clase Usuario
        - Parámetros: nombre (del formulario o "Invitado") y edad fija 25
        - Usuario user: almacena la referencia al objeto creado
        - Este objeto encapsula los datos que se pasarán al siguiente servlet
        */
        Usuario user = new Usuario(nombre, 25); // edad fija de ejemplo
        
        /*
        ALMACENAR OBJETO EN REQUEST:
        - req.setAttribute("usuario", user): guarda el objeto en el request
        - "usuario": clave/nombre con el que se almacena
        - user: objeto Usuario que se almacena
        - setAttribute(): método para pasar datos entre servlets
        - Los datos almacenados estarán disponibles en ServletB
        */
        req.setAttribute("usuario", user);
        RequestDispatcher rd = req.getRequestDispatcher("/servletB");
        
        /*
        FORWARD A SERVLET B:
        - rd.forward(req, resp): pasa la petición y respuesta a ServletB
        - req: petición original con los datos agregados (usuario)
        - resp: respuesta que ServletB usará para generar HTML
        - Después de forward(), ServletA termina su ejecución
        - ServletB toma el control y genera la respuesta final
        */
        rd.forward(req, resp);
    }
}

/*
CONCEPTOS IMPORTANTES:

1. SERVLET CHAINING:
   - Técnica donde un servlet procesa datos y pasa control a otro
   - ServletA: procesa y prepara datos
   - ServletB: genera respuesta HTML
   - Permite separar lógica de procesamiento y presentación

2. FORWARD vs REDIRECT:
   - FORWARD: misma petición, URL no cambia, datos se mantienen
   - REDIRECT: nueva petición, URL cambia, datos se pierden
   - Forward es más eficiente para chaining

3. REQUEST SCOPE:
   - setAttribute(): almacena datos solo durante esta petición
   - Los datos desaparecen cuando termina la petición
   - Alternativas: session scope, application scope

4. FLUJO DE EJECUCIÓN:
   1. Usuario envía formulario → ServletA
   2. ServletA recibe parámetro "nombre"
   3. ServletA crea objeto Usuario
   4. ServletA almacena Usuario en request
   5. ServletA hace forward a ServletB
   6. ServletB recibe request con Usuario
   7. ServletB genera HTML y responde

5. MANEJO DE PARÁMETROS:
   - getParameter() siempre devuelve String o null
   - Importante validar valores null y vacíos
   - trim() elimina espacios inadvertidos
*/