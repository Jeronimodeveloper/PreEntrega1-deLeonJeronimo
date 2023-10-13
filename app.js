// Array para almacenar los gastos
const gastos = [];

// Funcion para tomar los datos y sumarlos al Array de "gastos"
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

  // Limpiar campos de entrada
  document.getElementById("inputMonto").value = "";
  document.getElementById("inputDescripcion").value = "";

  Swal.fire({
    icon: "success",
    title: "Gasto agregado",
    text: "El gasto se ha agregado con éxito.",
  });
}

// Evento Tecla Enter
const inputDescripcion = document.getElementById("inputDescripcion");
const inputMonto = document.getElementById("inputMonto");

inputDescripcion.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que se haga un salto de línea en el campo de entrada
    sumarGasto();
  }
});

inputMonto.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que se haga un salto de línea en el campo de entrada
    sumarGasto();
  }
});

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

function eliminarGasto(index) {
  gastos.splice(index, 1); // Eliminar el gasto del array
  guardarGastos(); // Actualizar el almacenamiento local
  mostrarGastos(); // Actualizar la lista de gastos
  calcularTotal(); // Recalcular el total
}

let cotizacion;

async function getCotizacion() {
  const response = await fetch(
    "https://cotizaciones-brou-v2-e449.fly.dev/currency/latest"
  );
  const data = await response.json();
  const navbar = document.getElementById("navbar");
  navbar.textContent = "La cotizacion del dolar hoy es: " + data.rates.USD.buy;
  // .then((response) => response.json())
  // .then((data) => {
  //   cotizacion = data.rates.USD.buy;
  // });
}

getCotizacion();
