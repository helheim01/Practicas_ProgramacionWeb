const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURACIÓN
// ============================================

const CARPETA_NOTAS = 'notas';

// Crear carpeta de notas si no existe
if (!fs.existsSync(CARPETA_NOTAS)) {
  fs.mkdirSync(CARPETA_NOTAS);
  console.log(`✓ Carpeta "${CARPETA_NOTAS}" creada.\n`);
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Generar nombre de archivo seguro desde el título
function generarNombreArchivo(titulo) {
  // Remover caracteres no permitidos y convertir a minúsculas
  const nombreSeguro = titulo
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúñ\s]/gi, '')
    .replace(/\s+/g, '-');
  return `${nombreSeguro}.json`;
}

// Obtener ruta completa del archivo de una nota
function obtenerRutaNota(titulo) {
  const nombreArchivo = generarNombreArchivo(titulo);
  return path.join(CARPETA_NOTAS, nombreArchivo);
}

// Listar todos los archivos de notas
function listarArchivos() {
  try {
    const archivos = fs.readdirSync(CARPETA_NOTAS);
    return archivos.filter(archivo => archivo.endsWith('.json'));
  } catch (error) {
    console.error('Error al listar archivos:', error.message);
    return [];
  }
}

// Cargar una nota específica desde su archivo
function cargarNota(titulo) {
  try {
    const rutaArchivo = obtenerRutaNota(titulo);
    if (fs.existsSync(rutaArchivo)) {
      const contenido = fs.readFileSync(rutaArchivo, 'utf8');
      return JSON.parse(contenido);
    }
  } catch (error) {
    console.error('Error al cargar la nota:', error.message);
  }
  return null;
}

// Guardar nota en su propio archivo
function guardarNota(nota) {
  try {
    const rutaArchivo = obtenerRutaNota(nota.titulo);
    const datosJSON = JSON.stringify(nota, null, 2);
    fs.writeFileSync(rutaArchivo, datosJSON, 'utf8');
    return true;
  } catch (error) {
    console.error('Error al guardar la nota:', error.message);
    return false;
  }
}

// Cargar todas las notas
function cargarTodasLasNotas() {
  const notas = [];
  const archivos = listarArchivos();
  
  archivos.forEach(archivo => {
    try {
      const rutaCompleta = path.join(CARPETA_NOTAS, archivo);
      const contenido = fs.readFileSync(rutaCompleta, 'utf8');
      const nota = JSON.parse(contenido);
      notas.push(nota);
    } catch (error) {
      console.error(`Error al leer ${archivo}:`, error.message);
    }
  });
  
  return notas;
}

// ============================================
// COMANDOS PRINCIPALES
// ============================================

// 1. AGREGAR UNA NOTA
function agregarNota(titulo, contenido) {
  const rutaArchivo = obtenerRutaNota(titulo);
  
  // Verificar si ya existe una nota con ese título
  if (fs.existsSync(rutaArchivo)) {
    console.log('\n❌ ERROR: Ya existe una nota con ese título.');
    console.log(`   Archivo: ${generarNombreArchivo(titulo)}`);
    console.log(`   Use "editar" para modificar la nota existente.\n`);
    return;
  }
  
  // Crear nueva nota
  const nuevaNota = {
    id: Date.now(),
    titulo: titulo,
    contenido: contenido,
    archivo: generarNombreArchivo(titulo),
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: new Date().toISOString()
  };
  
  if (guardarNota(nuevaNota)) {
    console.log('\n✓ Nota agregada exitosamente:');
    console.log(`  Título: ${titulo}`);
    console.log(`  Contenido: ${contenido}`);
    console.log(`  Archivo: ${nuevaNota.archivo}\n`);
    mostrarResumenArchivos();
  }
}

// 2. LEER UNA NOTA
function leerNota(titulo) {
  const nota = cargarNota(titulo);
  
  if (nota) {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log(`║ ${nota.titulo.padEnd(58)} ║`);
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║ Contenido:                                                 ║`);
    console.log(`║ ${nota.contenido.padEnd(58)} ║`);
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║ Archivo: ${nota.archivo.padEnd(50)} ║`);
    console.log(`║ ID: ${nota.id.toString().padEnd(54)} ║`);
    console.log(`║ Creada: ${new Date(nota.fechaCreacion).toLocaleString('es-AR').padEnd(49)} ║`);
    console.log(`║ Modificada: ${new Date(nota.fechaModificacion).toLocaleString('es-AR').padEnd(45)} ║`);
    console.log('╚════════════════════════════════════════════════════════════╝\n');
  } else {
    console.log(`\n❌ No se encontró ninguna nota con el título "${titulo}".\n`);
    mostrarResumenArchivos();
  }
}

// 3. LISTAR TODAS LAS NOTAS
function listarNotas() {
  const notas = cargarTodasLasNotas();
  
  if (notas.length === 0) {
    console.log('\n📝 No hay notas guardadas.\n');
    mostrarResumenArchivos();
    return;
  }
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log(`║          LISTA DE NOTAS (${notas.length} ${notas.length === 1 ? 'nota' : 'notas'})                         ║`);
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  notas.forEach((nota, index) => {
    console.log(`${index + 1}. ${nota.titulo}`);
    console.log(`   ${nota.contenido.substring(0, 50)}${nota.contenido.length > 50 ? '...' : ''}`);
    console.log(`   📄 Archivo: ${nota.archivo}`);
    console.log(`   🕒 Modificada: ${new Date(nota.fechaModificacion).toLocaleDateString('es-AR')}`);
    console.log('');
  });
  
  mostrarResumenArchivos();
}

// 4. ELIMINAR UNA NOTA
function eliminarNota(titulo) {
  const rutaArchivo = obtenerRutaNota(titulo);
  
  if (!fs.existsSync(rutaArchivo)) {
    console.log(`\n❌ No se encontró ninguna nota con el título "${titulo}".\n`);
    mostrarResumenArchivos();
    return;
  }
  
  try {
    fs.unlinkSync(rutaArchivo);
    console.log(`\n✓ Nota "${titulo}" eliminada exitosamente.`);
    console.log(`  Archivo eliminado: ${generarNombreArchivo(titulo)}\n`);
    mostrarResumenArchivos();
  } catch (error) {
    console.error(`\n❌ Error al eliminar la nota: ${error.message}\n`);
  }
}

// 5. EDITAR UNA NOTA
function editarNota(titulo, nuevoContenido) {
  const nota = cargarNota(titulo);
  
  if (!nota) {
    console.log(`\n❌ No se encontró ninguna nota con el título "${titulo}".\n`);
    mostrarResumenArchivos();
    return;
  }
  
  // Actualizar contenido y fecha de modificación
  nota.contenido = nuevoContenido;
  nota.fechaModificacion = new Date().toISOString();
  
  if (guardarNota(nota)) {
    console.log(`\n✓ Nota "${titulo}" editada exitosamente:`);
    console.log(`  Nuevo contenido: ${nuevoContenido}`);
    console.log(`  Archivo: ${nota.archivo}\n`);
    mostrarResumenArchivos();
  }
}

// 6. BUSCAR NOTAS
function buscarNotas(termino) {
  const notas = cargarTodasLasNotas();
  const terminoMin = termino.toLowerCase();
  
  const resultados = notas.filter(nota => 
    nota.titulo.toLowerCase().includes(terminoMin) ||
    nota.contenido.toLowerCase().includes(terminoMin)
  );
  
  if (resultados.length === 0) {
    console.log(`\n🔍 No se encontraron notas que contengan "${termino}".\n`);
    mostrarResumenArchivos();
    return;
  }
  
  console.log(`\n🔍 Encontradas ${resultados.length} nota(s) con "${termino}":\n`);
  resultados.forEach((nota, index) => {
    console.log(`${index + 1}. ${nota.titulo}`);
    console.log(`   ${nota.contenido}`);
    console.log(`   📄 ${nota.archivo}\n`);
  });
  
  mostrarResumenArchivos();
}

// 7. MOSTRAR RESUMEN DE ARCHIVOS
function mostrarResumenArchivos() {
  const archivos = listarArchivos();
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📂 ARCHIVOS EN LA CARPETA "notas":');
  console.log('═══════════════════════════════════════════════════════════');
  
  if (archivos.length === 0) {
    console.log('   (vacía)');
  } else {
    archivos.forEach((archivo, index) => {
      const rutaCompleta = path.join(CARPETA_NOTAS, archivo);
      const stats = fs.statSync(rutaCompleta);
      const tamaño = stats.size;
      console.log(`   ${index + 1}. ${archivo} (${tamaño} bytes)`);
    });
    console.log(`\n   Total: ${archivos.length} archivo(s)`);
  }
  console.log('═══════════════════════════════════════════════════════════\n');
}

// MOSTRAR AYUDA
function mostrarAyuda() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         GESTOR DE NOTAS - ARCHIVOS SEPARADOS               ║
╚════════════════════════════════════════════════════════════╝

COMANDOS DISPONIBLES:

  agregar <titulo> <contenido>
    Crea una nueva nota en un archivo separado.
    Ejemplo: node app.js agregar "Tarea1" "Estudiar Node.js"

  leer <titulo>
    Muestra el contenido completo de una nota específica.
    Ejemplo: node app.js leer "Tarea1"

  listar
    Muestra todas las notas guardadas y lista los archivos.
    Ejemplo: node app.js listar

  eliminar <titulo>
    Elimina una nota y su archivo permanentemente.
    Ejemplo: node app.js eliminar "Tarea2"

  editar <titulo> <nuevo_contenido>
    Modifica el contenido de una nota existente.
    Ejemplo: node app.js editar "Tarea1" "Estudiar JavaScript"

  buscar <termino>
    Busca notas que contengan el término especificado.
    Ejemplo: node app.js buscar "estudiar"

  archivos
    Lista todos los archivos en la carpeta de notas.
    Ejemplo: node app.js archivos

  ayuda
    Muestra este mensaje de ayuda.
    Ejemplo: node app.js ayuda

════════════════════════════════════════════════════════════

NOTAS:
  • Cada nota se guarda en un archivo JSON separado.
  • Los archivos se guardan en la carpeta "notas/".
  • El nombre del archivo se genera automáticamente del título.
  • Al finalizar cada operación se listan los archivos.

════════════════════════════════════════════════════════════
`);
}

// ============================================
// PROCESADOR DE COMANDOS
// ============================================

function procesarComando() {
  const args = process.argv.slice(2);
  const comando = args[0];
  
  if (!comando) {
    console.log('\n❌ ERROR: Debe especificar un comando.');
    console.log('   Use "node app.js ayuda" para ver los comandos disponibles.\n');
    return;
  }
  
  switch (comando.toLowerCase()) {
    case 'agregar':
    case 'add':
      if (args.length < 3) {
        console.log('\n❌ ERROR: Faltan parámetros.');
        console.log('   Uso: node app.js agregar <titulo> <contenido>\n');
      } else {
        agregarNota(args[1], args[2]);
      }
      break;
      
    case 'leer':
    case 'read':
      if (args.length < 2) {
        console.log('\n❌ ERROR: Debe especificar el título de la nota.');
        console.log('   Uso: node app.js leer <titulo>\n');
      } else {
        leerNota(args[1]);
      }
      break;
      
    case 'listar':
    case 'list':
      listarNotas();
      break;
      
    case 'eliminar':
    case 'delete':
    case 'remove':
      if (args.length < 2) {
        console.log('\n❌ ERROR: Debe especificar el título de la nota.');
        console.log('   Uso: node app.js eliminar <titulo>\n');
      } else {
        eliminarNota(args[1]);
      }
      break;
      
    case 'editar':
    case 'edit':
      if (args.length < 3) {
        console.log('\n❌ ERROR: Faltan parámetros.');
        console.log('   Uso: node app.js editar <titulo> <nuevo_contenido>\n');
      } else {
        editarNota(args[1], args[2]);
      }
      break;
      
    case 'buscar':
    case 'search':
      if (args.length < 2) {
        console.log('\n❌ ERROR: Debe especificar un término de búsqueda.');
        console.log('   Uso: node app.js buscar <termino>\n');
      } else {
        buscarNotas(args[1]);
      }
      break;
      
    case 'archivos':
    case 'files':
      mostrarResumenArchivos();
      break;
      
    case 'ayuda':
    case 'help':
    case '--help':
    case '-h':
      mostrarAyuda();
      break;
      
    default:
      console.log(`\n❌ ERROR: Comando "${comando}" no reconocido.`);
      console.log('   Use "node app.js ayuda" para ver los comandos disponibles.\n');
  }
}

// ============================================
// EJECUTAR APLICACIÓN
// ============================================

procesarComando();

// Exportar funciones para pruebas
module.exports = {
  agregarNota,
  leerNota,
  listarNotas,
  eliminarNota,
  editarNota,
  buscarNotas,
  mostrarResumenArchivos,
  cargarNota,
  cargarTodasLasNotas
};