
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
