// ============================================
// CALCULADORA CON MÓDULO PROCESS
// ============================================

// Variable de entorno DEBUG
const DEBUG = process.env.DEBUG === 'true';

// Función para mostrar mensajes de debug
function debug(mensaje) {
  if (DEBUG) {
    process.stdout.write(`[DEBUG] ${mensaje}\n`);
  }
}

// Función para mostrar ayuda
function mostrarAyuda() {
  process.stdout.write(`
╔════════════════════════════════════════════════════════════╗
║                    CALCULADORA CLI                         ║
╚════════════════════════════════════════════════════════════╝

USO:
  node calculadora.js <operacion> <numero1> <numero2>

OPERACIONES DISPONIBLES:
  suma    - Suma dos números
  resta   - Resta dos números
  mul     - Multiplica dos números
  div     - Divide dos números
  mod     - Módulo (resto de división)
  pow     - Potencia (numero1 ^ numero2)

EJEMPLOS:
  node calculadora.js suma 4 5        → Resultado: 9
  node calculadora.js resta 10 3      → Resultado: 7
  node calculadora.js mul 6 7         → Resultado: 42
  node calculadora.js div 8 2         → Resultado: 4
  node calculadora.js mod 10 3        → Resultado: 1
  node calculadora.js pow 2 3         → Resultado: 8

MODO DEBUG:
  DEBUG=true node calculadora.js suma 4 5

AYUDA:
  node calculadora.js --help
  node calculadora.js -h

════════════════════════════════════════════════════════════
`);
}

// Función principal
function calcular() {
  debug(`Iniciando calculadora...`);
  debug(`Node.js versión: ${process.version}`);
  debug(`Plataforma: ${process.platform}`);
  debug(`Directorio actual: ${process.cwd()}`);
  debug(`PID del proceso: ${process.pid}`);

  // Obtener argumentos (process.argv[0] = node, process.argv[1] = script)
  const args = process.argv.slice(2);
  
  debug(`Argumentos recibidos: ${JSON.stringify(args)}`);

  // Verificar si se solicita ayuda
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    mostrarAyuda();
    process.exit(0);
  }

  // Validar que se ingresen exactamente 3 parámetros
  if (args.length !== 3) {
    process.stderr.write('❌ ERROR: Número incorrecto de parámetros.\n');
    process.stderr.write('   Se esperan 3 parámetros: <operacion> <numero1> <numero2>\n\n');
    process.stderr.write('   Ejemplo: node calculadora.js suma 4 5\n');
    process.stderr.write('   Use --help para más información.\n\n');
    process.exit(1);
  }

  // Extraer parámetros
  const operacion = args[0].toLowerCase();
  const num1Str = args[1];
  const num2Str = args[2];

  debug(`Operación: ${operacion}`);
  debug(`Número 1 (string): ${num1Str}`);
  debug(`Número 2 (string): ${num2Str}`);

  // Validar que los parámetros sean números
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);

  if (isNaN(num1) || isNaN(num2)) {
    process.stderr.write('❌ ERROR: Los parámetros deben ser números válidos.\n');
    process.stderr.write(`   Recibido: "${num1Str}" y "${num2Str}"\n\n`);
    process.exit(1);
  }

  debug(`Número 1 (convertido): ${num1}`);
  debug(`Número 2 (convertido): ${num2}`);

  // Variable para almacenar el resultado
  let resultado;
  let simbolo;

  // Realizar la operación según el tipo
  switch (operacion) {
    case 'suma':
    case '+':
      resultado = num1 + num2;
      simbolo = '+';
      debug(`Calculando: ${num1} + ${num2}`);
      break;

    case 'resta':
    case '-':
      resultado = num1 - num2;
      simbolo = '-';
      debug(`Calculando: ${num1} - ${num2}`);
      break;

    case 'mul':
    case 'multiplicacion':
    case '*':
      resultado = num1 * num2;
      simbolo = '×';
      debug(`Calculando: ${num1} × ${num2}`);
      break;

    case 'div':
    case 'division':
    case '/':
      if (num2 === 0) {
        process.stderr.write('❌ ERROR: No se puede dividir por cero.\n\n');
        process.exit(1);
      }
      resultado = num1 / num2;
      simbolo = '÷';
      debug(`Calculando: ${num1} ÷ ${num2}`);
      break;

    case 'mod':
    case 'modulo':
    case '%':
      if (num2 === 0) {
        process.stderr.write('❌ ERROR: No se puede calcular módulo con divisor cero.\n\n');
        process.exit(1);
      }
      resultado = num1 % num2;
      simbolo = '%';
      debug(`Calculando: ${num1} % ${num2}`);
      break;

    case 'pow':
    case 'potencia':
    case '^':
      resultado = Math.pow(num1, num2);
      simbolo = '^';
      debug(`Calculando: ${num1} ^ ${num2}`);
      break;

    default:
      process.stderr.write(`❌ ERROR: Operación "${operacion}" no reconocida.\n`);
      process.stderr.write('   Operaciones válidas: suma, resta, mul, div, mod, pow\n');
      process.stderr.write('   Use --help para más información.\n\n');
      process.exit(1);
  }

  // Mostrar el resultado
  process.stdout.write('\n');
  process.stdout.write('═════════════════════════════════════\n');
  process.stdout.write(`  ${num1} ${simbolo} ${num2} = ${resultado}\n`);
  process.stdout.write('═════════════════════════════════════\n');
  process.stdout.write('\n');

  debug(`Resultado final: ${resultado}`);
  debug(`Operación completada exitosamente`);

  // Salir exitosamente
  process.exit(0);
}

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  process.stderr.write('\n❌ ERROR INESPERADO:\n');
  process.stderr.write(`   ${error.message}\n\n`);
  if (DEBUG) {
    process.stderr.write(`   Stack trace:\n${error.stack}\n\n`);
  }
  process.exit(1);
});

// Manejar señales de interrupción
process.on('SIGINT', () => {
  process.stdout.write('\n\n⚠️  Operación cancelada por el usuario.\n\n');
  process.exit(130);
});

// Ejecutar la calculadora
calcular();