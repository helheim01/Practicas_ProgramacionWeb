package com.example.ServletConfig;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * SERVLET CONFIGURADO POR WEB.XML
 * - Lee parámetros desde <init-param> en web.xml
 * - Enfoque tradicional de configuración
 */
public class MiServlet extends HttpServlet {

    // CAMPOS PARA ALMACENAR CONFIGURACIÓN
    private String mensaje;  // Valor del parámetro "config"
    private String version;  // Valor del parámetro "version"

    /**
     * MÉTODO DE INICIALIZACIÓN
     * - Se ejecuta UNA SOLA VEZ cuando Tomcat carga el servlet
     * - Lee los <init-param> del web.xml
     */
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);  // OBLIGATORIO: inicializa la clase padre
        
        // LEER PARÁMETROS DEL WEB.XML
        mensaje = config.getInitParameter("config");   // Lee <param-name>config</param-name>
        version = config.getInitParameter("version");  // Lee <param-name>version</param-name>
    }

    /**
     * MANEJO DE PETICIONES GET
     * - Se ejecuta cada vez que alguien visita /miservlet
     * - Genera respuesta HTML usando parámetros configurados
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // CONFIGURAR RESPUESTA HTTP
        resp.setContentType("text/html");  // Le dice al navegador que es HTML
        PrintWriter out = resp.getWriter(); // Para escribir la respuesta

        // GENERAR HTML DINÁMICO CON VALORES DEL WEB.XML
        out.println("<h1>" + mensaje + "</h1>");   // Título con mensaje configurado
        out.println("<h2>" + version + "</h2>");   // Subtítulo con versión configurada
        
        // Al terminar el método, Tomcat envía automáticamente la respuesta
    }
}

/*
RESUMEN DEL FLUJO:
1. Tomcat lee web.xml y encuentra este servlet
2. Ejecuta init() UNA vez y carga los parámetros
3. Usuario visita /miservlet
4. Ejecuta doGet() y genera HTML con valores del web.xml
5. Navegador muestra: "Hola desde MiServlet configurado en web.xml" y "1.0"

VENTAJAS DE CONFIGURACIÓN XML:
- Parámetros externos (no hardcodeados)
- Se pueden cambiar sin recompilar
- Separación de código y configuración
*/