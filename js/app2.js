const sheetID = "f0115907-7bd6-484a-b9be-a5e10b4fe3bd";
const privada = "-madrid";

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

    // Event listener para el clic en la página
    document.addEventListener("click", function() {
        obtenerYAgregarRegistros2();
    });

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
