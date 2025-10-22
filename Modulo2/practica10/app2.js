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
  
  // Manejar rutas según Content-Type
  if (url === '/' && metodo === 'GET') {
    // Ruta raíz - text/html
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Servidor ITU</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          }
          h1 {
            color: #2c3e50;
            border-bottom: 4px solid #667eea;
            padding-bottom: 15px;
            margin-bottom: 30px;
          }
          .welcome {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 30px;
          }
          .welcome h2 {
            margin: 0;
            font-size: 2em;
          }
          .info {
            background: #e8f4f8;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 5px solid #3498db;
          }
          .info p {
            margin: 8px 0;
          }
          .rutas {
            margin-top: 30px;
          }
          .rutas h2 {
            color: #2c3e50;
            margin-bottom: 20px;
          }
          .ruta-card {
            background: #f8f9fa;
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 5px solid #667eea;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .ruta-card:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .ruta-card strong {
            color: #667eea;
            font-size: 1.1em;
          }
          .ruta-card .method {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 0.8em;
            margin-right: 10px;
          }
          .ruta-card .content-type {
            display: inline-block;
            background: #27ae60;
            color: white;
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 0.8em;
            margin-top: 5px;
          }
          .ruta-card p {
            margin: 10px 0 5px 0;
            color: #555;
          }
          a {
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
          .test-btn {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 20px;
            font-size: 0.9em;
            transition: background 0.3s;
          }
          .test-btn:hover {
            background: #764ba2;
            text-decoration: none;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #7f8c8d;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎓 Servidor HTTP - Instituto Tecnológico Universitario</h1>
          
          <div class="welcome">
            <h2>¡Bienvenido al Servidor!</h2>
            <p>Práctica b10 - HTTP con diferentes Content-Types</p>
          </div>
          
          <div class="info">
            <p><strong>📡 Estado del servidor:</strong> Activo y funcionando</p>
            <p><strong>🔌 Puerto:</strong> ${PUERTO}</p>
            <p><strong>🖥️ Host:</strong> ${HOSTNAME}</p>
            <p><strong>⏰ Hora del servidor:</strong> ${new Date().toLocaleString('es-AR')}</p>
          </div>
          
          <div class="rutas">
            <h2>📍 Rutas Disponibles</h2>
            
            <div class="ruta-card">
              <span class="method">GET</span>
              <strong>/</strong>
              <span class="content-type">text/html</span>
              <p>Página HTML de bienvenida (esta página)</p>
              <a href="/" class="test-btn">Probar →</a>
            </div>
            
            <div class="ruta-card">
              <span class="method">GET</span>
              <strong>/saludo</strong>
              <span class="content-type">application/json</span>
              <p>Responde con un JSON que contiene un saludo personalizado</p>
              <a href="/saludo" class="test-btn">Probar →</a>
            </div>
            
            <div class="ruta-card">
              <span class="method">GET</span>
              <strong>/fecha</strong>
              <span class="content-type">text/plain</span>
              <p>Muestra la fecha y hora actual en formato de texto plano</p>
              <a href="/fecha" class="test-btn">Probar →</a>
            </div>
            
            <div class="ruta-card">
              <span class="method">GET</span>
              <strong>/cualquier-otra</strong>
              <span class="content-type">text/plain</span>
              <p>Cualquier ruta no definida retorna un error 404</p>
              <a href="/ruta-inexistente" class="test-btn">Probar 404 →</a>
            </div>
          </div>
          
          <div class="footer">
            <p>💡 <strong>Tip:</strong> Abre la consola del navegador (F12) para ver los headers de respuesta</p>
            <p>🔧 Práctica de Programación Web - Módulo HTTP</p>
          </div>
        </div>
      </body>
      </html>
    `);
    
  } else if (url === '/saludo' && metodo === 'GET') {
    // Ruta /saludo - application/json
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const respuestaJSON = {
      mensaje: "Hola visitante",
      estado: "exitoso",
      servidor: "ITU HTTP Server",
      timestamp: new Date().toISOString(),
      datos: {
        saludo: "¡Bienvenido!",
        idioma: "español",
        horaLocal: new Date().toLocaleString('es-AR'),
        zonaHoraria: "America/Argentina/Mendoza"
      },
      rutas: [
        { ruta: "/", descripcion: "Página de inicio" },
        { ruta: "/saludo", descripcion: "Saludo en JSON" },
        { ruta: "/fecha", descripcion: "Fecha actual" }
      ]
    };
    
    res.end(JSON.stringify(respuestaJSON, null, 2));
    
  } else if (url === '/fecha' && metodo === 'GET') {
    // Ruta /fecha - text/plain
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    const ahora = new Date();
    const fechaTexto = `
═══════════════════════════════════════════════════════════
              FECHA Y HORA ACTUAL DEL SERVIDOR
═══════════════════════════════════════════════════════════

📅 Fecha completa: ${ahora.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}

🕒 Hora: ${ahora.toLocaleTimeString('es-AR')}

📍 Zona horaria: America/Argentina/Mendoza

───────────────────────────────────────────────────────────
Detalles adicionales:
───────────────────────────────────────────────────────────

• Fecha (formato corto): ${ahora.toLocaleDateString('es-AR')}
• Hora (formato corto): ${ahora.toLocaleTimeString('es-AR')}
• Día de la semana: ${ahora.toLocaleDateString('es-AR', { weekday: 'long' })}
• Mes: ${ahora.toLocaleDateString('es-AR', { month: 'long' })}
• Año: ${ahora.getFullYear()}
• Día del mes: ${ahora.getDate()}
• Día del año: ${Math.floor((ahora - new Date(ahora.getFullYear(), 0, 0)) / 86400000)}
• Semana del año: ${Math.ceil(((ahora - new Date(ahora.getFullYear(), 0, 1)) / 86400000 + new Date(ahora.getFullYear(), 0, 1).getDay() + 1) / 7)}
• Timestamp Unix: ${Math.floor(ahora.getTime() / 1000)}
• Milisegundos desde epoch: ${ahora.getTime()}
• ISO 8601: ${ahora.toISOString()}
• UTC: ${ahora.toUTCString()}

═══════════════════════════════════════════════════════════
    `;
    
    res.end(fechaTexto);
    
  } else {
    // Ruta no encontrada - Error 404 (text/plain)
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    const mensajeError = `
═══════════════════════════════════════════════════════════
                    ERROR 404
═══════════════════════════════════════════════════════════

❌ Ruta No Encontrada

La ruta solicitada no existe en este servidor.

Detalles:
  • Ruta solicitada: ${url}
  • Método HTTP: ${metodo}
  • Código de estado: 404 Not Found
  • Hora: ${new Date().toLocaleString('es-AR')}

Rutas disponibles:
  • GET /         → Página de inicio (text/html)
  • GET /saludo   → Saludo en JSON (application/json)
  • GET /fecha    → Fecha actual (text/plain)

Sugerencia: Verifica la URL e intenta nuevamente.

═══════════════════════════════════════════════════════════
    `;
    
    res.end(mensajeError);
  }
}

// ============================================
// CREAR Y ARRANCAR EL SERVIDOR
// ============================================

const servidor = http.createServer(manejarPeticion);

servidor.listen(PUERTO, HOSTNAME, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         SERVIDOR HTTP INICIADO - Práctica b10              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n✓ Servidor corriendo en: http://${HOSTNAME}:${PUERTO}/`);
  console.log(`✓ Hora de inicio: ${new Date().toLocaleString('es-AR')}`);
  console.log('\n📍 Rutas disponibles con Content-Types:');
  console.log(`   • GET /         → text/html`);
  console.log(`   • GET /saludo   → application/json`);
  console.log(`   • GET /fecha    → text/plain`);
  console.log(`   • Otras rutas   → 404 (text/plain)`);
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