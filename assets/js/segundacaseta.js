const sheetID = "f0115907-7bd6-484a-b9be-a5e10b4fe3bd";
const privada = "-madrid"


// app.js

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const divescaner = document.getElementById("inicio");
const divverde = document.getElementById("contenedorhomeverde");
const divrojo = document.getElementById("contenedorhomerojo");
const divrojoyauqr = document.getElementById("qryautilizado");
const divqrconotrafecha = document.getElementById("qrconotrafecha");
const btndcerrarsesion = document.getElementById("cerrarsesion");
const divazul = document.getElementById("contenedorhomeazul");



const btnScanQR = document.getElementById("btn-scan-qr");
let scanning = false;

const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

const activarSonido = () => {
  var audio = document.getElementById("audioScaner");
  audio.play();
};

qrcode.callback = (respuesta) => {
  if (respuesta) {
    try {
      const datosQR = JSON.parse(respuesta);
      const { Casa, Nombre, Fecha, Tipo, ID } = datosQR;
      console.log(
        `Casa: ${Casa},Fecha: ${Fecha}, Nombre: ${Nombre}, Tipo: ${Tipo}, ID: ${ID}`
      );

      const obtenerFechaHoy = () => {
        const hoy = new Date();
        return new Intl.DateTimeFormat('es-ES', { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit' }).format(hoy);
      };
      // Formatear la fecha para obtener el formato YYYY-MM-DD
      const formatearFecha = (fecha) => {
        const partes = fecha.split('/');
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
      };

      const fechaHoy = formatearFecha(obtenerFechaHoy());
      console.log("Validando fecha")
      console.log(fechaHoy)
      console.log(Fecha)

      if (Tipo === "QRResidente") {
        console.log("Este es un QR Dinamico para Residentes");
      
        const obtenerFechaHoraActual = () => {
          const hoy = new Date();
          return hoy.toLocaleString('es-ES', {
            timeZone: 'America/Mexico_City',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });
        };
      
        const fechaHoraActual = obtenerFechaHoraActual();
        console.log("Validando fecha");
        console.log("Fecha del QR:", Fecha);
        console.log("Fecha actual:", fechaHoraActual);
      
        // Función para convertir una fecha en formato 'DD/MM/YYYY, HH:MM:SS' a un objeto Date
        const convertirFecha = (fechaStr) => {
          const partes = fechaStr.split(", ");
          const fechaPartes = partes[0].split("/");
          const tiempoPartes = partes[1].split(":");
      
          const dia = parseInt(fechaPartes[0], 10);
          const mes = parseInt(fechaPartes[1], 10) - 1; // Los meses en JavaScript son 0-indexados
          const año = parseInt(fechaPartes[2], 10);
      
          const horas = parseInt(tiempoPartes[0], 10);
          const minutos = parseInt(tiempoPartes[1], 10);
          const segundos = parseInt(tiempoPartes[2], 10);
      
          return new Date(año, mes, dia, horas, minutos, segundos);
        };
      
        // Convierte las cadenas de fecha y hora a objetos Date
        const fechaQR = convertirFecha(Fecha);
        const fechaActual = convertirFecha(fechaHoraActual);
      
        // Calcula la diferencia en minutos
        const diferenciaMinutos = (fechaActual - fechaQR) / (1000 * 60);
        console.log("Diferencia Minutos: ", diferenciaMinutos);
      
        if (diferenciaMinutos < 120) {
          console.log("El código QR es válido, menos de 120 minutos de vigencia.");
          activarSonido();
      
          const url = `https://sheet.best/api/sheets/${sheetID}/tabs/qrresidentes${privada}`;
          fetch(url)
            .then(response => response.json())
            .then(async data => {
              // Verificar si el registro existe en la hoja de cálculo
              const registroIndex = data.findIndex((registro) => registro.idunico === ID);
              console.log(registroIndex);
      
              if (registroIndex !== -1) {
                const registro = data[registroIndex];
                if (registro.ingresoc2) {
                  // Ya hay un valor en ingresoc2
                  divrojoyauqr.style.display = "block";
                  divescaner.style.display = "none";


                  activarSonido();
                } else {
                  // No hay valor en ingresoc2, se puede registrar
                  const hoy = new Date();
                  const fechaHoy = hoy.toISOString().split("T")[0];
                  const horaHoy = hoy.toTimeString().split(" ")[0];
                  console.log(`Índice del registro: ${registroIndex}`);
                  await actualizarQRResidente(sheetID, registroIndex, fechaHoy, horaHoy);
      
                  document.getElementById("domres").innerText = Casa;
                  document.getElementById("nomres").innerText = Nombre;
                  document.getElementById("idUnicores").innerText = ID;
      
                  divescaner.style.display = "none";
                  divverde.style.display = "none";
                  divazul.style.display = "block";

                  console.log("El residente puede pasar")
      
                  activarSonido();
                }
              } else {
                // QR no válido
                divrojo.style.display = "block";
                divescaner.style.display = "none";
                activarSonido();
              }
            })
            .catch(error => {
              console.error("Error al verificar el código QR en Google Sheets", error);
              Swal.fire("Error al verificar el código QR");
              activarSonido();
              cerrarCamara();
            });
      
        } else {
          divrojo.style.display = "block";
          divescaner.style.display = "none";
          activarSonido();
        }
      }
      
      
      else if (Fecha !== fechaHoy) {
        // La fecha del QR no es la de hoy
        divqrconotrafecha.style.display = "block";
        divescaner.style.display = "none";
        activarSonido();

        cerrarCamara();
      } else {
        verificarConSheets(Casa, Fecha, Nombre, Tipo, ID); // Pass ID here
      }
    } catch (error) {
      console.error("Error al parsear el código QR", error);
      Swal.fire("Error al leer el código QR");
      activarSonido();

      cerrarCamara();
    }
  }
};

window.addEventListener("load", (e) => {
  encenderCamara();
});

const verificarConSheets = async (Casa, Nombre, Fecha, Tipo, id) => {
  // Add id parameter
  const url = `https://sheet.best/api/sheets/${sheetID}/tabs/visitas${privada}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Verificar si el registro existe en la hoja de cálculo
    const registroIndex = data.findIndex((registro) => registro.idunico === id); // Use id here

    if (registroIndex !== -1) {
      const registro = data[registroIndex];

      if (registro.ingresoc2) {
        // Ya hay un valor en ingresoc2
        divrojoyauqr.style.display = "block";
        divescaner.style.display = "none";
      } else {
        // No hay valor en ingresoc2, se puede registrar
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
        const horaHoy = hoy.toTimeString().split(" ")[0];
        console.log(`Índice del registro: ${registroIndex}`);
        await actualizarIngreso(sheetID, registroIndex, fechaHoy, horaHoy);
        
        document.getElementById("dom").innerText = Casa;
        document.getElementById("nom").innerText = Fecha;
        document.getElementById("fecha").innerText = Nombre;
        document.getElementById("tipo").innerText = Tipo;
        document.getElementById("idUnico").innerText = id;

        divescaner.style.display = "none";
        divverde.style.display = "block";

        activarSonido();
      }
    } else {
      // QR no válido
      divrojo.style.display = "block";
      divescaner.style.display = "none";
      activarSonido();

    }
  } catch (error) {
    console.error("Error al verificar el código QR en Google Sheets", error);
    Swal.fire("Error al verificar el código QR");
  }
  activarSonido();

  cerrarCamara();
};

const actualizarQRResidente = async (sheetID, rowIndex, fecha, hora) => {
  const url = `https://sheet.best/api/sheets/${sheetID}/tabs/qrresidentes${privada}/${rowIndex}`;

  const opciones = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingresoc2: `${fecha} ${hora}` }),
  };

  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error("Error al actualizar la hoja de cálculo");
    }
  } catch (error) {
    console.error("Error al actualizar la hoja de cálculo", error);
    Swal.fire("Error al actualizar la hoja de cálculo");
  }
};


const actualizarIngreso = async (sheetID, rowIndex, fecha, hora) => {
  const url = `https://sheet.best/api/sheets/${sheetID}/tabs/visitas${privada}/${rowIndex}`;

  const opciones = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingresoc2: `${fecha} ${hora}` }),
  };

  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error("Error al actualizar la hoja de cálculo");
    }
  } catch (error) {
    console.error("Error al actualizar la hoja de cálculo", error);
    Swal.fire("Error al actualizar la hoja de cálculo");
  }
};

function regresar() {
  console.log("Regresando a pagina principal");
  divrojoyauqr.style.display = "none";
  divqrconotrafecha.style.display = "none";
  divescaner.style.display = "block";
  divverde.style.display = "none";
  divrojo.style.display = "none";
  divazul.style.display = "none";

  scan()
  tick()
}

document.querySelectorAll(".refresh-btn").forEach(button => {
  button.addEventListener("click", regresar);
});

document.addEventListener("DOMContentLoaded", function() {
  // Variable para almacenar los idunico ya agregados
  const idunicosAgregados = new Set();

  // Función para obtener los datos del API y agregar los registros de hoy
  function obtenerYAgregarRegistros2() {
      console.log("actualizando");
      const url = `https://sheet.best/api/sheets/${sheetID}/tabs/visitas${privada}`;
      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              console.log(data); // Imprime los datos obtenidos desde la API

              // Filtrar los registros para obtener solo los de hoy
              const registrosHoy = data.filter((fila) => esFechaHoy(fila.fecha));

              // Procesar los datos y agregarlos a los contenedores de calle
              agregarRegistros("alba-registrosss", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkN0byBKdWFuIENhcmxvc")));
              agregarRegistros("caballeros-registrosss", registrosHoy.filter((registro) => registro.domicilio.startsWith("IlBvcnRhbGVzI")));
              agregarRegistros("esmeralda-registrosss", registrosHoy.filter((registro) => registro.domicilio.startsWith("Ik1hcm1vbGVzID")));
              agregarRegistros("eros-registrosss", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkdyYW4gVmlhI")));
              agregarRegistros("magdalena-registrosss", registrosHoy.filter((registro) => registro.domicilio.startsWith("IlBsYXphIEFsdGEg")));
              //agregarRegistros("ibiza-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IklCSVpBI")));
              //agregarRegistros("hierro-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkhJRVJSTy")));
          })
          .catch((error) => {
              console.error(error);
          });
  }

  // Función para agregar registros a un contenedor de calle
  function agregarRegistros(contenedorId, registros) {
      const contenedor = document.getElementById(contenedorId);
      if (!contenedor) {
          console.error(`Contenedor con id ${contenedorId} no encontrado.`);
          return;
      }

      registros.forEach(registro => {
          const registroId = `div${registro.idunico}`;
          const elementoExistente = document.getElementById(registroId);

          if (registro.ingresoc2) {
              // Si el registro tiene ingresoc2 y el elemento existe, remuévelo
              if (elementoExistente) {
                  elementoExistente.remove();
              }
          } else {
              // Si el registro no tiene ingresoc2 y el elemento no existe, agréguelo
              if (!elementoExistente) {
                  const registroHTML = `
                      <div id="${registroId}" class="registro-item">
                          <p><strong>Domicilio:</strong> ${atob(registro.domicilio)}</p>
                          <p><strong>Nombre:</strong> ${registro.namevisita}</p>
                          <p><strong>Fecha:</strong> ${registro.fecha}</p>
                          <p><strong>Tipo:</strong> ${registro.tipo}</p>
                          <p><strong>Entrada Caseta Principal:</strong> ${registro.ingresoc1}</p>
                      </div>
                  `;
                  contenedor.insertAdjacentHTML('beforeend', registroHTML);
              }
          }
      });
  }

  // Función para convertir una fecha de texto en un objeto de fecha
  function obtenerFechaObj(fechaTexto) {
      // Verificar si fechaTexto es null antes de intentar dividirla
      if (!fechaTexto) {
          return null;
      }

      // Dividir la fecha por el carácter '-' en lugar de ' '
      const partes = fechaTexto.split('-');
      const año = parseInt(partes[0]);
      const mes = parseInt(partes[1]) - 1; // Restar 1 al mes ya que en JavaScript los meses van de 0 a 11
      const dia = parseInt(partes[2]);

      return new Date(año, mes, dia);
  }

  // Función para verificar si una fecha es hoy
  function esFechaHoy(fechaComparar) {
      // Verificar si fechaComparar es null antes de intentar usarla
      if (!fechaComparar) {
          return false;
      }

      const fechaCompararObj = obtenerFechaObj(fechaComparar);
      const fechaActual = new Date();
      return fechaCompararObj && fechaCompararObj.toDateString() === fechaActual.toDateString();
  }

  // Event listener para el clic en el elemento details
  const detalles = document.querySelectorAll("details");
  detalles.forEach(detalle => {
      detalle.addEventListener("toggle", function() {
          if (this.open) {
              obtenerYAgregarRegistros2();
          }
      });
  });

  // Llamar a las funciones una vez al cargar la página para cargar los registros iniciales
  obtenerYAgregarRegistros2();
});
