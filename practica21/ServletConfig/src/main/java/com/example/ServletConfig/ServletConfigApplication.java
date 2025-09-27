package com.example.ServletConfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

/**
 * CLASE PRINCIPAL DE SPRING BOOT
 * - Punto de entrada de la aplicación
 * - Registra servlets manualmente (alternativa a web.xml)
 */
@SpringBootApplication  // Combina @Configuration + @EnableAutoConfiguration + @ComponentScan
public class ServletConfigApplication {

	/**
	 * MAIN
	 * - Inicia el servidor embebido de Spring Boot (Tomcat)
	 * - Escanea configuraciones y componentes
	 */
	public static void main(String[] args) {
		SpringApplication.run(ServletConfigApplication.class, args);
		// Al ejecutar: inicia Tomcat en puerto 8080 y carga toda la configuración
	}

	/**
	 * REGISTRO MANUAL DE MiServlet - TERCER ENFOQUE DE CONFIGURACIÓN
	 * - Alternativa a web.xml y @WebServlet
	 * - Configuración programática en Spring Boot
	 */
	@Bean  // Spring gestiona este objeto como un componente
	public ServletRegistrationBean<MiServlet> miServletRegistration() {
		
		// CREAR REGISTRO DEL PRIMER SERVLET (MiServlet)
		ServletRegistrationBean<MiServlet> registration = 
			new ServletRegistrationBean<>(new MiServlet());  // Instancia del servlet
		
		// CONFIGURAR URL (equivale a <url-pattern> en web.xml)
		registration.addUrlMappings("/miservlet");
		
		// CONFIGURAR PARÁMETROS (equivale a <init-param> en web.xml)
		registration.addInitParameter("config", "Hola desde MiServlet configurado manualmente");
		registration.addInitParameter("version", "1.0");
		
		// NOMBRE DEL SERVLET (equivale a <servlet-name> en web.xml)
		registration.setName("MiServlet");
		
		return registration;  // Spring registra automáticamente el servlet
	}

	/**
	 * REGISTRO MANUAL DE MiServletAnotado
	 * - Demuestra que INCLUSO servlets con @WebServlet se pueden registrar manualmente
	 * - Los valores aquí SOBRESCRIBEN los de las anotaciones
	 */
	@Bean
	public ServletRegistrationBean<MiServletAnotado> miServletAnotadoRegistration() {
		
		// CREAR REGISTRO
		ServletRegistrationBean<MiServletAnotado> registration = 
			new ServletRegistrationBean<>(new MiServletAnotado());
		
		// CONFIGURAR URL Y PARÁMETROS
		registration.addUrlMappings("/anotado");
		registration.addInitParameter("mensaje", "Hola soy un Servlet con anotaciones");
		registration.addInitParameter("version", "2.0");
		registration.setName("MiServletAnotado");
		
		return registration;
	}
}

/*
TRES ENFOQUES DE CONFIGURACIÓN EN ESTE PROYECTO:

1. WEB.XML (MiServlet):
   - Configuración externa en archivo XML
   - Enfoque tradicional de Java EE

2. ANOTACIONES (@WebServlet en MiServletAnotado):
   - Configuración en el código Java
   - Enfoque moderno de Java EE

3. SPRING BOOT BEANS (esta clase):
   - Configuración programática con métodos @Bean
   - Enfoque Spring Boot (más flexible)

PRECEDENCIA Y FUNCIONAMIENTO:
- Spring Boot puede usar los tres enfoques simultáneamente
- Los @Bean tienen precedencia sobre @WebServlet y web.xml
- En este proyecto: los @Bean "duplican" la configuración para demostración
- En producción, elegirías UN enfoque consistente

¿POR QUÉ SPRING BOOT AQUÍ?
- Proporciona servidor embebido (no necesitas instalar Tomcat separado)
- Autoconfigura muchas cosas automáticamente
- Permite combinar configuración tradicional con moderna
- Facilita el desarrollo y despliegue

FLUJO DE EJECUCIÓN:
1. java -jar app.jar (o desde IDE)
2. main() ejecuta SpringApplication.run()
3. Spring Boot inicia Tomcat embebido
4. Registra los @Bean como servlets
5. Carga web.xml si existe
6. Aplicación lista en http://localhost:8080
*/