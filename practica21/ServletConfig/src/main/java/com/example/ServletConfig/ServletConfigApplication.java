package com.example.ServletConfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServletConfigApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServletConfigApplication.class, args);
	}

	// Registro manual de MiServlet
	@Bean
	public ServletRegistrationBean<MiServlet> miServletRegistration() {
		ServletRegistrationBean<MiServlet> registration = new ServletRegistrationBean<>(new MiServlet());
		registration.addUrlMappings("/miservlet");
		registration.addInitParameter("config", "Hola desde MiServlet configurado manualmente");
		registration.addInitParameter("version", "1.0");
		registration.setName("MiServlet");
		return registration;
	}

	// Registro manual de MiServletAnotado
	@Bean
	public ServletRegistrationBean<MiServletAnotado> miServletAnotadoRegistration() {
		ServletRegistrationBean<MiServletAnotado> registration = new ServletRegistrationBean<>(new MiServletAnotado());
		registration.addUrlMappings("/anotado");
		registration.addInitParameter("mensaje", "Hola soy un Servlet con anotaciones");
		registration.addInitParameter("version", "2.0");
		registration.setName("MiServletAnotado");
		return registration;
	}
}