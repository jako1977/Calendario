leerGoogleDocs();
function leerGoogleDocs() {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbxDObhG3WQEVy4-OIlPDelB8gRDxPxpqN5XaKIKuclzO8b6JgC_vR_u-qfuSHyhptYyTA/exec?functionName=regresaDatos";
  arrEvent = [];
  fetch(scriptUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log("Función ejecutada:", data);
      let res = data.data;
      for (let i = 0; i < res.length; ++i) {
        let revisa = res[i][0];
        const nuevoEvento = {
          evento: res[i][0].toUpperCase(),
          tipo_evento: res[i][1].toUpperCase(),
          color: res[i][2].toUpperCase(),
          repetir: res[i][3].toUpperCase(),
          alarma: res[i][4].toUpperCase(),
          alarma_correo: res[i][5].toUpperCase(),
          alarma_whatsapp: res[i][6].toString(),
          alarma_hora: res[i][7].toString(),
          alarma_tiempo: res[i][8].toString(),
          fdia: res[i][9].toString(),
          fmes: res[i][10].toString(),
          fyear: res[i][11].toString(),
          fecha: moment(res[i][12]).format("DD/MM/YYYY").toString(),
        };
        let index = arrEvent.findIndex(
          (p) =>
            p.mes === res[i][10].toString() &&
            p.elyear === res[i][11].toString()
        );
        if (index !== -1) {
          arrEvent[index].mesevento.push(nuevoEvento);
        } else {
          arrEvent = [
            ...arrEvent,
            {
              mes: res[i][10].toString(),
              elyear: res[i][11].toString(),
              mesevento: [nuevoEvento],
            },
          ];
        }
        let detente = "";
      }
      pintarDiasEvento();
      //setTimeout(pintarDiasEvento, 2000); // 1000 ms = 1 segundo
    })
    .catch((error) => {
      console.error("Error al llamar a la función:", error);
    });
}
