# Reto Técnico: Procesamiento de Transacciones Bancarias (CLI)

# Objetivo:
Desarrolla una aplicación de línea de comandos (CLI) que procese un archivo CSV con transacciones bancarias y genere un reporte que incluya:

# Balance Final:
Suma de los montos de las transacciones de tipo "Crédito" menos la suma de los montos de las transacciones de tipo "Débito".
Transacción de Mayor Monto:
Identificar el ID y el monto de la transacción con el valor más alto.
Conteo de Transacciones:
Número total de transacciones para cada tipo ("Crédito" y "Débito").

## Entrada de Datos:
La aplicación deberá leer un archivo CSV. Como ejemplo, el contenido del archivo puede ser:

id,tipo,monto

1,Crédito,100.00

2,Débito,50.00

3,Crédito,200.00

4,Débito,75.00

5,Crédito,150.00

## Salida del Programa:
La aplicación debe mostrar el reporte final en la terminal.
Ejemplo de salida en la terminal:
Reporte de Transacciones

## Balance Final: 
325.00
## Transacción de Mayor Monto: 
ID 3 - 200.00
## Conteo de Transacciones: 
Crédito: 3 Débito: 2

## Introducción

Este proyecto es una aplicación desarrollada en Node.js que procesa un archivo CSV con información de transacciones financieras. Su propósito es calcular el balance final, identificar la transacción de mayor monto y contar el número de transacciones de tipo "Crédito" y "Débito".

## Instrucciones de Ejecución

### Prerrequisitos

- Tener [Node.js](https://nodejs.org/) instalado en su sistema.

### Pasos para ejecutar la aplicación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/slaping73/retotecnico-cobol.git

# Solución
Para desarrollar una aplicación en JavaScript que lea un archivo CSV y genere un informe de transacciones sin utilizar bibliotecas externas, puedes seguir estos pasos:

1. Leer el archivo CSV:

En un entorno Node.js, se utiliza el módulo fs para manejar operaciones de archivos. Para leer el contenido de un archivo CSV de forma síncrona, puedes emplear el método fs.readFileSync.​

2. Analizar el contenido del CSV:

El contenido leído es una cadena de texto que representa el archivo CSV. Para procesarlo, debes dividir esta cadena en líneas y luego dividir cada línea en sus respectivos campos, teniendo en cuenta que el delimitador es la coma (,).​

3. Procesar las transacciones:

Al recorrer las filas del CSV (exceptuando la cabecera), puedes acumular el balance, identificar la transacción de mayor monto y contar el número de transacciones de cada tipo.​

4. Generar el informe:

Finalmente, muestra en la consola el balance final, la transacción con el mayor monto y el conteo de transacciones por tipo.​

A continuación, se presenta un ejemplo de código que implementa estos pasos:

``` const fs = require('fs');

// Leer el archivo CSV
const data = fs.readFileSync('transacciones.csv', 'utf8');

// Dividir el contenido en líneas
const lines = data.split(/\r?\n/);

// Extraer la cabecera
const headers = lines[0].split(',');

// Inicializar variables para el informe
let balance = 0;
let transaccionMayorMonto = { id: null, monto: 0 };
let conteoTransacciones = { Crédito: 0, Débito: 0 };

// Procesar cada línea de datos
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line === '') continue; // Saltar líneas vacías

  const [id, tipo, montoStr] = line.split(',');
  const monto = parseFloat(montoStr);

  // Actualizar balance
  if (tipo === 'Crédito') {
    balance += monto;
    conteoTransacciones.Crédito++;
  } else if (tipo === 'Débito') {
    balance -= monto;
    conteoTransacciones.Débito++;
  } else {
    console.warn(`Tipo de transacción desconocido en la línea ${i + 1}: ${tipo}`);
    continue;
  }

  // Verificar si es la transacción de mayor monto
  if (monto > transaccionMayorMonto.monto) {
    transaccionMayorMonto = { id, monto };
  }
}

// Generar el informe
console.log('Reporte de Transacciones');
console.log('---------------------------------------------');
console.log(`Balance Final: ${balance.toFixed(2)}`);
console.log(`Transacción de Mayor Monto: ID ${transaccionMayorMonto.id} - ${transaccionMayorMonto.monto.toFixed(2)}`);
console.log(`Conteo de Transacciones: Crédito: ${conteoTransacciones.Crédito} Débito: ${conteoTransacciones.Débito}`);
```

