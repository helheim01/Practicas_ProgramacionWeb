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
  //HttpServlet permite que mi clase funcione como servidor web, procesando peticiones get y post
    

   //MÉTODO doGet(): Se ejecuta cuando llega una petición GET a este servlet
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      //HttpServletRequest req: contiene datos de la petición (parámetros, headers, etc.)
      // HttpServletResponse resp: para enviar respuesta al cliente
            throws ServletException, IOException {

        
        //OBTENER PARÁMETRO DEL FORMULARIO:
        String nombre = req.getParameter("nombre");
        if (nombre == null || nombre.trim().isEmpty()) { //verifica si no se recibió el parámetro y si está vacío o solo espacios
            nombre = "Invitado";
        }
        
      //CREAR OBJETO USUARIO: Este objeto encapsula los datos que se pasarán al siguiente servlet
        Usuario user = new Usuario(nombre, 25); // crea instancia de la clase Usuario; usamos una edad fija de ejemplo
        
        /*
        ALMACENAR OBJETO EN REQUEST:
        - "usuario": clave/nombre con el que se almacena
        - user: objeto Usuario que se almacena
        - setAttribute(): método para pasar datos entre servlets
        - Los datos almacenados estarán disponibles en ServletB
        */
        req.setAttribute("usuario", user); //guarda el objeto en el request
        RequestDispatcher rd = req.getRequestDispatcher("/servletB");
        
        /*
        FORWARD A SERVLET B:
        - req: petición original con los datos agregados (usuario)
        - resp: respuesta que ServletB usará para editar y persistir en la DB
        - Después de forward(), ServletA termina su ejecución
        */
        rd.forward(req, resp); //pasa la petición y respuesta a ServletB
    }
}