const fs = require('fs');
const path = require('path');

// ============================================
// FUNCIÓN PRINCIPAL DE BÚSQUEDA
// ============================================

function buscarPalabraEnArchivo(archivoEntrada, palabraBuscar, archivoSalida) {
  console.log('===========================================');
  console.log('  BUSCADOR DE PALABRAS CON STREAMS');
  console.log('===========================================\n');
  console.log(`Archivo de entrada: ${archivoEntrada}`);
  console.log(`Palabra a buscar: "${palabraBuscar}"`);
  console.log(`Archivo de salida: ${archivoSalida}`);
  console.log('\nProcesando...\n');

  // Variables para el conteo
  let contadorPalabras = 0;
  let bufferResto = ''; // Para manejar palabras divididas entre chunks
  let bytesLeidos = 0;
  let chunksProcessados = 0;

  // Crear stream de lectura
  const streamLectura = fs.createReadStream(archivoEntrada, {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64KB por chunk
  });

  // Crear stream de escritura
  const streamEscritura = fs.createWriteStream(archivoSalida, {
    encoding: 'utf8'
  });

  // Función para contar ocurrencias en un texto
  function contarOcurrencias(texto, palabra) {
    // Convertir a minúsculas para búsqueda case-insensitive
    const textoMin = texto.toLowerCase();
    const palabraMin = palabra.toLowerCase();
    
    // Usar expresión regular para buscar palabra completa
    const regex = new RegExp(`\\b${palabraMin}\\b`, 'gi');
    const coincidencias = textoMin.match(regex);
    
    return coincidencias ? coincidencias.length : 0;
  }

  // Evento: datos recibidos (chunk por chunk)
  streamLectura.on('data', (chunk) => {
    chunksProcessados++;
    bytesLeidos += chunk.length;

    // Combinar el resto anterior con el chunk actual
    const textoCompleto = bufferResto + chunk;

    // Dividir por líneas o espacios para evitar cortar palabras
    const ultimoEspacio = textoCompleto.lastIndexOf(' ');
    
    let textoAProcesar;
    if (ultimoEspacio !== -1) {
      textoAProcesar = textoCompleto.substring(0, ultimoEspacio);
      bufferResto = textoCompleto.substring(ultimoEspacio + 1);
    } else {
      textoAProcesar = textoCompleto;
      bufferResto = '';
    }

    // Contar ocurrencias en este bloque
    const ocurrencias = contarOcurrencias(textoAProcesar, palabraBuscar);
    contadorPalabras += ocurrencias;

    // Mostrar progreso
    if (chunksProcessados % 10 === 0) {
      console.log(`  Chunks procesados: ${chunksProcessados} | Bytes leídos: ${bytesLeidos} | Ocurrencias: ${contadorPalabras}`);
    }
  });

  // Evento: fin de lectura
  streamLectura.on('end', () => {
    // Procesar el último resto si existe
    if (bufferResto.length > 0) {
      const ocurrencias = contarOcurrencias(bufferResto, palabraBuscar);
      contadorPalabras += ocurrencias;
    }

    console.log('\n✓ Lectura completada');
    console.log(`  Total chunks procesados: ${chunksProcessados}`);
    console.log(`  Total bytes leídos: ${bytesLeidos}`);
    console.log(`  Ocurrencias encontradas: ${contadorPalabras}\n`);

    // Preparar resultado para escribir
    const resultado = generarReporte(
      archivoEntrada,
      palabraBuscar,
      contadorPalabras,
      bytesLeidos,
      chunksProcessados
    );

    // Escribir resultado en el archivo de salida
    streamEscritura.write(resultado, (error) => {
      if (error) {
        console.error('✗ Error al escribir resultado:', error.message);
      } else {
        console.log(`✓ Resultado guardado en: ${archivoSalida}\n`);
      }
      streamEscritura.end();
    });
  });

  // Evento: error en lectura
  streamLectura.on('error', (error) => {
    console.error('\n✗ ERROR EN LECTURA:');
    console.error(`  Código: ${error.code}`);
    console.error(`  Mensaje: ${error.message}`);
    
    if (error.code === 'ENOENT') {
      console.error(`  El archivo "${archivoEntrada}" no existe.\n`);
    }
    
    streamEscritura.end();
  });

  // Evento: error en escritura
  streamEscritura.on('error', (error) => {
    console.error('\n✗ ERROR EN ESCRITURA:');
    console.error(`  Código: ${error.code}`);
    console.error(`  Mensaje: ${error.message}\n`);
  });

  // Evento: escritura finalizada
  streamEscritura.on('finish', () => {
    console.log('✓ Proceso completado exitosamente');
    console.log('===========================================\n');
  });
}

// ============================================
// FUNCIÓN PARA GENERAR REPORTE
// ============================================

function generarReporte(archivo, palabra, ocurrencias, bytes, chunks) {
  const fecha = new Date().toLocaleString('es-AR');
  
  return `
╔════════════════════════════════════════════════════════════╗
║           REPORTE DE BÚSQUEDA DE PALABRAS                  ║
╚════════════════════════════════════════════════════════════╝

Fecha y hora: ${fecha}

ARCHIVO ANALIZADO:
  Nombre: ${archivo}
  Tamaño: ${bytes} bytes (${(bytes / 1024).toFixed(2)} KB)

BÚSQUEDA:
  Palabra buscada: "${palabra}"
  Ocurrencias encontradas: ${ocurrencias}

ESTADÍSTICAS DE PROCESAMIENTO:
  Chunks procesados: ${chunks}
  Tamaño promedio de chunk: ${(bytes / chunks).toFixed(2)} bytes

RESULTADO:
  La palabra "${palabra}" aparece ${ocurrencias} ${ocurrencias === 1 ? 'vez' : 'veces'} en el archivo.

════════════════════════════════════════════════════════════
`;
}

// ============================================
// FUNCIÓN PARA CREAR ARCHIVO DE PRUEBA
// ============================================

function crearArchivoPrueba(nombreArchivo, palabra, repeticiones) {
  console.log(`\nCreando archivo de prueba: ${nombreArchivo}`);
  console.log(`Palabra a insertar: "${palabra}" (${repeticiones} veces)\n`);

  const stream = fs.createWriteStream(nombreArchivo);

  const textoBase = [
    'El amor es un sentimiento profundo.',
    'En el arte del amor, la paciencia es clave.',
    'Muchas canciones hablan sobre el amor verdadero.',
    'El amor y la amistad son fundamentales en la vida.',
    'Sin amor, la vida pierde su significado más profundo.'
  ];

  for (let i = 0; i < repeticiones; i++) {
    const linea = textoBase[i % textoBase.length];
    stream.write(linea + '\n');
  }

  stream.end(() => {
    console.log(`✓ Archivo de prueba creado: ${nombreArchivo}\n`);
    
    // Ejecutar la búsqueda después de crear el archivo
    buscarPalabraEnArchivo(nombreArchivo, palabra, 'resultado.txt');
  });

  stream.on('error', (error) => {
    console.error('Error al crear archivo de prueba:', error.message);
  });
}

// ============================================
// EJECUCIÓN DEL PROGRAMA
// ============================================

// Verificar argumentos de línea de comandos
if (process.argv.length >= 4) {
  // Modo: node programa.js <archivo> <palabra> [archivoSalida]
  const archivoEntrada = process.argv[2];
  const palabraBuscar = process.argv[3];
  const archivoSalida = process.argv[4] || 'resultado.txt';
  
  buscarPalabraEnArchivo(archivoEntrada, palabraBuscar, archivoSalida);
} else {
  // Modo demostración: crear archivo de prueba
  console.log('Modo de demostración activado\n');
  console.log('Para usar el programa manualmente:');
  console.log('  node programa.js <archivo> <palabra> [archivoSalida]\n');
  console.log('Ejemplo:');
  console.log('  node programa.js grande.txt amor resultado.txt\n');
  
  // Crear archivo de prueba y ejecutar búsqueda
  crearArchivoPrueba('grande.txt', 'amor', 1000);
}

// Exportar funciones
module.exports = {
  buscarPalabraEnArchivo,
  crearArchivoPrueba
};