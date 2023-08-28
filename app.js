let entrada = prompt("Ingresa una palabra para contar sus vocales");

function contarVocales(entrada) {
  entrada = entrada.toLowerCase();

  let vocales = 0;

  for (let i = 0; i < entrada.length; i++) {
    const index = entrada[i];
    if (
      index === "a" ||
      index === "e" ||
      index === "i" ||
      index === "o" ||
      index === "u"
    ) {
      vocales++;
    }
  }
  return vocales;
}

const resultado = contarVocales(entrada);
alert(entrada + " contiene " + resultado + " vocales");
