package com.ejemplo.servlets;

import java.io.Serializable;

/*
PASOS PARA EJECUTAR:
1. En IntelliJ, abrir el proyecto y poner en la consola: mvn clean package
2. Esto, genera un WAR en la carpeta TARGET  
3. Ese WAR, debemos ponerlo en: C:\xampp\tomcat\webapps
4. Levantar Tomcat, e ir en el navegador a: http://localhost:8080/a6_1/
*/
public class Usuario implements Serializable {
    private String nombre;
    private int edad;

    public Usuario(String nombre, int edad) {
        this.nombre = nombre;    // Asigna nombre recibido al atributo nombre
        this.edad = edad;        // Asigna edad recibida al atributo edad
    }

    /*
    GETTER PARA NOMBRE:
    - Método público que permite leer el valor del atributo privado nombre
    - return nombre: devuelve el valor actual del nombre
    */
    public String getNombre() { 
        return nombre; 
    }

    public int getEdad() { 
        return edad; 
    }

    /*
    SETTER PARA NOMBRE:
    - Método público que permite modificar el valor del atributo privado nombre
    - this.nombre = nombre: asigna el nuevo valor recibido al atributo
    */
    public void setNombre(String nombre) { 
        this.nombre = nombre; 
    }

    public void setEdad(int edad) { 
        this.edad = edad; 
    }
}