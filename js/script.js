(function () {
  "use strict";

  $(document).on("click", function (e) {
    let contClass = e.target.classList;
    if (
      contClass[0] == "calendar-day" ||
      contClass == "single" ||
      contClass == "title"
    ) {
    } else {
      cierraEvento();
    }
  });
window.onload = function () {
  // alert("Page is loaded");
};
})();

const calendarBody = document.querySelector(".calendar-body");
const calendarSemana = document.querySelector(".calendar-semana");
const headerText = document.querySelector(".calendar-header-text");
const prevYearButton = document.querySelector(".prev-year-button");
const prevMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
const nextYearButton = document.querySelector(".next-year-button");
const divEventos = document.querySelector(".divEventos");
const dialog = document.querySelector("dialog");
let arrEvent = [];
let currentDate = new Date();

function obtenerDiaDeLaSemana(fecha) {
  const diasDeLaSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const dia = new Date(fecha).getDay();
  //return diasDeLaSemana[dia];
  return dia;
}

creaSemana();

function creaSemana() {
  // Crear un contenedor para los días de la semana
  const daysOfWeekContainer = document.createElement("div");
  daysOfWeekContainer.classList.add("calendar-days-of-week");

  // Crear un array con los nombres de los días de la semana
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // Crear divs para cada día de la semana y agregarlos al contenedor
  daysOfWeek.forEach((day) => {
    const cell = document.createElement("div");
    cell.classList.add("calendar-day-of-week");
    cell.textContent = day;
    daysOfWeekContainer.appendChild(cell);
  });

  // Agregar el contenedor de los días de la semana antes de los días del mes
  calendarSemana.appendChild(daysOfWeekContainer);
  createCalendar(); // Llamar a la función createCalendar() para crear el calendario por defecto
}

//crea el calendario
function createCalendar() {
  calendarBody.innerHTML = "";

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();

  // Mostrar el mes y el año en la cabecera
  headerText.textContent = `${currentDate.toLocaleDateString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;
  
  const dateM = new Date();
  const eldiames = "elmesnum-" + (dateM.getMonth() + 1);
  console.log(eldiames);
  headerText.classList.add(eldiames);
  // Crear divs para los días del mes anterior que se muestran en el calendario
  // Obtener el último día del mes anterior
  const lastDayOfPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  const iniciaCalendarMesAnte =
    lastDayOfPrevMonth.getDate() - obtenerDiaDeLaSemana(firstDayOfMonth) + 1;

  if (obtenerDiaDeLaSemana(firstDayOfMonth) > 0) {
    for (let i = 0; i < obtenerDiaDeLaSemana(firstDayOfMonth); i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("calendar-day", "calendar-day-other-month");
      dayDiv.textContent = iniciaCalendarMesAnte + i;
      calendarBody.appendChild(dayDiv);
    }
  }

  // Crear los días del mes

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    // Verificar si el día es del mismo mes que el actual
    if (date.getMonth() !== currentDate.getMonth()) {
      continue;
    }

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("calendar-day");
    dayDiv.classList.add(`day-${dayOfMonth}`);

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dayDiv.classList.add("weekend");
    }

    if (date.toDateString() === new Date().toDateString()) {
      dayDiv.classList.add("today");
    }

    dayDiv.innerHTML = `
      <div class="calendar-day-header">${dayOfMonth}</div>
      <div class="calendar-day-events"></div>
    `;

    // Agregar evento click para crear un nuevo evento
    dayDiv.addEventListener("click", () => {
      const dayDivAll = document.querySelectorAll(".calendar-day");
          dayDivAll.forEach((removeclassdiv) => {
            removeclassdiv.classList.remove("active");
          });
      divEventos.classList.remove("hidden");
      dayDiv.classList.add("active");
      //abreVentanaEvento();
    });

    calendarBody.appendChild(dayDiv);
  }
  tamañoVentanaCalendario();
}

function abreVentanaEvento() {
  dialog.showModal();
  // const event = prompt("Ingresa el nombre del evento:");
  // if (event) {
  //   const eventDiv = document.createElement("div");
  //   eventDiv.classList.add("calendar-event");
  //   eventDiv.textContent = event;
  //   dayDiv.querySelector(".calendar-day-events").appendChild(eventDiv);
  // }
}
// Agregar eventos para navegar entre meses y años
prevYearButton.addEventListener("click", () => {
  currentDate.setFullYear(currentDate.getFullYear() - 1);
  createCalendar();
});

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  createCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  createCalendar();
});

nextYearButton.addEventListener("click", () => {
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  createCalendar();
});

function tamañoVentanaCalendario() {
  const divElement = document.querySelector(".calendar");
  const ancho = divElement.offsetWidth;
  const altura = divElement.offsetHeight;

  divEventos.style.height = altura + "px";
}

function cierraEvento() {
  divEventos.classList.add("hidden");
  const dayDivAll = document.querySelectorAll(".calendar-day");
  dayDivAll.forEach((removeclassdiv) => {
    removeclassdiv.classList.remove("active");
  });
}

// function cargaEventosGoogle() {
//   // Cargar la API de Google
//   gapi.auth2.init({
//     apiKey: "AIzaSyBYzyZZdVE-UodkhyTzRiFCbtBB7ex0MPI",
//     clientId:
//       "466619968118-krpgu8tagshu9efnf5raj1g3381e9tlo.apps.googleusercontent.com",
//     discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
//     scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
//   });
    
// }

// Función para obtener los datos del archivo de Excel
function obtenerDatosExcel() {
  //descargarArchivo("", "");
    // URL del archivo de Excel en Google Drive
    var urlArchivoExcel =
      "https://docs.google.com/spreadsheets/d/1o76y3UNMMhVcQTibBi3xvoyDfOghBE1KckDZuURLjfg/edit?usp=share_link";
    
    // Realizar una petición HTTP GET para obtener los datos del archivo de Excel
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlArchivoExcel, true);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Obtener los datos del archivo de Excel
            //var datosExcel = xhr.responseText;
            const info = readData(xhr.response);
            for (let i = 1; i < info.length; ++i) {
              let revisa = info[i].A;
              if (revisa != "" && revisa != undefined && revisa != null) {
                const nuevoEvento = {
                  evento: info[i].A,
                  tipo_evento: info[i].B,
                  color: info[i].C,
                  repetir: info[i].D,
                  alarma: info[i].E,
                  alarma_correo: info[i].F,
                  alarma_whatsapp: info[i].G,
                  alarma_hora: info[i].H,
                  alarma_tiempo: info[i].I,
                  fdia: info[i].J,
                  fmes: info[i].K,
                  fyear: info[i].L,
                };
                let elEvento = info[i].K;
                let index = arrEvent.findIndex((p) => p.mes === elEvento);
                if (index !== -1) {
                  arrEvent[index].mesevento.push(nuevoEvento);
                } else {
                  arrEvent = [
                    ...arrEvent,
                    {
                      mes: elEvento,
                      mesevento: [nuevoEvento],
                    },
                  ];
                }
              }
            }

              console.log(arrEvent);
        }
    };
    xhr.send();
}

// Llamar a la función para obtener los datos del archivo de Excel
obtenerDatosExcel();

function readData(x) {
  var arraybuffer = x;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for (var i = 0; i != data.length; ++i)
    arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {
    type: "binary",
    cellDates: true,
    cellNF: false,
    cellText: false,
  });

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  var info = XLSX.utils.sheet_to_json(worksheet, {
    //header: 1,
    raw: false,
    dateNF: "yyyy-mm-dd",
  });
  //console.log(info);
  return info;
}

function formatearFecha(fechaNumerica) {
  // Crear un objeto Date con la fecha numérica
  var fecha = new Date(fechaNumerica);

  // Obtener los componentes de la fecha
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
  var anio = fecha.getFullYear();

  // Formatear la fecha en "dd/mm/yyyy"
  var fechaFormateada = (dia < 10 ? '0' + dia : dia) + '/' + (mes < 10 ? '0' + mes : mes) + '/' + anio;

  return fechaFormateada;
}

function formateaFechaLetra(fecha){
  //var fecha = "10 de enero 2023";
  let fechaMoment = moment(fecha, "DD [de] MMMM YYYY");
  let fechaFormateada = fechaMoment.format("DD/MM/YYYY");
  return fechaFormateada;
}

function esFormatoFechaValido(fecha) {
  // Convertir la entrada a cadena de texto
  fecha = fecha.toString();
  // Expresión regular para el formato "dd/mm/yyyy"
  var patron = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

  // Verificar si la fecha se ajusta al patrón
  var coincidencias = fecha.match(patron);
  if (!coincidencias) {
    return false; // No se ajusta al patrón
  }

  // Extraer los componentes de la fecha
  var dia = parseInt(coincidencias[1], 10);
  var mes = parseInt(coincidencias[2], 10);
  var anio = parseInt(coincidencias[3], 10);

  // Verificar si los componentes son válidos
  if (
    dia < 1 ||
    dia > 31 ||
    mes < 1 ||
    mes > 12 ||
    anio < 1000 ||
    anio > 9999
  ) {
    return false; // Componentes no válidos
  }

  return true; // El formato de fecha es válido
}

// Función para descargar un archivo desde Google Drive
function descargarArchivo(idArchivo, nombreArchivo) {
  // URL de la API de Google Drive para descargar archivos
  //var urlAPI = "https://www.googleapis.com/drive/v3/files/" + idArchivo + "?alt=media";
  var urlAPI =
    "https://docs.google.com/spreadsheets/d/1o76y3UNMMhVcQTibBi3xvoyDfOghBE1KckDZuURLjfg/edit?usp=share_link";
  nombreArchivo = "excelDrive.xls";
  // Opciones de la solicitud HTTP
  var opcionesSolicitud = {
    method: "GET",
    headers: {
      //"Content-Type": "application/octet-stream" // Cambiar el tipo de contenido a "application/octet-stream"
      Accept:
       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Especifica el tipo de contenido como Excel
    },
  };
  // Realizar una petición HTTP GET para descargar el archivo
  fetch(urlAPI, opcionesSolicitud)
    .then(function (response) {
      return response.blob();
    })
    .then(function (datosArchivo) {
      // Crear un enlace de descarga para el archivo
      var enlaceDescarga = document.createElement("a");
      enlaceDescarga.href = URL.createObjectURL(datosArchivo);
      enlaceDescarga.download = nombreArchivo;

      // Agregar el enlace de descarga al documento y hacer clic en él para descargar el archivo
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
    })
    .catch(function (error) {
      console.error("Error al descargar el archivo:", error);
    });
}
