// Función para obtener los datos del archivo de Excel
function obtenerDatosExcelNormal() {
  var url = "excel/eventos.xlsx";
  const oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (e) {
    const info = readDataExcelServer(oReq.response);
      for (let i = 0; i < info.length; ++i) {
        let revisa = info[i].evento;
        if (revisa != "" && revisa != undefined && revisa != null) {
          const nuevoEvento = {
            evento: info[i].evento.toUpperCase(),
            tipo_evento: info[i].tipoEvento.toUpperCase(),
            color: info[i].color.toUpperCase(),
            repetir: info[i].repetir.toUpperCase(),
            alarma: info[i].alarma.toUpperCase(),
            alarma_correo: info[i].alarmaC.toUpperCase(),
            alarma_whatsapp: info[i].alarmaW,
            alarma_hora: info[i].alarmaH,
            alarma_tiempo: info[i].alarmaT,
            fdia: info[i].fDia,
            fmes: info[i].fMes,
            fyear: info[i].fYear,
            fyear: info[i].fecha,
          };
          let elEvento = info[i].fMes;
          let index = arrEvent.findIndex(
            (p) => p.mes === info[i].fMes && p.elyear === info[i].fYear
          );
          if (index !== -1) {
            arrEvent[index].mesevento.push(nuevoEvento);
          } else {
            arrEvent = [
              ...arrEvent,
              {
                mes: info[i].fMes,
                elyear: info[i].fYear,
                mesevento: [nuevoEvento],
              },
            ];
          }
        }
      }    
  };
  oReq.send();
}

//obtenerDatosExcelNormal();

function readDataExcelServer(x) {
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
    // header: 1,
    raw: false,
    dateNF: "yyyy-mm-dd",
  });
  return info;
}
