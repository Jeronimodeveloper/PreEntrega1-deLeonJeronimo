// Funcion constructora del Objeto
function transaccion(descripcion, monto) {
  this.descripcion = descripcion;
  this.monto = monto;
}

// Array para almacenar los gastos
const gastos = [];

// Funcion para tomar los datos y sumarlos al Array de "gastos"
function sumarGasto() {
  const descripcion = prompt("Ingrese DESCRIPCIÓN del gasto:");
  const monto = parseFloat(prompt("Ingrese el MONTO:"));

  if (isNaN(monto)) {
    console.log("Por favor, ingresar un monto valido.");
    return;
  }

  const nuevoGasto = new transaccion(descripcion, monto);
  gastos.push(nuevoGasto);
}

// Funcion para calcular el total de los gastos
function calcularTotal() {
  const total = gastos.reduce(
    (acumulador, gasto) => acumulador + gasto.monto,
    0
  );
  return total;
}

// Funcion para mostrar todos los gastos
function mostrarGastos() {
  console.log("LISTA DE GASTOS:");
  gastos.forEach((gasto, index) => {
    console.log(
      `Gasto ${index + 1}: ${gasto.descripcion}, Monto: $${gasto.monto}`
    );
  });
}

// Funcion para interactuar con el usuario
function principal() {
  while (true) {
    const opciones = prompt(
      "OPCIONES: (1) Agregar un gasto. (2) Calcular total de gastos. (3) Mostrar gastos. (4) Salir."
    );

    switch (opciones) {
      case "1":
        sumarGasto();
        break;
      case "2":
        const total = calcularTotal();
        console.log("TOTAL DE GASTOS: $ " + total);
        break;
      case "3":
        mostrarGastos();
        break;
      case "4":
        return;
      default:
        console.log("Opción no válida. Por favor, elija una opción válida.");
    }
  }
}

// Iniciar aplicacion
principal();
