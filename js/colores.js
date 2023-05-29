function colorTexto(nombre) {
  // Convierte el color de Hex a RGB
  let r = parseInt(nombre.substring(1, 3), 16);
  let g = parseInt(nombre.substring(3, 5), 16);
  let b = parseInt(nombre.substring(5, 7), 16);
  // Calcula el brillo del color
  let brillo = (r * 299 + g * 587 + b * 114) / 1000;
  // Compara el brillo con el umbral
  if (brillo > 128) {
    return "#000"; // Color oscuro, texto blanco
  } else {
    return "#fff"; // Color claro, texto negro
  }
}

function arreglodeColores() {
  let colorsbg = [
    { nombre: "AMARILLO", colorbag: "#ffbf00" },
    { nombre: "AQUA", colorbag: "#00ffff" },
    { nombre: "AZUL", colorbag: "#0000FF" },
    { nombre: "BLANCO", colorbag: "#ffffff" },
    { nombre: "CIAN", colorbag: "#00ffff" },
    { nombre: "GRIS", colorbag: "#808080" },
    { nombre: "LIMA", colorbag: "#00ff00" },
    { nombre: "MAGENTA", colorbag: "#ff00ff" },
    { nombre: "MARRON", colorbag: "#964b00" },
    { nombre: "MORADO", colorbag: "#800080" },
    { nombre: "NARANJA", colorbag: "#FF9900" },
    { nombre: "NEGRO", colorbag: "#000000" },
    { nombre: "ORO", colorbag: "#ffd700" },
    { nombre: "PLATA", colorbag: "#c0c0c0" },
    { nombre: "ROJO", colorbag: "#FF0000" },
    { nombre: "ROSA", colorbag: "#ff69b4" },
    { nombre: "SALMON", colorbag: "#fa8072" },
    { nombre: "TURQUESA", colorbag: "#40e0d0" },
    { nombre: "VERDE", colorbag: "#00B300" },
    { nombre: "VIOLETA", colorbag: "#8a2be2" },
  ];

  for (let i = 0; i < colorsbg.length; i++) {
    let nuevoColor = {
      nombre: colorsbg[i].nombre,
      colorbag: colorsbg[i].colorbag,
      colortext: colorTexto(colorsbg[i].colorbag),
    };
    colores.push(nuevoColor);
  }
}
