// Array para almacenar los gastos
const gastos = [];

// Funcion para tomar los datos y sumarlos al Array de "gastos"
function sumarGasto() {
  const descripcion = document.getElementById("inputDescripcion").value;
  const monto = document.getElementById("inputMonto").value;

  if (isNaN(monto)) {
    alert("Por favor, ingresar un numero valido.");
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

// Mostrar Gastos en la lista
function mostrarGastos() {
  let getGastos = localStorage.getItem("gastos");
  getGastos = JSON.parse(getGastos);

  let listaGastos = document.getElementById("listaGastos");
  listaGastos.innerHTML = ""; // Limpia la lista antes de agregar elementos

  for (let i = 0; i < getGastos.length; i++) {
    let gasto = getGastos[i];
    let listItem = document.createElement("li");
    listItem.textContent = `${gasto.descripcion}: $ ${gasto.monto}`;
    listaGastos.appendChild(listItem);
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
