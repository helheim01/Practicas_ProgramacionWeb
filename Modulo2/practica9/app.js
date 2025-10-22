// Importar el módulo HTTP
const http = require('http');

// ============================================
// CONFIGURACIÓN
// ============================================

const PUERTO = 3000;
const HOSTNAME = 'localhost';

// ============================================
// FUNCIÓN PARA MANEJAR RUTAS
// ============================================

function manejarPeticion(req, res) {
  const url = req.url;
  const metodo = req.method;
  
  // Log de la petición
  console.log(`[${new Date().toLocaleTimeString()}] ${metodo} ${url}`);
  
  // Configurar headers comunes
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  // Manejar rutas
  if (url === '/' && metodo === 'GET') {
    // Ruta raíz
    res.statusCode = 200;
    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Servidor ITU</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
          }
          .info {
            background: #e8f4f8;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .rutas {
            margin-top: 20px;
          }
          .ruta {
            background: #f9f9f9;
            padding: 10px;
            margin: 10px 0;
            border-left: 4px solid #3498db;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎓 Bienvenido al servidor del ITU</h1>
          
          <div class="info">
            <p><strong>Servidor HTTP corriendo correctamente</strong></p>
            <p>Puerto: ${PUERTO}</p>
            <p>Hora del servidor: ${new Date().toLocaleString('es-AR')}</p>
          </div>
          
          <div class="rutas">
            <h2>Rutas disponibles:</h2>
            
            <div class="ruta">
              <strong>GET /</strong><br>
              Página de inicio (esta página)<br>
              <a href="/">Visitar →</a>
            </div>
            
            <div class="ruta">
              <strong>GET /saludo</strong><br>
              Saludo al visitante<br>
              <a href="/saludo">Visitar →</a>
            </div>
            
            <div class="ruta">
              <strong>GET /fecha</strong><br>
              Muestra la fecha y hora actual<br>
              <a href="/fecha">Visitar →</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    
  } else if (url === '/saludo' && metodo === 'GET') {
    // Ruta /saludo
    res.statusCode = 200;
    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Saludo - Servidor ITU</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
            text-align: center;
          }
          .container {
            background: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #27ae60;
            font-size: 3em;
          }
          p {
            color: #7f8c8d;
            font-size: 1.2em;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          a:hover {
            background: #2980b9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>👋 ¡Hola visitante!</h1>
          <p>Bienvenido a nuestro servidor</p>
          <p>Hora de la visita: ${new Date().toLocaleString('es-AR')}</p>
          <a href="/">← Volver al inicio</a>
        </div>
      </body>
      </html>
    `);
    
  } else if (url === '/fecha' && metodo === 'GET') {
    // Ruta /fecha
    const ahora = new Date();
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Argentina/Mendoza'
    };
    
    res.statusCode = 200;
    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fecha y Hora - Servidor ITU</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 30px;
          }
          .fecha-grande {
            font-size: 2em;
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
          }
          .detalles {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 30px 0;
          }
          .detalle {
            background: #f1f3f5;
            padding: 15px;
            border-radius: 8px;
          }
          .detalle strong {
            display: block;
            color: #495057;
            margin-bottom: 5px;
          }
          .detalle span {
            font-size: 1.3em;
            color: #667eea;
            font-weight: bold;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
          }
          a:hover {
            background: #764ba2;
          }
          .refresh {
            margin-left: 10px;
            padding: 12px 30px;
            background: #27ae60;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
          }
          .refresh:hover {
            background: #229954;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🕐 Fecha y Hora Actual</h1>
          
          <div class="fecha-grande">
            ${ahora.toLocaleDateString('es-AR', opciones)}
          </div>
          
          <div class="detalles">
            <div class="detalle">
              <strong>📅 Fecha</strong>
              <span>${ahora.toLocaleDateString('es-AR')}</span>
            </div>
            <div class="detalle">
              <strong>🕒 Hora</strong>
              <span>${ahora.toLocaleTimeString('es-AR')}</span>
            </div>
            <div class="detalle">
              <strong>📆 Día de la semana</strong>
              <span>${ahora.toLocaleDateString('es-AR', { weekday: 'long' })}</span>
            </div>
            <div class="detalle">
              <strong>📍 Zona horaria</strong>
              <span>Argentina/Mendoza</span>
            </div>
            <div class="detalle">
              <strong>⏰ Timestamp</strong>
              <span>${ahora.getTime()}</span>
            </div>
            <div class="detalle">
              <strong>🌍 ISO 8601</strong>
              <span>${ahora.toISOString().split('T')[0]}</span>
            </div>
          </div>
          
          <a href="/">← Volver al inicio</a>
          <a href="/fecha" class="refresh">🔄 Actualizar</a>
        </div>
      </body>
      </html>
    `);
    
  } else {
    // Ruta no encontrada - Error 404
    res.statusCode = 404;
    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Página no encontrada</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
            text-align: center;
          }
          .container {
            background: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #e74c3c;
            font-size: 4em;
            margin: 0;
          }
          h2 {
            color: #7f8c8d;
          }
          p {
            color: #95a5a6;
            font-size: 1.1em;
          }
          .ruta-solicitada {
            background: #ecf0f1;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            margin: 20px 0;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 30px;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          a:hover {
            background: #2980b9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>404</h1>
          <h2>❌ Ruta No Encontrada</h2>
          <p>La página que buscas no existe en este servidor.</p>
          
          <div class="ruta-solicitada">
            <strong>Ruta solicitada:</strong> ${url}
          </div>
          
          <p>Por favor, verifica la URL o regresa al inicio.</p>
          
          <a href="/">← Volver al inicio</a>
        </div>
      </body>
      </html>
    `);
  }
}

// ============================================
// CREAR Y ARRANCAR EL SERVIDOR
// ============================================

const servidor = http.createServer(manejarPeticion);

servidor.listen(PUERTO, HOSTNAME, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║              SERVIDOR HTTP INICIADO                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n✓ Servidor corriendo en: http://${HOSTNAME}:${PUERTO}/`);
  console.log(`✓ Hora de inicio: ${new Date().toLocaleString('es-AR')}`);
  console.log('\n📍 Rutas disponibles:');
  console.log(`   • http://${HOSTNAME}:${PUERTO}/`);
  console.log(`   • http://${HOSTNAME}:${PUERTO}/saludo`);
  console.log(`   • http://${HOSTNAME}:${PUERTO}/fecha`);
  console.log('\n💡 Presiona Ctrl+C para detener el servidor\n');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('Log de peticiones:');
  console.log('═══════════════════════════════════════════════════════════\n');
});

// Manejar cierre del servidor
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Deteniendo servidor...');
  servidor.close(() => {
    console.log('✓ Servidor detenido correctamente\n');
    process.exit(0);
  });
});

// Manejar errores del servidor
servidor.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: El puerto ${PUERTO} ya está en uso.`);
    console.error('   Cierra la aplicación que lo está usando o usa otro puerto.\n');
  } else {
    console.error('\n❌ ERROR del servidor:', error.message, '\n');
  }
  process.exit(1);
});