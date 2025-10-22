// Función para generar un estado aleatorio
function generarEstadoAleatorio() {
  const estados = ["pendiente", "procesado", "error"];
  const indiceAleatorio = Math.floor(Math.random() * estados.length);
  return estados[indiceAleatorio];
}

// Array de pedidos con estados aleatorios
const pedidos = [
  {
    id: 1,
    producto: "Laptop Dell XPS 15",
    cantidad: 2,
    estado: generarEstadoAleatorio()
  },
  {
    id: 2,
    producto: "Mouse Logitech MX Master",
    cantidad: 5,
    estado: generarEstadoAleatorio()
  },
  {
    id: 3,
    producto: "Teclado Mecánico",
    cantidad: 3,
    estado: generarEstadoAleatorio()
  },
  {
    id: 4,
    producto: "Monitor 27 pulgadas",
    cantidad: 1,
    estado: generarEstadoAleatorio()
  },
  {
    id: 5,
    producto: "Webcam HD",
    cantidad: 4,
    estado: generarEstadoAleatorio()
  },
  {
    id: 6,
    producto: "Auriculares Bluetooth",
    cantidad: 6,
    estado: generarEstadoAleatorio()
  },
  {
    id: 7,
    producto: "Disco SSD 1TB",
    cantidad: 2,
    estado: generarEstadoAleatorio()
  },
  {
    id: 8,
    producto: "Cable USB-C",
    cantidad: 10,
    estado: generarEstadoAleatorio()
  }
];

// Función principal para procesar pedidos
function procesarPedidos(pedidos) {
  console.log("=== INICIANDO PROCESAMIENTO DE PEDIDOS ===\n");
  
  // Iniciar temporizador
  console.time("Tiempo de procesamiento");
  
  // Contadores para el resumen
  let contadores = {
    procesado: 0,
    pendiente: 0,
    error: 0
  };
  
  // Recorrer cada pedido
  for (let i = 0; i < pedidos.length; i++) {
    const pedido = pedidos[i];
    
    // Procesar según el estado
    if (pedido.estado === "procesado") {
      console.log(
        `✓ Pedido #${pedido.id} PROCESADO: ${pedido.producto} (Cantidad: ${pedido.cantidad})`
      );
      contadores.procesado++;
    } else if (pedido.estado === "pendiente") {
      console.warn(
        `⚠ Pedido #${pedido.id} PENDIENTE: ${pedido.producto} (Cantidad: ${pedido.cantidad})`
      );
      contadores.pendiente++;
    } else if (pedido.estado === "error") {
      console.error(
        `✗ Pedido #${pedido.id} ERROR: ${pedido.producto} (Cantidad: ${pedido.cantidad})`
      );
      contadores.error++;
    }
  }
  
  // Finalizar temporizador
  console.timeEnd("Tiempo de procesamiento");
  
  // Mostrar tabla con todos los pedidos
  console.log("\n=== TABLA DE PEDIDOS ===");
  console.table(pedidos);
  
  // Mostrar resumen
  console.log("\n=== RESUMEN DE PEDIDOS ===");
  console.log(`Total de pedidos procesados: ${contadores.procesado}`);
  console.log(`Total de pedidos pendientes: ${contadores.pendiente}`);
  console.log(`Total de pedidos con error: ${contadores.error}`);
  console.log(`TOTAL GENERAL: ${pedidos.length} pedidos`);
  
  // Mostrar resumen en tabla
  console.log("\n=== RESUMEN EN TABLA ===");
  console.table(contadores);
}

// Ejecutar el procesador de pedidos
procesarPedidos(pedidos);

// Exportar funciones para uso en otros módulos
module.exports = { procesarPedidos, generarEstadoAleatorio };