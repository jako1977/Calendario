let colores = [];
arreglodeColores();
llenaSelect();
document.getElementById("fecha").value = moment(new Date()).format(
  "DD/MM/YYYY"
);
const url =
  "https://script.google.com/macros/s/AKfycbxDObhG3WQEVy4-OIlPDelB8gRDxPxpqN5XaKIKuclzO8b6JgC_vR_u-qfuSHyhptYyTA/exec";

const handleSubmit = (event) => {
  event.preventDefault();
  let fecha = document.getElementById("fecha1").value;
  let fechaF = moment(fecha).format("DD/MM/YYYY");
  document.getElementById("fecha").value = fechaF.toString();
  
  let fechaSel = [];
  fechaSel = fechaF.split("/");
  document.getElementById("fDia").value = fechaSel[0];
  document.getElementById("fMes").value = fechaSel[1];
  document.getElementById("fYear").value = fechaSel[2];
  
  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log("Formulario enviado con éxito"),
            limpiaInputs())
    .catch((error) => alert(error));
};

document.getElementById("formulario").addEventListener("submit", handleSubmit);

function llenaSelect() {
  let select = document.getElementById("color");
  //select.remove();
  colores.forEach((element) => {
    // valores += `<option value="${element.nombre}" selected>${element.nombre}</option>`;
    const option = document.createElement("option");
    const valor = element.nombre;
    option.value = valor;
    option.text = valor;
    select.appendChild(option);
  });
}

function limpiaInputs(){
  document.getElementById("fDia").value ="";
  document.getElementById("fMes").value ="";
  document.getElementById("fYear").value ="";
  document.getElementById("evento").value ="";
  document.getElementById("tipoEvento").value ="";
}
