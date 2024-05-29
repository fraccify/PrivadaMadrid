const formulario = document.getElementById("formulario");
const formularioadmin = document.getElementById("formularioadmin");
const home = document.getElementById("home");
const inicio = document.getElementById("inicio");
const propietarioSpan = document.getElementById("propietario");
const domicilioSpan = document.getElementById("domicilio");
const correoSpan = document.getElementById("correo"); // Agregado el span para mostrar el correo
const statusSpan = document.getElementById("status");
const ene2024Span = document.getElementById("ene2024");
const feb2024Span = document.getElementById("feb2024");
const mar2024Span = document.getElementById("mar2024");
const abr2024Span = document.getElementById("abr2024");
const may2024Span = document.getElementById("may2024");
const jun2024Span = document.getElementById("jun2024");
const jul2024Span = document.getElementById("jul2024");
const ago2024Span = document.getElementById("ago2024");
const sep2024Span = document.getElementById("sep2024");
const oct2024Span = document.getElementById("oct2024");
const nov2024Span = document.getElementById("nov2024");
const dic2024Span = document.getElementById("dic2024");
const ene2023Span = document.getElementById("ene2023");
const feb2023Span = document.getElementById("feb2023");
const mar2023Span = document.getElementById("mar2023");
const abr2023Span = document.getElementById("abr2023");
const may2023Span = document.getElementById("may2023");
const jun2023Span = document.getElementById("jun2023");
const jul2023Span = document.getElementById("jul2023");
const ago2023Span = document.getElementById("ago2023");
const sep2023Span = document.getElementById("sep2023");
const oct2023Span = document.getElementById("oct2023");
const nov2023Span = document.getElementById("nov2023");
const dic2023Span = document.getElementById("dic2023");
const selectYear = document.getElementById("selectYear"); 
const tags = document.getElementById("tags");
const paymentHistory2024 = document.getElementById("paymentHistory2024");
const homepage = document.getElementById("homepage");
const botones = document.getElementById("botones");
const divbotonhistorico = document.getElementById("divbotonhistorico");
const divbotonpago = document.getElementById("divbotonpago");
const divbotonreservar = document.getElementById("divbotonreservar");
const divbotonvisitas = document.getElementById("divbotonvisitas");
const divregreso = document.getElementById("divregreso");
const divingresos = document.getElementById("divingresos");
const divpagos = document.getElementById("divpagos");
const btnenviaringreso = document.getElementById("btnenviaringreso");
const confirmacion = document.getElementById("confirmacion");
const formulario2 = document.getElementById("formulario2");
const segurichat = document.getElementById("segurichat");
const divqr = document.getElementById("divqr");
const iniciodatos = document.getElementById("iniciodatos");
const datoscorrectosvisitas  = document.getElementById("datoscorrectosvisitas");
const btnenborrar  = document.getElementById("btnenborrar");
const divnuevoregistro  = document.getElementById("nuevoregistro");
const divamenidades  = document.getElementById("divamenidades");
const divreservar  = document.getElementById("divreservar");
const confirmarreserca  = document.getElementById("confirmarreserca");
const divmisreservas  = document.getElementById("divmisreservas");
var today = new Date().toISOString().split('T')[0];
var loggedIn = true
const btndcerrarsesion  = document.getElementById("cerrarsesion");
const btncerrarsesionadmin  = document.getElementById("cerrarsesionadmin");
const tipo3Span = document.getElementById("tipo3");
const namevisita3Span = document.getElementById("namevisita3");
const fechavisita3Span = document.getElementById("fechavisita3");
const domdvisistaSpan = document.getElementById("domdvisista");
const divpagocargado = document.getElementById("pagocargado");
const divseguridad = document.getElementById("seguridad");
const sheetID = "f0115907-7bd6-484a-b9be-a5e10b4fe3bd";
const privada = "-madrid"



let sesionIniciada = false;

let checkbox = document.getElementById("avisoPrivacidad");

checkbox.addEventListener('click', function() {
    let aceptoAvisoPrivacidad = checkbox.checked;
    console.log("Valor actual del checkbox:", aceptoAvisoPrivacidad);
    // Aquí puedes realizar cualquier otra acción que necesites con el valor del checkbox
});


document.getElementById("cerrarsesion").addEventListener("click", function() {
    window.location.reload();
});

document.getElementById("cerrarsesionadmin").addEventListener("click", function() {
    window.location.reload();
});

function cifrarCorreo(valor) {
    var texto = JSON.stringify(valor);
    var bytes = new TextEncoder().encode(texto);
    var cifrado = btoa(String.fromCharCode.apply(null, bytes));
    return cifrado;
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioInput = document.getElementById("username").value;
    console.log(usuarioInput)

    const contraseñaInput = document.getElementById("contrasena").value;
    console.log(contraseñaInput)


    if ((usuarioInput === "CENTINELA" && contraseñaInput === "Mh6789qr") || (usuarioInput === "AGCH" && contraseñaInput === "Mh6789qr")) {
        window.location.href = "segundacaseta.html";

        
    } else if((usuarioInput === "CENTINELA" && contraseñaInput === "Principal") || (usuarioInput === "AGCH" && contraseñaInput === "Principal")){
        window.location.href = "seguridadcasetaprincipal.html";
    } else {
        const urlProp = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}`;
        fetch(urlProp)            //actualización
            .then((response) => response.json())
            .then((data) => {

                const correoCifradoInput = cifrarCorreo(usuarioInput);
                console.log(usuarioInput)
                console.log(correoCifradoInput)
                const correosCifrados = data.map((fila) => fila.correo);
                const indice = correosCifrados.findIndex((correoCifrado) => correoCifrado === correoCifradoInput);
                const contraseñasCifradas = data.map((fila) => fila.password);
                console.log(indice)
                const aceptoAvisoPrivacidad2 = checkbox.checked;

                if (aceptoAvisoPrivacidad2) {
                    if (indice !== -1) {
                        const contraseñaCifrada = contraseñasCifradas[indice];
                        console.log(contraseñaCifrada)
                        const contraseñaCifradoInput = cifrarCorreo(contraseñaInput);
                        console.log(contraseñaCifradoInput)
                        if (contraseñaCifrada === contraseñaCifradoInput) {
                            console.log("Inicio de sesión exitoso");
                            const cliente = atob(data[indice].Cliente);
                            const clientecod = data[indice].Cliente; // Accede directamente al cliente en lugar de usar map

                            const domicilio = atob(data[indice].dom); // Accede directamente al domicilio en lugar de usar map
                            const domiciliocod = data[indice].dom; // Accede directamente al domicilio en lugar de usar map

                            const status = data[indice].status;
                            const statuscod = data[indice].status;

                            ene2023Span.textContent = (data[indice].ene2023);
                            feb2023Span.textContent = (data[indice].feb2023);
                            mar2023Span.textContent = (data[indice].mar2023);
                            abr2023Span.textContent = (data[indice].abr2023);
                            may2023Span.textContent = (data[indice].may2023);
                            jun2023Span.textContent = (data[indice].jun2023);
                            jul2023Span.textContent = (data[indice].jul2023);
                            ago2023Span.textContent = (data[indice].ago2023);
                            sep2023Span.textContent = (data[indice].sep2023);
                            oct2023Span.textContent = (data[indice].oct2023);
                            nov2023Span.textContent = (data[indice].nov2023);
                            dic2023Span.textContent = (data[indice].dic2023);
                            ene2024Span.textContent = (data[indice].ene2024);
                            feb2024Span.textContent = (data[indice].feb2024);
                            mar2024Span.textContent = (data[indice].mar2024);
                            abr2024Span.textContent = (data[indice].abr2024);
                            may2024Span.textContent = (data[indice].may2024);
                            jun2024Span.textContent = (data[indice].jun2024);
                            jul2024Span.textContent = (data[indice].jul2024);
                            ago2024Span.textContent = (data[indice].ago2024);
                            sep2024Span.textContent = (data[indice].sep2024);
                            oct2024Span.textContent = (data[indice].oct2024);
                            nov2024Span.textContent = (data[indice].nov2024);
                            dic2024Span.textContent = (data[indice].dic2024);
                            

                            propietarioSpan.textContent = cliente;
                            domicilioSpan.textContent = domicilio;
                            domdvisistaSpan.textContent = domicilio;


                            correoSpan.textContent = usuarioInput; // Muestra el correo ingresado
                            statusSpan.textContent = status;

                            homepage.style.display = "none";
                            btndcerrarsesion.style.display = "block"
                            tags.style.display = "block";
                            btndcerrarsesion.style.display = "block"
                            inicio.style.display = "block";
                            botones.style.display = "block";


                            document.getElementById('fechavisita').setAttribute('min', today);
                            document.getElementById('fechareserva').setAttribute('min', today);

                            document.getElementById("divbotonhistorico").addEventListener("click", updatePaymentHistory);
                            document.getElementById("divbotonpago").addEventListener("click", redireccionarPagos);
                            document.getElementById("divregreso").addEventListener("click", regresar);
                            document.getElementById("divbotonvisitas").addEventListener("click", ingresos);
                            document.getElementById("divbotonvisitas").addEventListener("click", ingresos);
                            document.getElementById("btnenviaringreso").addEventListener("click", enviarsdei);
                            document.getElementById("datoscorrectosvisitas").addEventListener("click", confirmacionvyp);
                            document.getElementById("nuevoregistro").addEventListener("click", nuevoregistro);
                            document.getElementById("divbotonreservar").addEventListener("click", calendario);
                            document.getElementById("confirmarreserca").addEventListener("click", registrarReserva);
                            document.getElementById("misreservsas").addEventListener("click", toggleMisReservas);
                            document.getElementById("enviarpago").addEventListener("click", enviardatospago);
                            document.getElementById("btnreciboene2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibofeb2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibomar2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnreciboabr2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibomay2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibojun2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibojul2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnreciboago2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibosep2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibooct2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibonov2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibodic2024").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnreciboene2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnreciboene2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibofeb2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibomar2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnreciboabr2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibomay2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibojun2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibojul2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnreciboago2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibosep2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibooct2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibonov2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("btnrecibodic2023").addEventListener("click", generarrecibopdf);
                            document.getElementById("borrardatos").addEventListener("click", borrarElementos);

                            var boton = document.getElementById("btnparaconfirmarreserca");                            
                            var boton2 = document.getElementById("generarvisitayqr");
                            var boton3 = document.getElementById("enviarpago")

                            var tiempoEspera = 5 * 1000; // 5 minutos en milisegundos
                            var timer; // variable para almacenar el temporizador


                            const fechaHoraActual = new Date();
                            const fechaHoraFormateada = fechaHoraActual.toLocaleString();
                            
                            const datosreg = {
                                registro: fechaHoraFormateada,
                                dom: domiciliocod,
                            };
                            
                            const urlregistro = `https://sheet.best/api/sheets/${sheetID}/tabs/registros${privada}`;
                            const opciones = {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(datosreg) // Corregido aquí
                            };
                            
                            fetch(urlregistro, opciones)
                                .then((response) => response.json())
                                .then((data) => {
                                    // Manejar la respuesta de la API si es necesario
                                })
                                .catch((error) => {
                                    console.error("Error al enviar datos a la API:", error);
                                });
                            
                            function desactivarBoton() {
                                boton.disabled = true;
                                boton2.disabled = true;
                                boton3.disabled = true;

                            }
                            function activarBoton() {
                                boton.disabled = false;
                                boton2.disabled = false;
                                boton3.disabled = false;
                            }
                            function updatePaymentHistory() {

                                        paymentHistory2024.style.display = "block";
                                        tags.style.display = "none";
                                        btndcerrarsesion.style.display = "none"
                                        divbotonhistorico.style.display = "none";
                                        divbotonpago.style.display = "none";
                                        divbotonreservar.style.display = "none";
                                        divbotonvisitas.style.display = "none";
                                        segurichat.style.display = "none";
                                        divregreso.style.display = "block";

                                        const urlProp = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}/`;
                                        fetch(urlProp)
                                            .then((response) => response.json())
                                            .then((data) => {
                                                ene2024Span.textContent = (data[indice].ene2024);
                                                feb2024Span.textContent = (data[indice].feb2024);
                                                mar2024Span.textContent = (data[indice].mar2024);
                                                abr2024Span.textContent = (data[indice].abr2024);
                                                may2024Span.textContent = (data[indice].may2024);
                                                jun2024Span.textContent = (data[indice].jun2024);
                                                jul2024Span.textContent = (data[indice].jul2024);
                                                ago2024Span.textContent = (data[indice].ago2024);
                                                sep2024Span.textContent = (data[indice].sep2024);
                                                oct2024Span.textContent = (data[indice].oct2024);
                                                nov2024Span.textContent = (data[indice].nov2024);
                                                dic2024Span.textContent = (data[indice].dic2024);
                                                console.log("Pagos actualizados");
                                            });

                            }
                            function generarrecibopdf (){
                                // Obtener la fila correspondiente al botón clicado
                                var fila = event.target.closest('tr');
                                
                                // Obtener los datos de la fila
                                var datosFila = fila.querySelectorAll('td');
                            
                                // Obtener el texto de cada elemento td y guardarlo en variables
                                var mes = datosFila[0].textContent.trim(); // Mes
                                var idMes = datosFila[1].querySelector('span').id; // ID del mes
                                var cantidad = datosFila[1].querySelector('span').textContent.trim(); // Cantidad
                            
                                // Verificar si la cantidad está vacía
                                if (cantidad === "") {
                                    alert("Aún no hay un pago aplicado a este mes");
                                    return; // Salir de la función
                                }
                                else{
                                    var año = idMes.substring(3); // Extraer los caracteres a partir del cuarto (el año)
                                    var now = new Date();
                                    var folio = now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());

                                    // Función para agregar ceros a la izquierda si es necesario
                                    function pad(number) {
                                        return (number < 10 ? '0' : '') + number;
                                    }
                            
                                    // Crear un nuevo objeto jsPDF
                                    const { jsPDF } = window.jspdf;
                                    var doc = new jsPDF();

                                    var fontSize = 10;
                                    doc.setFontSize(fontSize);
                                    doc.setTextColor(1, 62, 106); // RGB: 1, 62, 106

                                
                                    // Agregar la información al PDF
                                    doc.setTextColor(255, 0, 0); // RGB: 255, 0, 0 (rojo)
                                    doc.text("Folio: " + folio, 160, 10, null, null, 'right'); // Folio alineado a la derecha
                                    doc.setTextColor(0, 0, 0); // RGB: 0, 0, 0 (negro)
                                    doc.text("Fecha: " + new Date().toLocaleDateString(), 160, 20, null, null, 'right'); // Fecha de hoy alineada a la derecha

                                    doc.setTextColor(1, 62, 106); // RGB: 1, 62, 106
                                    doc.text("Estimado(a) "  + cliente, 10, 30); // Nombre del cliente

                                    doc.setTextColor(0, 0, 0); // RGB: 0, 0, 0 (negro)
                                    doc.text("Es un placer informarte que hemos recibido tu comprobante de pago por la cantidad de " + cantidad, 10, 40, null, null, 'left')
                                    doc.text("correspondiente al mes de " + mes + " " + año + " de tu propiedad ubicada en " + domicilio, 10, 50, null, null, 'left')
                                    doc.text("Cada contribución es esencial para asegurar el buen estado de nuestras áreas comunes y servicios.", 10, 60, null, null, 'left');
                                    doc.text("Agradecemos tu puntualidad y compromiso con el mantenimiento de nuestra comunidad.", 10, 70, null, null, 'left');
                                    doc.text("Este documento tiene carácter informativo y no constituye un instrumento para el acceso a amenidades o servicios.", 10, 80, null, null, 'left');

                                    doc.setTextColor(1, 62, 106); // RGB: 1, 62, 106
                                    doc.text("Atentamente: La Mesa Directiva de Colonos San Sebastián..", 10, 90);

                                    var imgData = 'logorecibos.png'; // Reemplaza esto con la URL de tu imagen
                                    doc.addImage(imgData, 'JPEG', 10, 100, 100, 100); // Ajusta las coordenadas y el tamaño según sea necesario
                                
                                
                                    // Guardar el PDF
                                    doc.save("recibo_" + mes.toLowerCase() + "_" + año + ".pdf");
                                }
                            }
                            function registrarReserva() {

                                if (boton.disabled) {
                                    return; // Evitar ejecutar la función si ya está en curso
                                }
                                desactivarBoton(); // Desactivar el botón al inicio de la función


                                const fechareserva = document.getElementById("fechareserva").value;
                                const horaInicio = document.getElementById("horaInicio").value;
                                const horaFin = document.getElementById("horaFin").value;
                                const tiporeserva = document.getElementById("tiporeserva").value;
                                const statusElement = document.getElementById("status");
                                const statusText = statusElement.textContent;
                                const fechaHoraActual = new Date();
                                const fechaHoraFormateada = fechaHoraActual.toLocaleString();
                                const domicilio = domicilioSpan.textContent;
                                console.log(statuscod)
                                
                                const datos = {
                                    registro: fechaHoraFormateada,
                                    dom: domiciliocod,
                                    nombre: clientecod,
                                    fecha: fechareserva,
                                    amenidad: tiporeserva,
                                    inicio: horaInicio,
                                    fin: horaFin,
                                    domds: domicilio,
                                };

                                if (fechareserva.trim() === "" || horaInicio.trim() === "" || horaFin.trim() === "" || tiporeserva === "") {
                                    alert("Por favor, complete todos los campos antes de registrar la reserva.");
                                    return; // Detener la ejecución si hay campos vacíos
                                }
                                                    
                                if (statuscod === "Al Corriente") {
                                    
                                    const url = `https://sheet.best/api/sheets/${sheetID}/tabs/reservaciones${privada}`;
                                    const opciones = {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(datos)
                                    };
                            
                                    // Verificar disponibilidad antes de enviar los datos
                                    verificarDisponibilidad(fechareserva, tiporeserva)
                                        .then(disponible => {
                                            if (disponible) {
                                                fetch(url, opciones)
                                                    .then((response) => response.json())
                                                    .then((data) => {
                                                        // Alerta de éxito después de enviar los datos
                                                        alert("Tu reservación para usar " + tiporeserva + " el " + fechareserva + " fue enviada");
                                                        console.log(fechareserva)
                                                        console.log(tiporeserva)
                                                        console.log(fechaHoraFormateada)
                                                        console.log(domiciliocod)
                                                        console.log(clientecod)
                                                        console.log(fechareserva)
                                                        console.log(tiporeserva)
                                                        console.log(horaInicio)
                                                        console.log(horaFin)
                            
                                                        // Limpiar los campos del formulario después de enviar los datos
                                                        document.getElementById("fechareserva").value = "";
                                                        document.getElementById("horaInicio").value = "";
                                                        document.getElementById("horaFin").value = "";
                                                        document.getElementById("tiporeserva").value = "";
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error al enviar los datos a la hoja de cálculo", error);
                                                    });
                                            } else {
                                                alert("Sin disponibilidad para reservar " + tiporeserva + " en la fecha seleccionada.");
                                            }
                                        })
                                        .catch(error => {
                                            console.error("Error al verificar disponibilidad:", error);
                                        });
                                } else {
                                    alert("Domicilio tiene adeudo, actualmente no tiene derecho al reservar amenidades");
                                    console.log(statusText)
                                }
                                timer = setTimeout(activarBoton, tiempoEspera);
                            }
                            function verificarDisponibilidad(fecha, tiporeserva) {
                                const url = `https://sheet.best/api/sheets/${sheetID}/tabs/reservaciones${privada}`;
                                
                                // Realizar una consulta para obtener los registros en la misma fecha y amenidad
                                return fetch(url)
                                    .then(response => response.json())
                                    .then(data => {
                                        const registrosMismaFecha = data.filter(registro => registro.fecha === fecha && registro.amenidad === tiporeserva);
                                        const cantidadRegistros = registrosMismaFecha.length;
                            
                                        // Verificar disponibilidad según la cantidad de registros
                                        if (tiporeserva === "Asador") {
                                            return cantidadRegistros < 4; // Devuelve true si hay disponibilidad, de lo contrario, false
                                        } else if (tiporeserva === "Casa Club") {
                                            return cantidadRegistros < 1; // Devuelve true si hay disponibilidad, de lo contrario, false
                                        } else if (tiporeserva === "Alberca") {
                                            // La alberca siempre está disponible
                                            return true;
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Error al verificar disponibilidad:", error);
                                        throw error;
                                    });
                            }
                            function toggleMisReservas() {
                                console.log("actualizándose")
                                const domicilio = domicilioSpan.textContent;
                                const urlmisreservas = `https://sheet.best/api/sheets/${sheetID}/tabs/reservaciones${privada}`
                                fetch(urlmisreservas)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(domiciliocod);
                                        // Filtrar los registros que coinciden con domicilioSpan
                                        const registrosFiltrados = data.filter((registro) => registro.dom.startsWith(domiciliocod));
                                        console.log(registrosFiltrados);
                                        // Procesar los datos filtrados y agregarlos a los contenedores de calle
                                        agregarRegistros("divmisreservas", registrosFiltrados);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            }
                            function agregarRegistros(divmisreservas, registros) {
                                const contenedor = document.getElementById(divmisreservas);
                                contenedor.innerHTML = ''; // Limpiar el contenido del contenedor
                            
                                const fechaActual = new Date(); // Obtener la fecha y hora actual
                                const fechaAyer = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - 1); // Obtener la fecha de ayer
                            
                                registros.forEach((registro, index) => {
                                    // Convertir la fecha de la reserva a un objeto Date
                                    const fechaReserva = new Date(registro.fecha);
                                    
                                    // Verificar si la fecha de la reserva está entre hoy y ayer (sin hora)
                                    if (fechaReserva >= fechaAyer) {
                                        const registroHTML = `<div id="${registro.amenidad}-${registro.fecha}-${domiciliocod}" class="registro-item">
                                            <p><strong>Amenidad:</strong>${registro.amenidad}</p>
                                            <p><strong>Fecha:</strong>${registro.fecha}</p>
                                            <p><strong>Estatus:</strong>${registro.estatus}</p>
                                            <button class="boton-eliminar">Eliminar</button>
                                        </div>`;
                                
                                        contenedor.insertAdjacentHTML('beforeend', registroHTML);
                                
                                        // Agregar el evento click después de agregar el elemento al DOM
                                        const botonEliminar = document.getElementById(`${registro.amenidad}-${registro.fecha}-${domiciliocod}`);
                                        botonEliminar.addEventListener("click", function() {
                                            eliminarreservacion(registro.amenidad, registro.fecha, domiciliocod);
                                        });
                                    }
                                });
                                
                            function eliminarreservacion(amenidad, fecha, domiciliocod) {
                                // Obtener la URL de la API
                                const urlmisreservas = `https://sheet.best/api/sheets/${sheetID}/tabs/reservaciones${privada}`
                                fetch(urlmisreservas)                                
                                // Realizar una solicitud GET para obtener los datos de la hoja de cálculo
                                    .then(response => response.json())
                                    .then(data => {
                                        // Encontrar el índice del registro que coincide con los datos proporcionados
                                        const indice = data.findIndex(registro => registro.amenidad === amenidad && registro.fecha === fecha && registro.dom === domiciliocod);
                                        console.log("Buscando registro de amenidad...")
                                        console.log(amenidad)
                                        console.log(fecha)
                                        console.log(domiciliocod)
                                        console.log(indice)
                                        
                                        // Si se encuentra el índice, construir la URL de la solicitud PUT para actualizar la fila
                                        if (indice !== -1) {
                                            const updateURL = `${apiURL}/${indice}`; 
                            
                                            // Definir los datos que deseas actualizar
                                            const newData = { "eliminar": "Cancelada" }; // Aquí puedes poner la leyenda que quieras
                                            
                                            // Configurar la solicitud PUT
                                            const requestOptions = {
                                                method: 'PATCH',
                                                mode: "cors",
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(newData)
                                            };
                            
                                            // Realizar la solicitud PUT para actualizar la fila
                                            fetch(updateURL, requestOptions)
                                                .then(response => {
                                                    if (response.ok) {
                                                        console.log("La reserva fue marcada como eliminada en la hoja de cálculo.");
                                                        alert("Tu reservación sera eliminada en los siguientes minutos")
                                                        // Puedes realizar cualquier otra acción que necesites aquí después de que la actualización se haya completado correctamente
                                                    } else {
                                                        console.error("Hubo un error al actualizar la reserva en la hoja de cálculo.");
                                                    }
                                                })
                                                .catch(error => {
                                                    console.error("Hubo un error de red:", error);
                                                });
                                        } else {
                                            console.log("Registro no encontrado");
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Hubo un error al obtener los datos de la hoja de cálculo:", error);
                                    });
                                }
                            }
                            function calendario(){
                                divingresos.style.display = "none";
                                paymentHistory2024.style.display = "none";
                                tags.style.display = "none";
                                btndcerrarsesion.style.display = "none"
                                divbotonhistorico.style.display = "none";
                                divbotonpago.style.display = "none";
                                divbotonreservar.style.display = "none";
                                divbotonvisitas.style.display = "none";
                                segurichat.style.display = "none";
                                divamenidades.style.display = "block";
                                divreservar.style.display = "block";
                                divregreso.style.display = "block";

                                const contenedorCalendario = document.getElementById("contenedorCalendario");
                                const calendarioIframe = document.createElement("iframe");
                                calendarioIframe.setAttribute("src", "https://calendar.google.com/calendar/embed?src=478223d47dcb0e344038b1d6fa0172529ce576d222956e620a49b595653a31db%40group.calendar.google.com&ctz=America%2FMexico_City");
                                calendarioIframe.setAttribute("style", "border: 0");
                                calendarioIframe.setAttribute("width", "800");
                                calendarioIframe.setAttribute("height", "600");
                                calendarioIframe.setAttribute("frameborder", "0");
                                calendarioIframe.setAttribute("scrolling", "no");
                                contenedorCalendario.appendChild(calendarioIframe);
                            }
                            function nuevoregistro(){
                                divqr.style.display = "none";
                                divnuevoregistro.style.display = "none";
                                paymentHistory2024.style.display = "none";
                                tags.style.display = "block";
                                btndcerrarsesion.style.display = "block"
                                divbotonhistorico.style.display = "block";
                                divbotonpago.style.display = "block";
                                divbotonreservar.style.display = "block";
                                divbotonvisitas.style.display = "block";
                                divingresos.style.display = "none";
                                segurichat.style.display = "none";
                                divnuevoregistro.style.display = "none";
                                divamenidades.style.display = "none";
                                borrarElementos();
                            }
                            function confirmacionvyp() {
                                if (boton2.disabled) {
                                    return; // Evitar ejecutar la función si ya está en curso
                                }
                                desactivarBoton(); // Desactivar el botón al inicio de la función

                                confirmacion.style.display = "none";
                                divqr.style.display = "block";  
                                datoscorrectosvisitas.style.display = "block"; 
                                divnuevoregistro.style.display = "block";
                                divregreso.style.display = "block";
                                const domicilio = domicilioSpan.textContent;
                                const propietario = propietarioSpan.textContent;
                                const namevisitaSpan = document.getElementById("namevisita").value;
                                const fechavisitaSpan = document.getElementById("fechavisita").value;
                                const fechaHoraActual = new Date();
                                const fechaHoraFormateada = fechaHoraActual.toLocaleString();

                                //Formatear la fecha como DDMMAAAA
                                const dia = String(fechaHoraActual.getDate()).padStart(2, "0");
                                const mes = String(fechaHoraActual.getMonth() + 1).padStart(
                                2,
                                "0"
                                ); // Los meses empiezan desde 0
                                const año = fechaHoraActual.getFullYear();

                                // Formatear la hora como HHMM
                                const horas = String(fechaHoraActual.getHours()).padStart(
                                2,
                                "0"
                                );
                                const minutos = String(fechaHoraActual.getMinutes()).padStart(
                                2,
                                "0"
                                );
                            
                                const propietarioAbreviado = propietario.slice(0, 2).toUpperCase();
                                const domicilioAbreviado = domicilio.slice(0, 2).toUpperCase();
                                const namevisitaAbreviado = namevisitaSpan.slice(0, 2).toUpperCase();
                                const fechaSinEspacios = fechavisitaSpan.replace(/\s/g, ''); // Eliminar espacios de la fecha
                                const fechaHoraRegistroSinEspacios = fechaHoraFormateada.replace(/\s/g, ''); // Eliminar espacios de la fechaHoraRegistro
                                const idUnico = `${propietarioAbreviado}${domicilioAbreviado}${namevisitaAbreviado}${dia}${mes}${año}${horas}${minutos}`;
                                console.log(idUnico)


                            
                                const tipoSpan = document.getElementById("tipo").value;
                                console.log(domicilio, propietario, namevisitaSpan, tipoSpan, fechavisitaSpan, tipoSpan);
                            
                                const datos = {
                                    propietario: clientecod,
                                    domicilio: domiciliocod,
                                    namevisita: namevisitaSpan,
                                    fecha: fechavisitaSpan,
                                    tipo: tipoSpan,
                                    fechaHoraRegistro: fechaHoraFormateada,
                                    idunico: idUnico,
                                };
                            
                                const qrData = {
                                    Casa: domicilio,
                                    Nombre: namevisitaSpan,
                                    Fecha: fechavisitaSpan,
                                    Tipo: tipoSpan,
                                    ID: idUnico,
                                };
                            
                                const url = `https://sheet.best/api/sheets/${sheetID}/tabs/visitas${privada}`;
                            
                                const opciones = {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(datos)
                                };
                            
                                // Enviar los datos a la hoja de cálculo
                                fetch(url, opciones)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        // Alerta de éxito después de enviar los datos
                                        alert("Tu solicitud para el ingreso de " + namevisitaSpan + " el " + fechavisitaSpan + " fue enviada");
                                        
                                        // Generar el contenido para el QR
                                        const qrContent = JSON.stringify(qrData);
                                        
                                        // Generar el código QR y mostrarlo en la página
                                        new QRCode(qrElement, qrContent);
                                        
                                        // Obtener el contenedor donde se desea agregar el código QR
                                        const contenedorQR = document.getElementById('qrElement');
                                        
                                        // Agregar el código QR al contenedor
                                        contenedorQR.appendChild(qrElement);
                            
                            
                                        // Llamar a las funciones para borrar elementos y regresar
                                        //borrarElementos();
                                        //regresar();
                                    })
                                    .catch((error) => {
                                        console.error("Error al enviar los datos a la hoja de cálculo", error);
                                    });
                                timer = setTimeout(activarBoton, tiempoEspera);
                            }
                            function borrarElementos() {
                                const namevisita2Span = document.getElementById("namevisita2");
                                const fechavisita2Span = document.getElementById("fechavisita2");
                                const tipo2Span = document.getElementById("tipo2");
                                const namevisitaSpan = document.getElementById("namevisita");
                                const fechavisitaSpan = document.getElementById("fechavisita");
                                const tipoSpan = document.getElementById("tipo");
                                const contenedorQR = document.getElementById('qrElement');
                            
                            
                                // Eliminar el contenido de los elementos
                                namevisita2Span.value = "";
                                fechavisita2Span.value = "";
                                tipo2Span.value = 0;
                                namevisitaSpan.value = "";
                                fechavisitaSpan.value = "";
                                tipoSpan.value = 0;
                                contenedorQR.innerHTML = '';
                                namevisita3Span.value = "";
                                fechavisita3Span.value = "";
                                tipo3Span.value = "";
                            
                                formulario2.style.display = "block";
                                divingresos.style.display = "block";
                                paymentHistory2024.style.display = "none";
                                tags.style.display = "none";
                                btndcerrarsesion.style.display = "none"
                                divbotonhistorico.style.display = "none";
                                divbotonpago.style.display = "none";
                                divbotonreservar.style.display = "none";
                                divbotonvisitas.style.display = "none";
                                confirmacion.style.display = "none"
                                divregreso.style.display = "block";
                            }
                            function enviarsdei() { 
                                const namevisitaSpan = document.getElementById("namevisita").value;
                                const tipoSpan = document.getElementById("tipo").value;
                                const fechavisitaSpan = document.getElementById("fechavisita").value;
                            
                                if (namevisitaSpan.trim() === "" || tipoSpan.trim() === "" || fechavisitaSpan.trim() === "") {
                                    alert("Por favor, complete todos los campos.");
                                    return; // Detener la ejecución si algún campo está vacío
                                }
                                const namevisita2Span = document.getElementById("namevisita2");
                                const fechavisita2Span = document.getElementById("fechavisita2");
                                const tipo2Span = document.getElementById("tipo2");
                            
                                const domicilio = domicilioSpan.textContent;
                                const correo = correoSpan.textContent;
                                const status = statusSpan.textContent;
                                console.log(status)
                            
                                if (statuscod === "Al Corriente") {
                                    console.log(namevisitaSpan);
                                    console.log(fechavisitaSpan); // Mostrar la fecha formateada
                                    console.log(tipoSpan);
                            
                                    confirmacion.style.display = "block";
                                    formulario2.style.display = "none";
                                    divregreso.style.display = "block";

                                    console.log(domicilioSpan)
                                    namevisita2Span.textContent = namevisitaSpan;
                                    fechavisita2Span.textContent = fechavisitaSpan;
                                    tipo2Span.textContent = tipoSpan;

                                    namevisita3Span.textContent = namevisitaSpan;
                                    fechavisita3Span.textContent = fechavisitaSpan;
                                    tipo3Span.textContent = tipoSpan;

                            
                                } else {
                                    alert("Domicilio con adeudo, actualmente no tiene derecho al ingreso de visitas o proveedores");
                                }
                            }
                            function enviardatospago() { 

                                if (boton3.disabled) {
                                    return; // Evitar ejecutar la función si ya está en curso
                                }
                                desactivarBoton(); // Desactivar el botón al inicio de la función
                                let fechaPagoSpan = document.getElementById("fechaPago").textContent;
                                let montoPagoSpan = document.getElementById("montoPago").textContent;
                                let beneficiarioPagoSpan = document.getElementById("beneficiarioPago").textContent;
                                let conceptodelpagoPagoSpan = document.getElementById("conceptodelpago").textContent;
                                let clavederastreoSpan = document.getElementById("clavederastreo").textContent;
                                let fechaHoraActual = new Date();
                                let fechaHoraFormateada = fechaHoraActual.toLocaleString();
                                let mesPagoSelect = document.getElementById("mespago").value;
                                const inputArchivo = document.getElementById("archivo");

                                
                                // Verificar si el pago ya ha sido aplicado

                                const urlVerificacion = `https://sheet.best/api/sheets/${sheetID}/tabs/pagos${privada}/clavederastreo/${encodeURIComponent(clavederastreoSpan)}`;
                                console.log(urlVerificacion);

                                if (mesPagoSelect=== "") {
                                    alert("Debe selecionar el mes al que desea que se aplique su pago")
                                    timer = setTimeout(activarBoton, tiempoEspera);

                                } else {
                                    fetch(urlVerificacion)
                                        .then((response) => response.json())
                                        .then((data) => {
                                            console.log(data)
                                            console.log(data.length)

                                            if (data.length > 0) {
                                                // Pago ya registrado, mostrar alerta
                                                alert("Este comprobante ya no se puede volver a ocupar");
                                                timer = setTimeout(activarBoton, tiempoEspera);


                                                document.getElementById("fechaPago").value = "";
                                                document.getElementById("montoPago").value = "";
                                                document.getElementById("beneficiarioPago").value = "";
                                                document.getElementById("conceptodelpago").value = "";
                                                document.getElementById("clavederastreo").value = "";
                                                inputArchivo.value = "";

                                                divpagocargado.style.display = "none";

                                            } else {
                                                // Pago no registrado, proceder a enviar los datos
                                                grabarpago();
                                                enviarDatos();

                                                alert("Pago por " + montoPagoSpan +" aplicado a " + mesPagoSelect)


                                                
                                                document.getElementById("fechaPago").value = "";
                                                document.getElementById("montoPago").value = "";
                                                document.getElementById("beneficiarioPago").value = "";
                                                document.getElementById("conceptodelpago").value = "";
                                                document.getElementById("clavederastreo").value = "";
                                                divpagocargado.style.display = "none";
                                                timer = setTimeout(activarBoton, tiempoEspera);
                                            }
                                        })
                                        .catch((error) => {
                                            console.error("Error al verificar los datos", error);
                                        });
                                
                                    function enviarDatos() {
                                        const datos = {
                                            registro: fechaHoraFormateada,
                                            dom: domiciliocod,
                                            nombre: clientecod,
                                            domds: domicilio,
                                            beneficiario: beneficiarioPagoSpan,
                                            fechapago: fechaPagoSpan,
                                            monto: montoPagoSpan,
                                            concepto: conceptodelpagoPagoSpan,
                                            aplicarpara : mesPagoSelect,
                                            clavederastreo : clavederastreoSpan,
                                        };
        
                                
                                        const url = `https://sheet.best/api/sheets/${sheetID}/tabs/pagos${privada}`;
                                        const opciones = {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(datos)
                                        };
                                
                                        fetch(url, opciones)
                                            .then((response) => response.json())
                                            .then((data) => {
                                                // Lógica después de enviar datos
                                            })
                                            .catch((error) => {
                                                console.error("Error al enviar los datos a la hoja de cálculo", error);
                                            });
                                    }

                                    function grabarpago(){

                                        console.log("el indice es");
                                        console.log(indice);


                                        const pagoaplicado ={
                                            [mesPagoSelect]: montoPagoSpan,
                                        }
                                        const url = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}/${indice}`;
                                        console.log("URL:", url);
                                        // Realizar la solicitud PATCH para actualizar los datos
                                        fetch(url, {
                                            method: "PATCH",
                                            mode: "cors",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(pagoaplicado)
                                                })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log("Pago aplicado");
                                            })
                                            .catch((error) => {
                                                console.error("Error al aplicar el pago", error);
                                        });
                                     }
                                                                     
                                }
                            }

                            function regresar() {
                                paymentHistory2024.style.display = "none";
                                tags.style.display = "block";
                                btndcerrarsesion.style.display = "block"
                                divbotonhistorico.style.display = "block";
                                divbotonpago.style.display = "block";
                                divbotonreservar.style.display = "block";
                                divbotonvisitas.style.display = "block";
                                divingresos.style.display = "none";
                                segurichat.style.display = "block";
                                divnuevoregistro.style.display = "none";
                                divamenidades.style.display = "none";
                                divreservar.style.display = "none";
                                divpagos.style.display = "none";
                                divregreso.style.display = "none";

                            
                            }
                            function redireccionarPagos() {
                                divingresos.style.display = "none";
                                paymentHistory2024.style.display = "none";
                                tags.style.display = "none";
                                btndcerrarsesion.style.display = "none"
                                divbotonhistorico.style.display = "none";
                                divbotonpago.style.display = "none";
                                divbotonreservar.style.display = "none";
                                divbotonvisitas.style.display = "none";
                                segurichat.style.display = "none";
                                divreservar.style.display = "none";
                                btnenborrar.style.display = "none";
                                divregreso.style.display = "block";
                                divpagos.style.display = "block";
                            }
                            function ingresos() {
                                divingresos.style.display = "block";
                                paymentHistory2024.style.display = "none";
                                tags.style.display = "none";
                                btndcerrarsesion.style.display = "none"
                                divbotonhistorico.style.display = "none";
                                divbotonpago.style.display = "none";
                                divbotonreservar.style.display = "none";
                                divbotonvisitas.style.display = "none";
                                segurichat.style.display = "none";
                                divreservar.style.display = "none";
                                btnenborrar.style.display = "block";
                                divregreso.style.display = "block";
                            
                                if (!namevisitaSpan || namevisitaSpan === "") {
                                    divnuevoregistro.style.display = "none";
                                } else {
                                    divnuevoregistro.style.display = "block";
                                }
                            }
                        }  
                    } else if (indice === -1){
                        const urlAdmin = `https://sheet.best/api/sheets/${sheetID}/tabs/admin${privada}`;
                        fetch(urlAdmin)                        .then((response) => response.json())
                        .then((data) => {
                            const contraseñaCifradoInput = cifrarCorreo(contraseñaInput);
                            const correosCifradosadmin = data.map((fila) => fila.correo);
                            const indiceAdmin = correosCifradosadmin.findIndex((correoCifrado) => correoCifrado === correoCifradoInput);
                            const contraseñasCifradasAdmin = data.map((fila) => fila.password);
                            console.log("validación admin")
                            console.log(indiceAdmin)
                
                            if (indiceAdmin !== -1) {
                                const contraseñaCifrada = contraseñasCifradasAdmin[indiceAdmin];
                
                                if (contraseñaCifrada === contraseñaCifradoInput) {
                                    console.log("Inicio de sesión exitoso");
                                    sesionIniciada = true; // Marcar la sesión como iniciada
                                    console.log(sesionIniciada)
                                    const contenedoradmin = document.getElementById("contenedoradmin");
                                    contenedoradmin.style.display = "block";
                                    homepage.style.display = "none";
                
                                    const urlProp = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}`;
                                    fetch(urlProp)                                    
                                    .then((response) => response.json())
                                    .then((data) => {
                
                                        generarTabla("alba-registros", data.filter((registro) => registro.dom.startsWith("IkN0byBKdWFuIENhcmxvc")));
                                        generarTabla("caballeros-registros", data.filter((registro) => registro.dom.startsWith("IlBvcnRhbGVzI")));
                                        generarTabla("esmeralda-registros", data.filter((registro) => registro.dom.startsWith("Ik1hcm1vbGVzID")));
                                        generarTabla("eros-registros", data.filter((registro) => registro.dom.startsWith("IkdyYW4gVmlhI")));
                                        generarTabla("magdalena-registros", data.filter((registro) => registro.dom.startsWith("IlBsYXphIEFsdGEg")));
                                        //generarTabla("ibiza-registros", data.filter((registro) => registro.dom.startsWith("IklCSVpBI")));
                                        //generarTabla("hierro-registros", data.filter((registro) => registro.dom.startsWith("IkhJRVJSTy")));
                                        
                                    })
                                } else {
                                    alert("Usuario o contraseña incorrectos");
                                }
                            } else {
                                alert("Usuario o contraseña incorrectos 2");
                            }
                        })
                        .catch((error) => {
                            console.error("Error al obtener los datos:", error);
                        });
                    };   
                } else {
                    console.log("Debe aceptar el aviso de privacidad para iniciar sesión");
                    alert("Debe aceptar el aviso de privacidad para iniciar sesión");
                }
            })
            .catch((error) => {
                console.error(error);
        });
    }
});

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("contrasena");
    var eyeOpen = document.getElementById("ojoabierto");
    var eyeClosed = document.getElementById("ojocerrado");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeOpen.style.display = "none";
        eyeClosed.style.display = "block";
    } else {
        passwordInput.type = "password";
        eyeOpen.style.display = "block";
        eyeClosed.style.display = "none";
    }
}

function togglePasswordVisibilityadmin() {
    var passwordInputadmin = document.getElementById("admin-contrasena")
    var eyeOpenadmin = document.getElementById("ojoabiertoadmin");
    var eyeClosedadmin = document.getElementById("ojocerradoadmin");

    if (passwordInputadmin.type === "password") {
        passwordInputadmin.type = "text";
        eyeOpenadmin.style.display = "none";
        eyeClosedadmin.style.display = "block";
    } else {
        passwordInputadmin.type = "password";
        eyeOpenadmin.style.display = "block";
        eyeClosedadmin.style.display = "none";
    }
}

function procesarArchivo() {
    const archivo = document.getElementById('archivo').files[0];
    divpagocargado.style.display = "block";

    if (!archivo) {
        alert('Por favor, seleccione un archivo PDF o una imagen.');
        return;
    }

    const lector = new FileReader();
    lector.onload = function(evento) {
        const datos = evento.target.result;
        if (archivo.type === 'application/pdf') {
            procesarPDF(datos);
        } else if (archivo.type.startsWith('image/')) {
            procesarImagen(datos);
        } else {
            alert('Tipo de archivo no compatible. Por favor, seleccione un archivo PDF o una imagen.');
        }
    };
    lector.readAsArrayBuffer(archivo);
}

function procesarPDF(datos) {
    pdfjsLib.getDocument(datos).promise.then(function(pdf) {
        pdf.getPage(1).then(function(pagina) {
            pagina.getTextContent().then(function(contenido) {
                const texto = contenido.items.map(function(item) {
                    return item.str;
                }).join(' ');

                console.log(texto)

                // Buscar el monto
                const regexMonto = /\$\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/; // Coincide con el formato de monto: $XXX,XXX.XX o $XXX.XX
                const montoMatch = texto.match(regexMonto);
                const monto = montoMatch ? montoMatch[1] : null;

                // Buscar la fecha
                const regexFecha = /(\d{1,2}\s+de\s+[a-zA-Z]+\s+de\s+\d{4})/; // Coincide con el formato de fecha: dd de mes de aaaa
                const fechaMatch = texto.match(regexFecha);
                const fecha = fechaMatch ? fechaMatch[0] : null;

                // Buscar el beneficiario
                const regexBeneficiario = /COLONOS\sSAN\sSEBASTIAN\sAC/; // Coincide con "COLONOS SAN SEBASTIAN AC"
                const beneficiarioMatch = texto.match(regexBeneficiario);
                const beneficiario = beneficiarioMatch ? beneficiarioMatch[0] : null;

                // Buscar el concepto del pago
                const regexConceptoPago = /(?<=Monto IVA Referencia numérica Clave de rastreo  \d{2} de [a-zA-Z]+\sde\s\d{4}\s)(.+?)\s+\$/; // Coincide con cualquier texto después del texto indicado y seguido del siguiente "$"
                const conceptoPagoMatch = texto.match(regexConceptoPago);
                const conceptoPago = conceptoPagoMatch ? conceptoPagoMatch[1] : null;
                console.log(conceptoPago)

                // Clave de rastreo

                const regexDatosDespuesDeCero = /\$ 0\.00\s*(\S+)\s*(\S+)/; // Coincide con "$ 0.00" seguido de dos grupos de cualquier otro texto
                const datosDespuesDeCeroMatch = texto.match(regexDatosDespuesDeCero);
                const primerDato = datosDespuesDeCeroMatch ? datosDespuesDeCeroMatch[1] : null;
                const segundoDato = datosDespuesDeCeroMatch ? datosDespuesDeCeroMatch[2] : null;
                console.log(primerDato);
                console.log(segundoDato);
                clavederastreo = primerDato + " " + segundoDato
                console.log(clavederastreo)


                // Mostrar los datos en el HTML
                document.getElementById('fechaPago').innerText = fecha || 'No se encontró fecha';
                document.getElementById('montoPago').innerText = monto || 'No se encontró monto';
                document.getElementById('beneficiarioPago').innerText = beneficiario || 'No se encontró beneficiario';
                document.getElementById('conceptodelpago').innerText = conceptoPago || 'No se encontró concepto';
                document.getElementById('clavederastreo').innerText = clavederastreo || 'No se encontró concepto';


                if (!monto || !fecha || !beneficiario || !conceptoPago){
                    alert("Comprobante no valido")
                    document.getElementById("fechaPago").value = "";
                    document.getElementById("montoPago").value = "";
                    document.getElementById("beneficiarioPago").value = "";
                    document.getElementById("conceptodelpago").value = "";
                    document.getElementById("clavederastreo").value = "";
                    divpagocargado.style.display = "none";
                }
            });
        });
    });
}

function procesarImagen(datos) {    
    const loader = document.getElementById("loader");
    loader.style.display = "block"; // Mostrar el indicador de carga

    Tesseract.recognize(
        datos,
        'spa', // Idioma de reconocimiento (puedes cambiarlo según tus necesidades)
        { logger: m => console.log(m) } // Opciones adicionales, como el registro de mensajes
    ).then(({ data: { text } }) => {
        // Imprimir el texto completo reconocido en la consola
        console.log('Texto reconocido:', text);

        // Buscar el monto
        const regexMonto = /\$\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/; // Coincide con el formato de monto: $XXX,XXX.XX o $XXX.XX
        const montoMatch = text.match(regexMonto);
        const monto = montoMatch ? montoMatch[1] : null;

        // Buscar la fecha
        
        const regexFecha = /(\d{1,2}\s+de\s+[a-zA-Z]+\s+de\s+\d{4})/; // Coincide con el formato de fecha: dd de mes de aaaa
        const fechaMatch = text.match(regexFecha);
        const fecha = fechaMatch ? fechaMatch[0] : null;

        // Buscar el beneficiario
        const regexBeneficiario = /COLONOS\sSAN\sSEBASTIAN\sAC/; // Coincide con "COLONOS SAN SEBASTIAN AC"
        const beneficiarioMatch = text.match(regexBeneficiario);
        const beneficiario = beneficiarioMatch ? beneficiarioMatch[0] : null;

        // Buscar el concepto del pago
        const regexConceptoPago = /Concepto\s+del\s+pago\s+(.+?)\s+Clave\s+de\s+rastreo\s+\w+/; // Coincide con "Concepto del pago" seguido de cualquier texto hasta la siguiente ocurrencia de "Clave de rastreo" seguido de letras o números
        const conceptoPagoMatch = text.match(regexConceptoPago);
        const conceptoPago = conceptoPagoMatch ? conceptoPagoMatch[1] : null;

        const regexReferenciaNumerica = /Referencia numérica (\S+)/; // Coincide con "Referencia numérica" seguido de cualquier otro texto
        const referenciaNumericaMatch = text.match(regexReferenciaNumerica);
        const referenciaNumerica = referenciaNumericaMatch ? referenciaNumericaMatch[1] : null;
    
        // Buscar los datos después de "Clave de rastreo"
        const regexClaveRastreo = /Clave de rastreo (\S+)/; // Coincide con "Clave de rastreo" seguido de cualquier otro texto
        const claveRastreoMatch = text.match(regexClaveRastreo);
        const claveRastreo = claveRastreoMatch ? claveRastreoMatch[1] : null;

        const refeyclave = referenciaNumerica + " " + claveRastreo
        console.log(refeyclave)

        // Ocultar el indicador de carga
        loader.style.display = "none";

        // Imprimir los datos en la consola
        console.log('Fecha:', fecha || 'No se encontró fecha');
        console.log('Monto:', monto || 'No se encontró monto');
        console.log('Beneficiario:', beneficiario || 'No se encontró beneficiario');

        document.getElementById('fechaPago').innerText = fecha || 'No se encontró fecha';
        document.getElementById('montoPago').innerText = monto || 'No se encontró monto';
        document.getElementById('beneficiarioPago').innerText = beneficiario || 'No se encontró beneficiario';
        document.getElementById('conceptodelpago').innerText = conceptoPago || 'No se encontró concepto';
        document.getElementById('clavederastreo').innerText = refeyclave || 'No se encontró concepto';

        if (!monto || !fecha || !beneficiario || !conceptoPago || !refeyclave) {
            console.log("segunda validacion")

            const regexMonto2 = /\$\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/; // Coincide con el formato de monto: $XXX,XXX.XX o $XXX.XX
            const montoMatch2 = text.match(regexMonto2);
            const monto2 = montoMatch2 ? montoMatch2[1] : null;
            console.log(monto2)


            const regexFecha2 = /Fecha y hora de operación\s+([\w\/]+ - [\d:]+)/;
            const fechaMatch2 = text.match(regexFecha2);
            const fecha2 = fechaMatch2 ? fechaMatch2[1] : null;
            console.log(fecha2)

            const regexBeneficiario2 = /SAN\sSEBASTIAN/ // Coincide con "COLONOS SAN SEBASTIAN AC"
            const beneficiarioMatch2 = text.match(regexBeneficiario2);
            const beneficiario2 = beneficiarioMatch2 ? beneficiarioMatch2[0] : null;
            console.log(beneficiario2)

            const regexConceptoPago2 = /por el concepto\s+“(\w+)”/; // Coincide con "Concepto del pago" seguido de cualquier texto hasta la siguiente ocurrencia de "Clave de rastreo" seguido de letras o números
            const conceptoPagoMatch2 = text.match(regexConceptoPago2);
            const conceptoPago2 = conceptoPagoMatch2 ? conceptoPagoMatch2[1] : null;
            console.log(conceptoPago2)

    
            const regexReferenciaNumerica2 = /Ref\. SuperMóvil\s+(\d+)/; // Coincide con "Referencia numérica" seguido de cualquier otro texto
            const referenciaNumericaMatch2 = text.match(regexReferenciaNumerica2);
            const refeyclave2 = referenciaNumericaMatch2 ? referenciaNumericaMatch2[1] : null;        
            console.log(refeyclave2)

                    // Imprimir los datos en la consola
            console.log('Fecha:', fecha2 || 'No se encontró fecha');
            console.log('Monto:', monto2 || 'No se encontró monto');
            console.log('Beneficiario:', beneficiario2 || 'No se encontró beneficiario');

            document.getElementById('fechaPago').innerText = fecha2 || 'No se encontró fecha';
            document.getElementById('montoPago').innerText = monto2 || 'No se encontró monto';
            document.getElementById('beneficiarioPago').innerText = beneficiario2 || 'No se encontró beneficiario';
            document.getElementById('conceptodelpago').innerText = conceptoPago2 || 'No se encontró concepto';
            document.getElementById('clavederastreo').innerText = refeyclave2 || 'No se encontró concepto';

            if (!fecha2 || !conceptoPago2){

                console.log("Texto proporcionado:");
                console.log(text);
                
                const regexFecha3 = /\d{1,2}\/(?:Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic)\/\d{4}\s+-\s+\d{1,2}:\d{2}/;
                const fechaMatch3 = text.match(regexFecha3);
                console.log("Coincidencia encontrada:");
                console.log(fechaMatch3);
                
                const fecha3 = fechaMatch3 ? fechaMatch3[0] : null;
                console.log("Tercera validación:")
                console.log(fecha3);
                

                const regexConceptoPago3 = /por\s+el\s+concepto\s+“([^”]+)"/;
                const conceptoPagoMatch3 = text.match(regexConceptoPago3);
                const conceptoPago3 = conceptoPagoMatch3 ? conceptoPagoMatch3[1] : null;
                console.log(conceptoPago3)

                document.getElementById('fechaPago').innerText = fecha3 || 'No se encontró fecha';
                document.getElementById('conceptodelpago').innerText = conceptoPago3 || 'No se encontró concepto';

                if (!fecha3){

                    alert("Comprobante no valido")
                    document.getElementById("fechaPago").value = "";
                    document.getElementById("montoPago").value = "";
                    document.getElementById("beneficiarioPago").value = "";
                    document.getElementById("conceptodelpago").value = "";
                    document.getElementById("clavederastreo").value = "";
                    divpagocargado.style.display = "none";
                }
            }
        }
    });
}


// JavaScript para habilitar la selección de múltiples opciones con un solo clic
document.getElementById("mespago").addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName === "OPTION") {
        target.selected = !target.selected;
    }
});
  
function removeSpecialCharacters(input) {
  // Reemplaza caracteres especiales y acentos con una expresión regular
  input.value = input.value.replace(/[^A-Za-z\s]/g, '');
}

function expandAdminPanel() {
    var adminPanel = document.getElementById("adminPanel");
    adminPanel.style.height = "100%";
    adminPanel.style.padding = "20px";
}

function cerrarAdminPanel() {
    var adminPanel = document.getElementById("adminPanel");
    adminPanel.style.height = "0%";
    adminPanel.style.padding = "0px";
}

function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LdCILYpAAAAADl_Sm8WVoZTzGfv8RS_TiLLspJf', {action: 'formulario'});
    });
}




function generarTabla(contenedorId, data) {
        if (sesionIniciada) {
        const contenedor = document.getElementById(contenedorId);

        let tablaHTML = '<table border="0">';

        
        const filasPorCalle = {};
        
        data.forEach((fila, index) => {
            const domDecodificado = atob(fila.dom);
            const calle = domDecodificado.replace(/"/g, '');
            if (!filasPorCalle[calle]) {
                filasPorCalle[calle] = [];
            }
            filasPorCalle[calle].push({ fila, index });
        });

        const callesOrdenadas = Object.keys(filasPorCalle).sort();

        
        // Generar los detalles por cada calle
        callesOrdenadas.forEach(calle => {


            // Iterar sobre las filas de la calle actual
            filasPorCalle[calle].forEach(({ fila, index }) => {
                const domcodificado = fila.dom;
                const domDecodificado = atob(fila.dom);
                const domComillas = domDecodificado.replace(/"/g, '');
                const clienteDecodificado = atob(fila.Cliente);
                const clienteComillas = clienteDecodificado.replace(/"/g, '');
                const correoDecodificado = atob(fila.correo);
                const correoSinComillas = correoDecodificado.replace(/"/g, '');
                const passwordDecodificado = atob(fila.password);
                const passwordComillas = passwordDecodificado.replace(/"/g, '');
                const claseFila = fila.status === "Moroso" ? "fila-roja" : "tablaporcada";
                const claseFila2 = fila.status === "Moroso" ? "fila-roja2" : "tablaporcada2";
                const celular = fila.cel


                tablaHTML += `<tr>`;
                tablaHTML += `<td><details><summary class="${claseFila}">${calle}</summary>`;    
                tablaHTML += `<table class="${claseFila}" border="0">`;    
                tablaHTML += '<tr>';
                tablaHTML += `<tr><td>Residente</td><td><input class="datostext" type="text" value="${clienteComillas}" onchange="actualizarDato(this.value, 'Cliente', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Usuario</td><td><input class="datostext" type="text" value="${correoSinComillas}" onchange="actualizarDato(this.value, 'correo', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Celular</td><td><input class="datostext" type="tel" value="${celular}" onchange="actualizarDato(this.value, 'cel', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Contraseña</td><td><input class="datostext" type="text" value="${passwordComillas}" onchange="actualizarDato(this.value, 'password', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr>
                                <td>Estatus</td>
                                <td>
                                    <select class="identificadormora" onchange="actualizarDato(this.value, 'status', '${domcodificado}')">
                                        <option value="Al Corriente" ${fila.status === "Al Corriente" ? "selected" : ""}>Al Corriente</option>
                                        <option value="Moroso" ${fila.status === "Moroso" ? "selected" : ""}>Moroso</option>
                                    </select>
                                </td>
                            </tr>`;
                tablaHTML += `<tr><td>Ene 2024</td><td><input class="pago" type="text" value="${fila.ene2024}" onchange="actualizarDato(this.value, 'ene2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Feb 2024</td><td><input class="pago" type="text" value="${fila.feb2024}" onchange="actualizarDato(this.value, 'feb2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Mar 2024</td><td><input class="pago" type="text" value="${fila.mar2024}" onchange="actualizarDato(this.value, 'mar2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Abr 2024</td><td><input class="pago" type="text" value="${fila.abr2024}" onchange="actualizarDato(this.value, 'abr2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>May 2024</td><td><input class="pago" type="text" value="${fila.may2024}" onchange="actualizarDato(this.value, 'may2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Jun 2024</td><td><input class="pago" type="text" value="${fila.jun2024}" onchange="actualizarDato(this.value, 'jun2024', '${domcodificado}'})"></td></tr>`;
                tablaHTML += `<tr><td>Jul 2024</td><td><input class="pago" type="text" value="${fila.jul2024}" onchange="actualizarDato(this.value, 'jul2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Ago 2024</td><td><input class="pago" type="text" value="${fila.ago2024}" onchange="actualizarDato(this.value, 'ago2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Sep 2024</td><td><input class="pago" type="text" value="${fila.sep2024}" onchange="actualizarDato(this.value, 'sep2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Oct 2024</td><td><input class="pago" type="text" value="${fila.oct2024}" onchange="actualizarDato(this.value, 'oct2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Nov 2024</td><td><input class="pago" type="text" value="${fila.nov2024}" onchange="actualizarDato(this.value, 'nov2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `<tr><td>Dic 2024</td><td><input class="pago" type="text" value="${fila.dic2024}" onchange="actualizarDato(this.value, 'dic2024', '${domcodificado}')"></td></tr>`;
                tablaHTML += `</table>`;
                tablaHTML += `<button class="boton-eliminar" onclick="eliminarRegistro('${domcodificado}')">Eliminar</button>`;
                tablaHTML += `</details></td>`;
                tablaHTML += `</tr>`;
            });

        });
        
        tablaHTML += '</table>';
        contenedor.innerHTML = tablaHTML;
    } else {
        console.error("Error: La sesión no está iniciada");
        return null; // O maneja el error de alguna otra manera
    }
}
                    

function actualizarDato(valor, campo, domcodificado) {
    // Verificar si la sesión está iniciada
    if (sesionIniciada) {
        console.log("Valor:", valor);
        console.log("Campo:", campo);
        console.log("Índice:", domcodificado);

        const urlProp = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}`;
        fetch(urlProp)            
        .then((response) => response.json())
            .then((data) => {
                const domcodificados = data.map((fila) => fila.dom);
                const indice = domcodificados.findIndex((dom) => dom === domcodificado);
                console.log(indice);

                let valorActualizado = valor; // Inicializamos valorActualizado aquí
                console.log(valorActualizado)

                if (campo === "correo" || campo === "password" || campo === "Cliente") {
                    valorActualizado = cifrarCorreo(valor);
                    console.log("Valor cifrado:", valorActualizado);
                }

                const datosActualizados = {
                    [campo]: valorActualizado,
                };

                const url = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}/${indice}`;
                console.log("URL:", url);
                // Realizar la solicitud PATCH para actualizar los datos
                fetch(url, {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosActualizados)
                     })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Datos actualizados correctamente:", data);
                        alert("Datos actualizados correctamente: " + "Valor: " + valor + " Campo: " + campo);
                    })
                    .catch((error) => {
                        console.error("Error al actualizar los datos:", error);
                        alert("Error al actualizar los datos:" + valor);
                    });
                    }) // Cierre del segundo .then()
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                alert("Error al obtener los datos.");
            });
    } else {
        console.error("Error: La sesión no está iniciada");
        return null; // O maneja el error de alguna otra manera
    }
}



function buscarDomicilio(registrosId) {
    var input = event.target; // Obtiene el elemento input que desencadenó el evento
    var divId = input.parentElement.querySelector('.calle-registros').id; // Obtiene el ID del div dentro del mismo detalle
    console.log(divId);
    var term = input.value.trim().toLowerCase();

    var registros = document.querySelectorAll("#" + divId + " table tbody tr td details summary");
    console.log(registros)
    registros.forEach(function(registro) {
        var contenido = registro.innerHTML.toLowerCase();
        if (contenido.includes(term)) {
            // Muestra el registro y todos sus padres hasta el elemento tr
            var parent = registro.parentNode; // <details>
            while (parent && parent.tagName !== 'TR') {
                parent = parent.parentNode;
            }
            if (parent) {
                parent.style.display = "table-row";
            }
        } else {
            // Oculta el registro y todos sus padres hasta el elemento tr
            var parent = registro.parentNode; // <details>
            while (parent && parent.tagName !== 'TR') {
                parent = parent.parentNode;
            }
            if (parent) {
                parent.style.display = "none";
            }
        }
    });
}

document.getElementById("grabarnweregistro").addEventListener("click", agregarresidente);
let clicActivograbarnweregistro = true; 


function agregarresidente () {

    if (!clicActivograbarnweregistro) {
        return; // Salir si el clic no está activo
    }
    
    clicActivograbarnweregistro = false; // Desactivar el clic

    if (sesionIniciada){
    
        const newcalle = document.getElementById("new-calle").value;
        const newnum = document.getElementById("new-num").value; 
        const newname = document.getElementById("new-name").value;
        const newusarname = document.getElementById("new-username").value;
        const newcontrasena = document.getElementById("new-contrasena").value;
        const newcel = document.getElementById("new-cel").value;

        if (!newname || !newusarname || !newcontrasena || !newcalle || !newnum || !newcel) {
            alert("Por favor, complete todos los campos.");
            setTimeout(() => {
                clicActivograbarnweregistro = true;
                }, 3000); 
            return; // Salir de la función si algún campo está vacío

        }

        const newdom = newcalle + " " + newnum;
        console.log(newdom);
        newclientecif = cifrarCorreo(newname);
        console.log(newname);
        domcif = cifrarCorreo(newdom);
        correocif = cifrarCorreo(newusarname);
        console.log(newusarname);
        passwordcif = cifrarCorreo(newcontrasena); 
        console.log(newusarname);
        console.log(domcif);

        const urlVerificacion = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}/dom/${(domcif)}`;
        console.log(urlVerificacion);

        fetch(urlVerificacion)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.length)


            if (data.length < 1) {
                const datos = {
                    Cliente: newclientecif,
                    dom: domcif,
                    correo: correocif,
                    password: passwordcif,
                    status : "Al Corriente",
                    cel: newcel,
                };

                const url = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}`;

                const opciones = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                };

                fetch(url, opciones)
                    .then((response) => response.json())
                    .then((data) => {
                        alert("Datos grabados correctamente");

                        document.getElementById("new-name").value = "";
                        document.getElementById("new-username").value = "";
                        document.getElementById("new-contrasena").value = "";
                        document.getElementById("new-calle").value = "";
                        document.getElementById("new-num").value = "";
                        document.getElementById("new-cel").value = "";


                        setTimeout(() => {
                            clicActivograbarnweregistro = true;
                        }, 3000);

                        setTimeout(() => {
                                const urlProp = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}`;
                                fetch(urlProp)
                                .then((response) => response.json())
                                .then((data) => {
                                    generarTabla("alba-registros", data.filter((registro) => registro.dom.startsWith("IkN0byBKdWFuIENhcmxvc")));
                                    generarTabla("caballeros-registros", data.filter((registro) => registro.dom.startsWith("IlBvcnRhbGVzI")));
                                    generarTabla("esmeralda-registros", data.filter((registro) => registro.dom.startsWith("Ik1hcm1vbGVzID")));
                                    generarTabla("eros-registros", data.filter((registro) => registro.dom.startsWith("IkdyYW4gVmlhI")));
                                    generarTabla("magdalena-registros", data.filter((registro) => registro.dom.startsWith("IlBsYXphIEFsdGEg")));
                                    //generarTabla("ibiza-registros", data.filter((registro) => registro.dom.startsWith("IklCSVpBI")));
                                    //generarTabla("hierro-registros", data.filter((registro) => registro.dom.startsWith("IkhJRVJSTy")));
                                })
                                .catch((error) => {
                                    console.error("Error al obtener los datos para actualizar las tablas:", error);
                                    alert("Error al obtener los datos para actualizar las tablas.");
                                });
                            }, 5000); // 5000 milisegundos = 5 segundos
                        })

                        .catch((error) => {
                            console.error("Error al enviar los datos a la hoja de cálculo", error);
                        });
                } else {
                    alert("Sin disponibilidad para registrar " + newdom + " ya tiene un registro previo.");
                    clicActivograbarnweregistro = true; 
                }
            })
            .catch(error => {
                console.error("Error al verificar disponibilidad", error);
                clicActivograbarnweregistro = true; 
            });
    } else {
        console.error("Error: La sesión no está iniciada");
        return null; 
    }
}

function limpiarContenedor(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ''; // Elimina todos los elementos hijos del contenedor
}


function expandAdminPanel2() {
    var adminPanel = document.getElementById("adminPanel2");
    adminPanel.style.height = "1550px";
    adminPanel.style.padding = "20px";
}
function cerrarAdminPanel2() {
    var adminPanel = document.getElementById("adminPanel2");
    adminPanel.style.height = "0%";
    adminPanel.style.padding = "0px";
}

function eliminarRegistro(domcodificado){
    if (sesionIniciada) {

        const urlProp = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}`;
        fetch(urlProp)        .then((response) => response.json())
            .then((data) => {
                const domcodificados = data.map((fila) => fila.dom);
                const indice = domcodificados.findIndex((dom) => dom === domcodificado);
                console.log(indice);

                if (indice !== -1) {
                    // Realizar la solicitud DELETE para eliminar el registro
                    const url = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}/${indice}`;
                    fetch(url, {
                        method: "DELETE",
                        mode: "cors",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Registro eliminado correctamente:", data);
                        alert("Registro eliminado correctamente:");

                        setTimeout(() => {
                            const urlProp = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios${privada}`;
                            fetch(urlProp)

                                .then((response) => response.json())
                                .then((data) => {

                                    generarTabla("alba-registros", data.filter((registro) => registro.dom.startsWith("IkN0byBKdWFuIENhcmxvc")));
                                    generarTabla("caballeros-registros", data.filter((registro) => registro.dom.startsWith("IlBvcnRhbGVzI")));
                                    generarTabla("esmeralda-registros", data.filter((registro) => registro.dom.startsWith("Ik1hcm1vbGVzID")));
                                    generarTabla("eros-registros", data.filter((registro) => registro.dom.startsWith("IkdyYW4gVmlhI")));
                                    generarTabla("magdalena-registros", data.filter((registro) => registro.dom.startsWith("IlBsYXphIEFsdGEg")));
                                    //generarTabla("ibiza-registros", data.filter((registro) => registro.dom.startsWith("IklCSVpBI")));
                                    //generarTabla("hierro-registros", data.filter((registro) => registro.dom.startsWith("IkhJRVJSTy")));
                                })
                                .catch((error) => {
                                    console.error("Error al obtener los datos para actualizar las tablas:", error);
                                    alert("Error al obtener los datos para actualizar las tablas.");
                                });
                        }, 5000); // 5000 milisegundos = 5 segundos

                    })
                    .catch((error) => {
                        console.error("Error al eliminar el registro:", error);
                        alert("Error al eliminar el registro.");
                    });
                } else {
                    console.log("No se encontró el registro a eliminar.");
                }
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                alert("Error al obtener los datos para eliminar el registro.");
            });
    } else {
        console.error("Error: La sesión no está iniciada");
        return null; // O maneja el error de alguna otra manera
    }
}

function validarNumero(input) {
    input.value = input.value.replace(/\D/g, ''); // Eliminar caracteres que no sean dígitos
}