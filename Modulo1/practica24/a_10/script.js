// ==========================================
// FUNCIÓN 1: MANDO EL ID AL SERVIDOR PARA AGREGAR EL PRODUCTO Y REFRESCAR EL CARRITO
// ==========================================

// Función que recibe el ID del producto a agregar
function agregarAlCarrito(idProducto) {
  
  // Creo objeto XMLHttpRequest para comunicación asíncrona con el servidor (API nativa de JavaScript para peticiones HTTP)
  const xhr = new XMLHttpRequest();
  
  //Le hago un POST a carrito.php para enviarle el id del producto añadido al carrito
  xhr.open("POST", "carrito.php", true);
  
  // Uso el header "application/x-www-form-urlencoded" → simula envío de formulario clásico.
  // Necesario para que el servidor interprete correctamente los datos POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  // Defino callback que maneja la respuesta del servidor (onreadystatechange: se ejecuta cada vez que cambia el estado de la petición)
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) { 
      // Cuando recibe confirmación del servidor (estado listo y HTTP 200), llama a actualizarCarrito() para refrescar la vista del carrito.
      actualizarCarrito();
    }
  };
  
  // Envío el dato en formato id=123 como dato POST
  // encodeURIComponent(): codifica el ID para URL segura (previene caracteres especiales)
  xhr.send("id=" + encodeURIComponent(idProducto)); // Formato enviado: "id=123" (123=idProducto)
}

// ==========================================
// FUNCIÓN 2: ACTUALIZAR CONTADOR y LISTA VISIBLE DEL CARRITO
// ==========================================

// Función que obtiene y muestra el estado actual del carrito. Se ejecuta después de agregar/vaciar items para mantener UI sincronizada
function actualizarCarrito() {
    const xhr = new XMLHttpRequest();
  
  // Hago un GET a listar_carrito.php, para que me muestre los productos con sus cantidades que hay en el carrito
  xhr.open("GET", "listar_carrito.php", true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      
      // La respuesta del servidor (listar_carrito.php) debe ser en JSON con estructura: {totalItems: x, items: [...]}
      const data = JSON.parse(xhr.responseText);
      
      // Actualizo el contador de items en el carrito en el 🛒 Carrito (<span id="cantidad">0</span> items)
      document.getElementById("cantidad").textContent = data.totalItems; // data.totalItems=número total de productos en carrito
      
      //Genero dinámicamente un <ul> con <li> por cada producto.
      let html = "<ul>";
      // Itero sobre cada item del carrito devuelto por el servidor
      data.items.forEach(item => {
        html += `<li>${item.nombre} - ${item.cantidad}</li>`;
      });
      html += "</ul>";                           // Cierra lista HTML
      
      // En el div con id="contenido-carrito" pongo la lista
      document.getElementById("contenido-carrito").innerHTML = html;
    }
  };
  
  // Envía petición GET
  xhr.send();
}

// ==========================================
// FUNCIÓN 3: VACIAR CARRITO COMPLETO
// ==========================================

function vaciarCarrito() {
    const xhr = new XMLHttpRequest();

  // Le hago un GET para que me traiga el vaciar_carrito.php (que borra todo el contenido del carrito) y lo muestre vacío
  xhr.open("GET", "vaciar_carrito.php", true);
  
  // Defino callback que maneja confirmación de vaciado
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Actualizo vista tras vaciar carrito
      actualizarCarrito();
    }
  };
  
  // Envío petición de vaciado
  xhr.send();
}


// Se ejecuta cuando la página termina de cargar (window.onload se dispara después de que HTML, CSS, imágenes, etc. estén listos)
window.onload = actualizarCarrito;