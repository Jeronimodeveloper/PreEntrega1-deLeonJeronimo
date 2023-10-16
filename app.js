mostrarGastos();
calcularTotal();

// OBETER FECHA
const fechaActual = new Date();

const año = fechaActual.getFullYear();
const mes = fechaActual.getMonth() + 1;
const dia = fechaActual.getDate();

const navDate = document.getElementById("navDate");
navDate.textContent = `${año}-${mes}-${dia}`;

// API Cotizacion Uruguay
let cotizacion;

async function getCotizacion() {
  const response = await fetch(
    "https://cotizaciones-brou-v2-e449.fly.dev/currency/latest"
  );
  const data = await response.json();
  const navUsd = document.getElementById("navUsd");
  navUsd.textContent = `URUGUAY: $ ${data.rates.USD.buy}`;
}

getCotizacion();

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
  calcularTotalEnDolares();

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

    // DIV para lista y boton
    let listItemContainer = document.createElement("div");
    listItemContainer.classList.add("row", "mb-1");

    // DIV para Elemento de la lista
    let listItem = document.createElement("div");
    listItem.textContent = `${gasto.descripcion}: $ ${gasto.monto}`;
    listItem.classList.add(
      "col-8",
      "text-light",
      "text-capitalize",
      "text-start"
    );

    // BOTON ELiminar
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add(
      "btn",
      "btn-light",
      "btn-sm",
      "col-4",
      "text-right"
    );
    deleteButton.addEventListener("click", function () {
      eliminarGasto(i);
    });

    // AGREGAR Elemento y Boton
    listItemContainer.appendChild(listItem);
    listItemContainer.appendChild(deleteButton);

    listaGastos.appendChild(listItemContainer);
  }
}

// BOTON ELIMIANR GASTO
function eliminarGasto(index) {
  gastos.splice(index, 1);
  guardarGastos();
  mostrarGastos();
  calcularTotal();
  calcularTotalEnDolares();
}

// CALCULAR TOTAL EN PESOS
function calcularTotal() {
  let gastos = localStorage.getItem("gastos");
  gastos = JSON.parse(gastos);
  let total = 0;

  for (let i = 0; i < gastos.length; i++) {
    total += parseInt(gastos[i].monto);
  }

  // MOSTRAR TOTAL
  let totalContainer = document.getElementById("totalContainer");

  totalContainer.innerHTML = "• PESOS Uy $ " + total;
  totalContainer.classList.add("text-light");
}

// CALCULAR TOTAL EN DOLARES
async function calcularTotalEnDolares() {
  let gastos = localStorage.getItem("gastos");
  gastos = JSON.parse(gastos);
  let total = 0;

  for (let i = 0; i < gastos.length; i++) {
    total += parseInt(gastos[i].monto);
  }

  // Obtener la cotización desde la API
  const response = await fetch(
    "https://cotizaciones-brou-v2-e449.fly.dev/currency/latest"
  );
  const data = await response.json();
  const cotizacionDolar = data.rates.USD.buy;

  const totalEnDolares = (total / cotizacionDolar).toFixed(2);

  const totalDolaresElement = document.getElementById("totalDolares");
  totalDolaresElement.textContent = "• DOLARES: us$ " + totalEnDolares;
  totalDolaresElement.classList.add("text-light");
}

calcularTotalEnDolares();

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
