const sheetID = "f0115907-7bd6-484a-b9be-a5e10b4fe3bd";
const privada = "-madrid"


// app.js

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const divescaner = document.getElementById("inicio");
const divverde = document.getElementById("contenedorhomeverde");
const divrojo = document.getElementById("contenedorrojo");
const divrojoyauqr = document.getElementById("qryautilizado");
const divqrconotrafecha = document.getElementById("qrconotrafecha");
const btndcerrarsesion = document.getElementById("cerrarsesion");



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
        `Fecha: ${Fecha}, Nombre: ${Nombre}, Tipo: ${Tipo}, ID: ${ID}`
      );

      const hoy = new Date();
      const fechaHoy = hoy.toISOString().split("T")[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD
      console.log("Validando fecha")
      console.log(fechaHoy)
      console.log(Fecha)


      if (Fecha !== fechaHoy) {
        // La fecha del QR no es la de hoy
        divqrconotrafecha.style.display = "block";
        divescaner.style.display = "none";
        cerrarCamara();
      } else {
        verificarConSheets(Casa, Fecha, Nombre, Tipo, ID); // Pass ID here
      }
    } catch (error) {
      console.error("Error al parsear el código QR", error);
      Swal.fire("Error al leer el código QR");
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
      Swal.fire("Código QR no válido");
      divrojo.style.display = "block";
      divescaner.style.display = "none";
    }
  } catch (error) {
    console.error("Error al verificar el código QR en Google Sheets", error);
    Swal.fire("Error al verificar el código QR");
  }

  cerrarCamara();
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
