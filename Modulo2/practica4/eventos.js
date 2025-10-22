// Importar el módulo EventEmitter
const EventEmitter = require('events');

// ============================================
// CLASE GESTOR DE USUARIOS
// ============================================

class GestorUsuarios extends EventEmitter {
  constructor() {
    super();
    this.usuariosActivos = new Set();
  }

  // Método para iniciar sesión
  login(usuario) {
    if (this.usuariosActivos.has(usuario)) {
      this.emit('error', {
        tipo: 'LOGIN_DUPLICADO',
        mensaje: `El usuario "${usuario}" ya está conectado`
      });
      return;
    }

    this.usuariosActivos.add(usuario);
    this.emit('login', {
      usuario: usuario,
      timestamp: new Date().toISOString(),
      usuariosConectados: this.usuariosActivos.size
    });
  }

  // Método para enviar mensaje
  enviarMensaje(usuario, mensaje) {
    // Validar que el usuario esté activo
    if (!this.usuariosActivos.has(usuario)) {
      this.emit('error', {
        tipo: 'USUARIO_NO_ACTIVO',
        mensaje: `El usuario "${usuario}" no está conectado`,
        usuario: usuario
      });
      return;
    }

    // Validar que el mensaje no esté vacío
    if (!mensaje || mensaje.trim() === '') {
      this.emit('error', {
        tipo: 'MENSAJE_VACIO',
        mensaje: `El usuario "${usuario}" intentó enviar un mensaje vacío`,
        usuario: usuario
      });
      return;
    }

    // Emitir evento de mensaje válido
    this.emit('mensaje', {
      usuario: usuario,
      mensaje: mensaje,
      timestamp: new Date().toISOString()
    });
  }

  // Método para cerrar sesión
  logout(usuario) {
    if (!this.usuariosActivos.has(usuario)) {
      this.emit('error', {
        tipo: 'LOGOUT_INVALIDO',
        mensaje: `El usuario "${usuario}" no estaba conectado`,
        usuario: usuario
      });
      return;
    }

    this.usuariosActivos.delete(usuario);
    this.emit('logout', {
      usuario: usuario,
      timestamp: new Date().toISOString(),
      usuariosConectados: this.usuariosActivos.size
    });
  }

  // Método para obtener usuarios activos (útil para debugging)
  obtenerUsuariosActivos() {
    return Array.from(this.usuariosActivos);
  }
}

// ============================================
// CONFIGURAR LISTENERS DE EVENTOS
// ============================================

const gestor = new GestorUsuarios();

// Listener para evento "login"
gestor.on('login', (data) => {
  console.log('\n✓ [LOGIN]');
  console.log(`  Usuario: ${data.usuario}`);
  console.log(`  Hora: ${data.timestamp}`);
  console.log(`  Usuarios conectados: ${data.usuariosConectados}`);
});

// Listener para evento "mensaje"
gestor.on('mensaje', (data) => {
  console.log('\n💬 [MENSAJE]');
  console.log(`  De: ${data.usuario}`);
  console.log(`  Mensaje: "${data.mensaje}"`);
  console.log(`  Hora: ${data.timestamp}`);
});

// Listener para evento "logout"
gestor.on('logout', (data) => {
  console.log('\n✗ [LOGOUT]');
  console.log(`  Usuario: ${data.usuario}`);
  console.log(`  Hora: ${data.timestamp}`);
  console.log(`  Usuarios conectados: ${data.usuariosConectados}`);
});

// Listener para evento "error"
gestor.on('error', (data) => {
  console.error('\n⚠️  [ERROR]');
  console.error(`  Tipo: ${data.tipo}`);
  console.error(`  Mensaje: ${data.mensaje}`);
  if (data.usuario) {
    console.error(`  Usuario: ${data.usuario}`);
  }
});

// ============================================
// SIMULACIÓN DE ACCIONES ASINCRÓNICAS
// ============================================

console.log('===========================================');
console.log('  SIMULADOR DE GESTOR DE USUARIOS');
console.log('===========================================');
console.log('\nIniciando simulación...\n');

// Usuario 1: Ana se conecta
setTimeout(() => {
  gestor.login('Ana');
}, 500);

// Usuario 2: Carlos se conecta
setTimeout(() => {
  gestor.login('Carlos');
}, 1000);

// Ana envía un mensaje
setTimeout(() => {
  gestor.enviarMensaje('Ana', '¡Hola a todos!');
}, 1500);

// Usuario 3: María se conecta
setTimeout(() => {
  gestor.login('María');
}, 2000);

// Carlos envía un mensaje
setTimeout(() => {
  gestor.enviarMensaje('Carlos', 'Hola Ana, ¿cómo estás?');
}, 2500);

// María envía un mensaje
setTimeout(() => {
  gestor.enviarMensaje('María', 'Buenos días a todos');
}, 3000);

// Error: Usuario no conectado intenta enviar mensaje
setTimeout(() => {
  gestor.enviarMensaje('Pedro', 'Este mensaje no debería enviarse');
}, 3500);

// Ana envía mensaje vacío (error)
setTimeout(() => {
  gestor.enviarMensaje('Ana', '   ');
}, 4000);

// Carlos se desconecta
setTimeout(() => {
  gestor.logout('Carlos');
}, 4500);

// Ana envía otro mensaje
setTimeout(() => {
  gestor.enviarMensaje('Ana', 'Carlos se fue :(');
}, 5000);

// Error: Carlos intenta enviar mensaje después de desconectarse
setTimeout(() => {
  gestor.enviarMensaje('Carlos', 'Mensaje después de logout');
}, 5500);

// María se desconecta
setTimeout(() => {
  gestor.logout('María');
}, 6000);

// Error: Intento de logout de usuario no conectado
setTimeout(() => {
  gestor.logout('Pedro');
}, 6500);

// Ana intenta conectarse de nuevo (error: ya está conectada)
setTimeout(() => {
  gestor.login('Ana');
}, 7000);

// Ana se desconecta
setTimeout(() => {
  gestor.logout('Ana');
}, 7500);

// Mostrar resumen final
setTimeout(() => {
  console.log('\n===========================================');
  console.log('  SIMULACIÓN COMPLETADA');
  console.log('===========================================');
  console.log(`Usuarios activos: ${gestor.obtenerUsuariosActivos().length}`);
  if (gestor.obtenerUsuariosActivos().length > 0) {
    console.log(`Lista: ${gestor.obtenerUsuariosActivos().join(', ')}`);
  }
  console.log('\n');
}, 8000);

// Exportar la clase para uso en otros módulos
module.exports = GestorUsuarios;