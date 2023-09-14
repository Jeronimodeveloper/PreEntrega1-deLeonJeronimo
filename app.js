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
  let total = 0;
  for (let i = 0; i < gastos.length; i++) {
    total += gastos[i].monto;
  }
  return total;
}

// Funcion para interactuar con el usuario
function principal() {
  while (true) {
    const opciones = prompt(
      "OPCIONES: (1) Agregar un gasto. (2) Calcular el total de gastos. (3) Salir."
    );

    switch (opciones) {
      case "1":
        sumarGasto();
        break;
      case "2":
        const total = calcularTotal();
        console.log("Total de gastos: $ " + total);
        break;
      case "3":
        return;
      default:
        console.log("Opción no válida. Por favor, elija una opción válida.");
    }
  }
}

// Iniciar aplicacion
principal();
