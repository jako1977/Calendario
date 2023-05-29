// Función para obtener los datos del archivo de Excel
function obtenerDatosExcelGoogle() {
  //descargarArchivo("", "");
  // URL del archivo de Excel en Google Drive
  var urlArchivoExcel =
    "https://docs.google.com/spreadsheets/d/1o76y3UNMMhVcQTibBi3xvoyDfOghBE1KckDZuURLjfg/edit?usp=share_link";

  // Realizar una petición HTTP GET para obtener los datos del archivo de Excel
  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlArchivoExcel, true);
  xhr.responseType = "arraybuffer";
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Obtener los datos del archivo de Excel
      //var datosExcel = xhr.responseText;
      const info = readDataGoogleSheets(xhr.response);
      for (let i = 1; i < info.length; ++i) {
        let revisa = info[i].A;
        if (revisa != "" && revisa != undefined && revisa != null) {
          const nuevoEvento = {
            evento: info[i].A.toUpperCase(),
            tipo_evento: info[i].B.toUpperCase(),
            color: info[i].C.toUpperCase(),
            repetir: info[i].D.toUpperCase(),
            alarma: info[i].E.toUpperCase(),
            alarma_correo: info[i].F.toUpperCase(),
            alarma_whatsapp: info[i].G,
            alarma_hora: info[i].H,
            alarma_tiempo: info[i].I,
            fdia: info[i].J,
            fmes: info[i].K,
            fyear: info[i].L,
            fecha: info[i].M,
          };
          let index = arrEvent.findIndex(
            (p) => p.mes === info[i].K && p.elyear === info[i].L
          );
          if (index !== -1) {
            arrEvent[index].mesevento.push(nuevoEvento);
          } else {
            arrEvent = [
              ...arrEvent,
              {
                mes: info[i].K,
                elyear: info[i].L,
                mesevento: [nuevoEvento],
              },
            ];
          }
        }
      }
    }
  };
  xhr.send();
}

// Llamar a la función para obtener los datos del archivo de Excel
obtenerDatosExcelGoogle();

function readDataGoogleSheets(x) {
  var arraybuffer = x;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
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
    dateNF: "dd/mm/yyyy",
  });
  return info;
}
