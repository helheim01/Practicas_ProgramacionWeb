// ============================================
// BASE DE DATOS FICTICIA
// ============================================

const usuarios = [
  { id: 1, nombre: "Juan Pérez", email: "juan@email.com" },
  { id: 2, nombre: "María García", email: "maria@email.com" },
  { id: 3, nombre: "Carlos López", email: "carlos@email.com" }
];

const pedidos = [
  { id: 101, userId: 1, fecha: "2025-10-15", total: 150.50 },
  { id: 102, userId: 1, fecha: "2025-10-18", total: 200.00 },
  { id: 103, userId: 2, fecha: "2025-10-20", total: 75.25 },
  { id: 104, userId: 3, fecha: "2025-10-21", total: 320.00 }
];

const detallesPedidos = [
  { orderId: 101, producto: "Laptop", cantidad: 1, precio: 150.50 },
  { orderId: 102, producto: "Mouse", cantidad: 2, precio: 100.00 },
  { orderId: 102, producto: "Teclado", cantidad: 1, precio: 100.00 },
  { orderId: 103, producto: "Monitor", cantidad: 1, precio: 75.25 },
  { orderId: 104, producto: "Impresora", cantidad: 1, precio: 320.00 }
];

// ============================================
// FUNCIONES QUE RETORNAN PROMESAS
// ============================================

// 1. getUser(id) - Resuelve tras 2 segundos
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = usuarios.find(u => u.id === id);
      if (usuario) {
        console.log(`✓ Usuario encontrado: ${usuario.nombre}`);
        resolve(usuario);
      } else {
        reject(new Error(`Usuario con ID ${id} no encontrado`));
      }
    }, 2000);
  });
}

// 2. getOrdersByUser(userId) - Resuelve tras 1 segundo
function getOrdersByUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pedidosUsuario = pedidos.filter(p => p.userId === userId);
      console.log(`✓ Pedidos encontrados para usuario ${userId}: ${pedidosUsuario.length}`);
      resolve(pedidosUsuario);
    }, 1000);
  });
}

// 3. getOrderDetails(orderId) - Resuelve tras 1.5 segundos
function getOrderDetails(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const detalles = detallesPedidos.filter(d => d.orderId === orderId);
      if (detalles.length > 0) {
        console.log(`✓ Detalles del pedido ${orderId} obtenidos`);
        resolve(detalles);
      } else {
        reject(new Error(`No se encontraron detalles para el pedido ${orderId}`));
      }
    }, 1500);
  });
}

// ============================================
// PARTE A: CON then() Y catch()
// ============================================

function obtenerDatosConThen(userId) {
  console.log("\n========================================");
  console.log("PARTE A: Usando then() y catch()");
  console.log("========================================\n");
  console.log(`Buscando información del usuario ${userId}...\n`);

  getUser(userId)
    .then(usuario => {
      console.log(`\nUsuario: ${usuario.nombre} (${usuario.email})`);
      return getOrdersByUser(usuario.id);
    })
    .then(pedidosUsuario => {
      if (pedidosUsuario.length === 0) {
        console.log("\nEste usuario no tiene pedidos.");
        return;
      }

      console.log(`\n--- Procesando ${pedidosUsuario.length} pedido(s) ---\n`);

      // Procesar cada pedido secuencialmente
      let promesaActual = Promise.resolve();

      pedidosUsuario.forEach(pedido => {
        promesaActual = promesaActual.then(() => {
          console.log(`\nPedido #${pedido.id} - Fecha: ${pedido.fecha} - Total: $${pedido.total}`);
          return getOrderDetails(pedido.id);
        })
        .then(detalles => {
          console.log("  Detalles:");
          detalles.forEach(detalle => {
            console.log(`    - ${detalle.producto}: ${detalle.cantidad} x $${detalle.precio}`);
          });
        });
      });

      return promesaActual;
    })
    .then(() => {
      console.log("\n✓ Proceso completado exitosamente\n");
    })
    .catch(error => {
      console.error(`\n✗ Error: ${error.message}\n`);
    });
}

// ============================================
// PARTE B: CON async/await
// ============================================

async function obtenerDatosConAsync(userId) {
  console.log("\n========================================");
  console.log("PARTE B: Usando async/await");
  console.log("========================================\n");
  console.log(`Buscando información del usuario ${userId}...\n`);

  try {
    // Obtener usuario
    const usuario = await getUser(userId);
    console.log(`\nUsuario: ${usuario.nombre} (${usuario.email})`);

    // Obtener pedidos del usuario
    const pedidosUsuario = await getOrdersByUser(usuario.id);

    if (pedidosUsuario.length === 0) {
      console.log("\nEste usuario no tiene pedidos.");
      return;
    }

    console.log(`\n--- Procesando ${pedidosUsuario.length} pedido(s) ---\n`);

    // Procesar cada pedido
    for (const pedido of pedidosUsuario) {
      console.log(`\nPedido #${pedido.id} - Fecha: ${pedido.fecha} - Total: $${pedido.total}`);
      
      const detalles = await getOrderDetails(pedido.id);
      console.log("  Detalles:");
      detalles.forEach(detalle => {
        console.log(`    - ${detalle.producto}: ${detalle.cantidad} x $${detalle.precio}`);
      });
    }

    console.log("\n✓ Proceso completado exitosamente\n");

  } catch (error) {
    console.error(`\n✗ Error: ${error.message}\n`);
  }
}

// ============================================
// EJECUCIÓN DEL PROGRAMA
// ============================================

// Ejecutar Parte A con then/catch
obtenerDatosConThen(1);

// Ejecutar Parte B con async/await después de 10 segundos
// (para que no se mezclen las salidas en consola)
setTimeout(() => {
  obtenerDatosConAsync(2);
}, 10000);

// Ejemplo de error: usuario no encontrado (descomentar para probar)
// setTimeout(() => {
//   obtenerDatosConAsync(999);
// }, 20000);

// Exportar funciones
module.exports = {
  getUser,
  getOrdersByUser,
  getOrderDetails,
  obtenerDatosConThen,
  obtenerDatosConAsync
};