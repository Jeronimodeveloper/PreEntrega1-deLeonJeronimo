// Funcion constructora del Objeto
function transaccion(descripcion, monto) {
  this.descripcion = descripcion;
  this.monto = monto;
}

// Array para almacenar los gastos
const gastos = [];

// Funcion para tomar los datos y sumarlos al Array de "gastos"
function sumarGasto() {
  const descripcion = document.getElementById("inputDescripcion").value;
  const monto = document.getElementById("inputMonto").value;

  if (isNaN(monto)) {
    alert("Por favor, ingresar un monto valido.");
    return;
  }

  const nuevoGasto = { descripcion, monto };
  gastos.push(nuevoGasto);
  guardarGastos();
  mostrarGastos();
  calcularTotal();
}

// Evento al click del botón
const botonAgregar = document.getElementById("boton-agregar");
botonAgregar.addEventListener("click", function () {
  sumarGasto();
});

// Guardar Gastos en Local Storage
function guardarGastos() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Calcular el total de los gastos
function calcularTotal() {
  const total = gastos.reduce(
    (acumulador, gasto) => acumulador + gasto.monto,
    0
  );
  return total;
}

// Mostrar Gastos en la lista
function mostrarGastos() {
  let getGastos = localStorage.getItem("gastos");
  getGastos = JSON.parse(getGastos);

  document.getElementById("listaGastos").innerHTML = "";

  for (let i = 0; i < getGastos.length; i++) {
    document.getElementById("listaGastos").innerHTML += `
    <ul class="list-group list-group-horizontal">
    <li class="list-group-item">${getGastos[i].descripcion}</li>
    <li class="list-group-item">$ ${getGastos[i].monto}</li>
    </ul>`;
  }
}

// Calcular y mostrar total
function calcularTotal() {
  let gastos = localStorage.getItem("gastos");
  gastos = JSON.parse(gastos);
  let total = 0;

  for (let i = 0; i < gastos.length; i++) {
    total += parseInt(gastos[i].monto);
  }

  // Mostrar total
  let totalContainer = document.getElementById("totalContainer");

  totalContainer.innerHTML = "Total de gastos $ " + total;
}
