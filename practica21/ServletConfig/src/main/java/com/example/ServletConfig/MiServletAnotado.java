package com.example.ServletConfig;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;    // Para parámetros de inicialización
import jakarta.servlet.annotation.WebServlet;      // Para configuración del servlet
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//CONFIGURACIÓN CON ANOTACIONES - ENFOQUE MODERNO: Todo se configura aquí en el código Java, no en web.xml
@WebServlet(
        name = "MiServletAnotado",                    // Nombre del servlet (equivale a <servlet-name>)
        urlPatterns = {"/anotado"},                   // URL que activa este servlet (equivale a <url-pattern>)
        initParams = {                                // Parámetros de inicialización (equivale a <init-param>)
                @WebInitParam(name = "mensaje", value = "Hola soy un Servlet con anotaciones"),
                @WebInitParam(name = "version", value = "2.0")
        }
)
public class MiServletAnotado extends HttpServlet {
    // CAMPOS PARA ALMACENAR CONFIGURACIÓN (igual que MiServlet)
    private String mensaje;
    private String version;

    /**
     * INICIALIZACIÓN - IDÉNTICA A MiServlet
     * - La diferencia está en DÓNDE están los parámetros (anotación vs web.xml)
     * - El código Java es exactamente igual
     */
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);  // OBLIGATORIO
        
        // LEER PARÁMETROS - Funciona igual, pero los valores vienen de @WebInitParam
        mensaje = config.getInitParameter("mensaje");  // Lee valor de la anotación
        version = config.getInitParameter("version");  // Lee valor de la anotación
    }

    //MANEJO DE PETICIONES GET: Funciona igual que MiServlet + información adicional
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // CONFIGURAR RESPUESTA (igual que MiServlet)
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();

        // HTML BÁSICO (igual que MiServlet)
        out.println("<h1>" + mensaje + "</h1>");
        out.println("<h2>" + version + "</h2>");

        // INFORMACIÓN ADICIONAL - Demuestra la diferencia
        out.println("<p><strong>Tipo:</strong> Servlet configurado con anotaciones</p>");
        out.println("<p><strong>URL Pattern:</strong> /anotado</p>");
        
        // Resultado final: muestra que usa anotaciones en lugar de web.xml
    }
}

/*
COMPARACIÓN: ANOTACIONES vs WEB.XML

ANOTACIONES (@WebServlet):
✓ Todo en un lugar (código Java)
✓ Más compacto y legible
✓ No necesita web.xml para este servlet
✗ Configuración "hardcodeada" en código
✗ Requiere recompilar para cambios

WEB.XML (MiServlet):
✓ Configuración externa y flexible
✓ Se puede cambiar sin recompilar
✓ Mejor para múltiples entornos (dev/prod)
✗ Más archivos que mantener
✗ Configuración separada del código

FUNCIONAMIENTO IDÉNTICO:
- Ambos servlets funcionan exactamente igual
- Mismo ciclo de vida: init() → doGet()
- Misma forma de leer parámetros con getInitParameter()
- La única diferencia es DÓNDE están los valores configurados

FLUJO DE EJECUCIÓN:
1. Usuario visita /anotado
2. Tomcat ejecuta doGet()
3. Genera HTML con valores de las anotaciones
4. Muestra: "Hola soy un Servlet con anotaciones" y "2.0"
*/