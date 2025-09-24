function agregarAlCarrito(idProducto) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "carrito.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) { //readyState==4: la operación finalizó
      actualizarCarrito();
    }
  };
  xhr.send("id=" + encodeURIComponent(idProducto));
}


function actualizarCarrito() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "listar_carrito.php", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("cantidad").textContent = data.totalItems;
      let html = "<ul>";
      data.items.forEach(item => {
        html += `<li>${item.nombre} - ${item.cantidad}</li>`;
      });
      html += "</ul>";
      document.getElementById("contenido-carrito").innerHTML = html;
    }
  };
  xhr.send();
}


function vaciarCarrito() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "vaciar_carrito.php", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      actualizarCarrito();
    }
  };
  xhr.send();
}


// Cargar carrito al inicio
window.onload = actualizarCarrito;