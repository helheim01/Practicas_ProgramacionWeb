const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURACIÓN
// ============================================

const ARCHIVO_NOTAS = 'notas.json';

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Cargar notas desde el archivo
function cargarNotas() {
  try {
    if (fs.existsSync(ARCHIVO_NOTAS)) {
      const datosBuffer = fs.readFileSync(ARCHIVO_NOTAS);
      const datosJSON = datosBuffer.toString();
      return JSON.parse(datosJSON);
    }
  } catch (error) {
    console.error('Error al cargar las notas:', error.message);
  }
  return [];
}

// Guardar notas en el archivo
function guardarNotas(notas) {
  try {
    const datosJSON = JSON.stringify(notas, null, 2);
    fs.writeFileSync(ARCHIVO_NOTAS, datosJSON);
    return true;
  } catch (error) {
    console.error('Error al guardar las notas:', error.message);
    return false;
  }
}

// ============================================
// COMANDOS PRINCIPALES
// ============================================

// 1. AGREGAR UNA NOTA
function agregarNota(titulo, contenido) {
  const notas = cargarNotas();
  
  // Verificar si ya existe una nota con ese título
  const notaDuplicada = notas.find(nota => nota.titulo === titulo);
  
  if (notaDuplicada) {
    console.log('\n❌ ERROR: Ya existe una nota con ese título.');
    console.log(`   Use "editar" para modificar la nota existente.\n`);
    return;
  }
  
  // Crear nueva nota
  const nuevaNota = {
    id: Date.now(),
    titulo: titulo,
    contenido: contenido,
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: new Date().toISOString()
  };
  
  notas.push(nuevaNota);
  
  if (guardarNotas(notas)) {
    console.log('\n✓ Nota agregada exitosamente:');
    console.log(`  Título: ${titulo}`);
    console.log(`  Contenido: ${contenido}\n`);
  }
}

// 2. LEER UNA NOTA
function leerNota(titulo) {
  const notas = cargarNotas();
  const nota = notas.find(n => n.titulo === titulo);
  
  if (nota) {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log(`║ ${nota.titulo.padEnd(58)} ║`);
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║ Contenido:                                                 ║`);
    console.log(`║ ${nota.contenido.padEnd(58)} ║`);
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║ ID: ${nota.id.toString().padEnd(54)} ║`);
    console.log(`║ Creada: ${new Date(nota.fechaCreacion).toLocaleString('es-AR').padEnd(49)} ║`);
    console.log(`║ Modificada: ${new Date(nota.fechaModificacion).toLocaleString('es-AR').padEnd(45)} ║`);
    console.log('╚════════════════════════════════════════════════════════════╝\n');
  } else {
    console.log(`\n❌ No se encontró ninguna nota con el título "${titulo}".\n`);
  }
}

// 3. LISTAR TODAS LAS NOTAS
function listarNotas() {
  const notas = cargarNotas();
  
  if (notas.length === 0) {
    console.log('\n📝 No hay notas guardadas.\n');
    return;
  }
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log(`║          LISTA DE NOTAS (${notas.length} ${notas.length === 1 ? 'nota' : 'notas'})                         ║`);
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  notas.forEach((nota, index) => {
    console.log(`${index + 1}. ${nota.titulo}`);
    console.log(`   ${nota.contenido.substring(0, 50)}${nota.contenido.length > 50 ? '...' : ''}`);
    console.log(`   ID: ${nota.id} | Modificada: ${new Date(nota.fechaModificacion).toLocaleDateString('es-AR')}`);
    console.log('');
  });
}

// 4. ELIMINAR UNA NOTA
function eliminarNota(titulo) {
  const notas = cargarNotas();
  const notasRestantes = notas.filter(n => n.titulo !== titulo);
  
  if (notas.length === notasRestantes.length) {
    console.log(`\n❌ No se encontró ninguna nota con el título "${titulo}".\n`);
    return;
  }
  
  if (guardarNotas(notasRestantes)) {
    console.log(`\n✓ Nota "${titulo}" eliminada exitosamente.\n`);
  }
}

// 5. EDITAR UNA NOTA
function editarNota(titulo, nuevoContenido) {
  const notas = cargarNotas();
  const nota = notas.find(n => n.titulo === titulo);
  
  if (!nota) {
    console.log(`\n❌ No se encontró ninguna nota con el título "${titulo}".\n`);
    return;
  }
  
  // Actualizar contenido y fecha de modificación
  nota.contenido = nuevoContenido;
  nota.fechaModificacion = new Date().toISOString();
  
  if (guardarNotas(notas)) {
    console.log(`\n✓ Nota "${titulo}" editada exitosamente:`);
    console.log(`  Nuevo contenido: ${nuevoContenido}\n`);
  }
}

// 6. BUSCAR NOTAS
function buscarNotas(termino) {
  const notas = cargarNotas();
  const terminoMin = termino.toLowerCase();
  
  const resultados = notas.filter(nota => 
    nota.titulo.toLowerCase().includes(terminoMin) ||
    nota.contenido.toLowerCase().includes(terminoMin)
  );
  
  if (resultados.length === 0) {
    console.log(`\n🔍 No se encontraron notas que contengan "${termino}".\n`);
    return;
  }
  
  console.log(`\n🔍 Encontradas ${resultados.length} nota(s) con "${termino}":\n`);
  resultados.forEach((nota, index) => {
    console.log(`${index + 1}. ${nota.titulo}`);
    console.log(`   ${nota.contenido}\n`);
  });
}

// MOSTRAR AYUDA
function mostrarAyuda() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║              GESTOR DE NOTAS - AYUDA                       ║
╚════════════════════════════════════════════════════════════╝

COMANDOS DISPONIBLES:

  agregar <titulo> <contenido>
    Crea una nueva nota con el título y contenido especificados.
    Ejemplo: node app.js agregar "Tarea1" "Estudiar Node.js"

  leer <titulo>
    Muestra el contenido completo de una nota específica.
    Ejemplo: node app.js leer "Tarea1"

  listar
    Muestra todas las notas guardadas.
    Ejemplo: node app.js listar

  eliminar <titulo>
    Elimina una nota permanentemente.
    Ejemplo: node app.js eliminar "Tarea2"

  editar <titulo> <nuevo_contenido>
    Modifica el contenido de una nota existente.
    Ejemplo: node app.js editar "Tarea1" "Estudiar JavaScript"

  buscar <termino>
    Busca notas que contengan el término especificado.
    Ejemplo: node app.js buscar "estudiar"

  ayuda
    Muestra este mensaje de ayuda.
    Ejemplo: node app.js ayuda

════════════════════════════════════════════════════════════

NOTAS:
  • Los títulos y contenidos con espacios deben ir entre comillas.
  • Las notas se guardan automáticamente en notas.json
  • No pueden existir dos notas con el mismo título.

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
  cargarNotas,
  guardarNotas
};