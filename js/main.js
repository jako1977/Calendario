let colores = [];
let arrEvent = [];
(function () {
  ("use strict");

  $(document).on("click", function (e) {
    let contClass = e.target.classList;
    if (
      contClass[0] == "calendar-day" ||
      contClass == "single" ||
      contClass == "title" ||
      contClass == "calendar-event-g" ||
      contClass == "calendar-day-events" ||
      contClass == "divEventos"
    ) {
    } else {
      cierraEvento();
    }
  });

  //datos desde Google Sheets
  //obtenerDatosExcelGoogle();

  //datos desde excel en la carpeta
  //obtenerDatosExcelNormal();
  arreglodeColores();
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
let elmesclass, elyearclass;
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
    });

    calendarBody.appendChild(dayDiv);
  }
  tamañoVentanaCalendario();
  setTimeout(pintarDiasEvento, 1000); // 1000 ms = 1 segundo
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
  elmesclass = "calendar-header-text elmesnum-" + (currentDate.getMonth() + 1);
  headerText.removeAttribute("class");
  headerText.className = elmesclass;
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  createCalendar();
  elmesclass = "calendar-header-text elmesnum-" + (currentDate.getMonth() + 1);
  headerText.removeAttribute("class");
  headerText.className = elmesclass;
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

function pintarDiasEvento() {
  let mesactual = headerText.classList[1].split("-");
  let elyearactual = currentDate.getFullYear().toString();
  let buscames = arrEvent.find(
    (p) => p.mes === mesactual[1] && p.elyear === elyearactual
  );
  //let cuentaeventos = buscames.mesevento.length;
  console.log(buscames);
  if (buscames != undefined && buscames != "" && buscames != null) {
    for (let d of buscames.mesevento) {
      let colorbag = d.color;
      let classdiaevent = `.day-${d.fdia}`;
      const divDiaEvent = document.querySelector(classdiaevent); //.getElementsByClassName("calendar-day-events")
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("calendar-event-g");
      let buscacolor = colores.find((c) => c.nombre == colorbag);
      eventDiv.style.backgroundColor = buscacolor.colorbag;
      eventDiv.style.color = buscacolor.colortext;
      eventDiv.textContent = d.evento;
      divDiaEvent.querySelector(".calendar-day-events").appendChild(eventDiv);
      let detente = "";
    }
  }
}
