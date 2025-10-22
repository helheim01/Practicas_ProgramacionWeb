// Función para multiplicar dos matrices
function multiplicarMatrices(matrizA, matrizB) {
  // Verificar si las matrices pueden multiplicarse
  const filasA = matrizA.length;
  const columnasA = matrizA[0].length;
  const filasB = matrizB.length;
  const columnasB = matrizB[0].length;

  if (columnasA !== filasB) {
    throw new Error(
      `No se pueden multiplicar: las columnas de A (${columnasA}) deben coincidir con las filas de B (${filasB})`
    );
  }

  // Inicializar matriz resultado con ceros
  const resultado = [];
  for (let i = 0; i < filasA; i++) {
    resultado[i] = [];
    for (let j = 0; j < columnasB; j++) {
      resultado[i][j] = 0;
    }
  }

  // Multiplicar las matrices
  for (let i = 0; i < filasA; i++) {
    for (let j = 0; j < columnasB; j++) {
      for (let k = 0; k < columnasA; k++) {
        resultado[i][j] += matrizA[i][k] * matrizB[k][j];
      }
    }
  }

  return resultado;
}

// Función para mostrar una matriz de forma legible
function mostrarMatriz(matriz, nombre = "Matriz") {
  console.log(`\n${nombre}:`);
  for (let i = 0; i < matriz.length; i++) {
    console.log(matriz[i].join("\t"));
  }
}

// Ejemplo de uso
console.log("=== MULTIPLICACIÓN DE MATRICES ===");

// Definir matrices de ejemplo
const matrizA = [
  [1, 2, 3],
  [4, 5, 6]
];

const matrizB = [
  [7, 8],
  [9, 10],
  [11, 12]
];

// Mostrar matrices originales
mostrarMatriz(matrizA, "Matriz A (2x3)");
mostrarMatriz(matrizB, "Matriz B (3x2)");

// Multiplicar y mostrar resultado
try {
  const resultado = multiplicarMatrices(matrizA, matrizB);
  mostrarMatriz(resultado, "Resultado A × B (2x2)");
} catch (error) {
  console.error(`\nError: ${error.message}`);
}

// Ejemplo adicional con matrices cuadradas
console.log("\n\n=== EJEMPLO 2: MATRICES CUADRADAS ===");

const matrizC = [
  [1, 2],
  [3, 4]
];

const matrizD = [
  [2, 0],
  [1, 2]
];

mostrarMatriz(matrizC, "Matriz C (2x2)");
mostrarMatriz(matrizD, "Matriz D (2x2)");

try {
  const resultado2 = multiplicarMatrices(matrizC, matrizD);
  mostrarMatriz(resultado2, "Resultado C × D (2x2)");
} catch (error) {
  console.error(`\nError: ${error.message}`);
}

// Exportar la función para usarla en otros módulos
module.exports = { multiplicarMatrices, mostrarMatriz };