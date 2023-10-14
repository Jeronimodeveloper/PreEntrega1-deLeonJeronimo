mostrarGastos();
calcularTotal();

// RECUPERACION DE DATOS
const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// FUNCION PARA TOMAR SUMAR DATOS AL ARRAY "gastos"
function sumarGasto() {
  const monto = document.getElementById("inputMonto").value;
  const descripcion = document.getElementById("inputDescripcion").value;

  if (isNaN(monto)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, ingresar un número válido.",
    });
    return;
  }

  if (descripcion.trim() === "" || monto.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, complete ambos campos.",
    });
    return;
  }

  const nuevoGasto = { descripcion, monto };
  gastos.push(nuevoGasto);
  guardarGastos();
  mostrarGastos();
  calcularTotal();

  // LIMPIAR CAMPOS DE ENTRADA
  document.getElementById("inputMonto").value = "";
  document.getElementById("inputDescripcion").value = "";
}

// EVENTO TECLA ENTER
const inputDescripcion = document.getElementById("inputDescripcion");
const inputMonto = document.getElementById("inputMonto");

inputDescripcion.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sumarGasto();
  }
});

inputMonto.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sumarGasto();
  }
});

// EVENTO CLICK EN AGREGAR
const botonAgregar = document.getElementById("boton-agregar");
botonAgregar.addEventListener("click", function () {
  sumarGasto();
});

// GUARDAR GASTOS EN Local Storage
function guardarGastos() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// MOSTRAR GASTOS en la lista
function mostrarGastos() {
  let getGastos = localStorage.getItem("gastos");
  getGastos = JSON.parse(getGastos);

  let listaGastos = document.getElementById("listaGastos");
  listaGastos.innerHTML = "";

  for (let i = 0; i < getGastos.length; i++) {
    let gasto = getGastos[i];
    let listItem = document.createElement("li");

    // Botón para eliminar el gasto
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add(
      "btn",
      "btn-secondary",
      "btn-sm",
      "ms-5",
      "mt-2"
    );
    deleteButton.addEventListener("click", function () {
      eliminarGasto(i);
    });

    // Agregar descripción y monto al elemento de la lista
    listItem.textContent = `${gasto.descripcion}: $ ${gasto.monto}`;

    // Agregar el botón de eliminar al elemento de la lista
    listItem.appendChild(deleteButton);

    listaGastos.appendChild(listItem);
  }
}

// CALCULAR Y MOSTRAR TOTAL
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

function eliminarGasto(index) {
  gastos.splice(index, 1);
  guardarGastos();
  mostrarGastos();
  calcularTotal();
}

// EVENTO CLICK Boton Borrar Lista
const botonBorrarLista = document.getElementById("boton-borrar-lista");
botonBorrarLista.addEventListener("click", function () {
  borrarListaGastos();
});

// BORRAR LISTA GASTOS
function borrarListaGastos() {
  gastos.length = 0;
  guardarGastos();
  mostrarGastos();
  calcularTotal();
}

// API Cotizacion Uruguay
let cotizacion;

async function getCotizacion() {
  const response = await fetch(
    "https://cotizaciones-brou-v2-e449.fly.dev/currency/latest"
  );
  const data = await response.json();
  const navbar = document.getElementById("navbar");
  navbar.textContent = `• Cotizacion del dolar hoy, URUGUAY: $ ${data.rates.USD.buy}`;
}

getCotizacion();

// CONECION con la Fecha Actual
const fechaActual = new Date();

const año = fechaActual.getFullYear();
const mes = fechaActual.getMonth() + 1;
const dia = fechaActual.getDate();

const navDate = document.getElementById("navDate");
navDate.textContent = `• Fecha actual: ${año}-${mes}-${dia}`;
