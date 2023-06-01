function buscar() {
    var ciudad = document.getElementById('searchTextField').value;
    var url = "http://localhost:8050/coordenadas";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ciudad: ciudad }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            var lat = data.lat;
            var long = data.lng;
            var emailStorage = localStorage.getItem("email");
            var datosTiempoTexto = '<div><h2 id="datos-ciudad">' + ciudad + " " + lat + " " + long;
            if (emailStorage != null) {
                var estrella = '<input id="radio1" type="radio" name="estrellas"  onclick="marcarComoFav()"><label for="radio1" class = "estrella"> ★</label></div></h2>';
                datosTiempoTexto += estrella;
            } else {
                datosTiempoTexto += "</h2></div>";
            }
            document.getElementById("datos-tiempo").innerHTML = datosTiempoTexto;
            datosTiempo(ciudad, lat, long, null);

        });

}

function iniciarSesion() {
    var email = document.getElementById("iniciosesion-email").value;
    var contraseña = document.getElementById("iniciosesion-contraseña").value;

    var url = "http://localhost:8040/iniciarSesion/"

    const regex = /[^@]+@[^@]+[.]\w+/;

    if (email != "" && contraseña != "") {
        if (regex.test(email)) {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ email: email, contraseña: contraseña }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    if (JSON.stringify(data) == '[]') {
                        document.getElementById("alerta").innerText = "Datos incorrectos";
                        document.getElementById("iniciosesion-email").value = "";
                        document.getElementById("iniciosesion-contraseña").value = "";
                    } else {
                        localStorage.setItem("email", data[0].email);
                        localStorage.setItem("nombre", data[0].nombreCompleto);
                        location.href = "/index.html"
                    }
                });

        } else {
            document.getElementById("alerta").innerText = "El email está en el formato incorrecto.";
            document.getElementById("iniciosesion-email").value = "";
            document.getElementById("iniciosesion-contraseña").value = "";

        }

    } else {
        document.getElementById("alerta").innerText = "Los campos email y contraseña son obligatorios.";
        var email = document.getElementById("iniciosesion-email").innerText = "";
        var contraseña = document.getElementById("iniciosesion-contraseña").innerText = "";
    }
}


function registro() {
    var nombre = document.getElementById("registro-nombre").value;
    var email = document.getElementById("registro-email").value;
    var contra1 = document.getElementById("registro-contraseña1").value;
    var contra2 = document.getElementById("registro-contraseña2").value;
    var url1 = "http://localhost:8040/comprobarUsuario/";
    var url2 = "http://localhost:8040/registrarUsuario/";
    const regex = /[^@]+@[^@]+[.]\w+/;

    fetch(url1, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            if (JSON.stringify(data) != '[]') {
                document.getElementById("alerta").innerText = "Correo ya registrado"
            } else {
                if (contra1 == contra2) {

                    if (contra1.length > 6) {
                        if (regex.test(email)) {
                            fetch(url2, {
                                method: 'POST',
                                body: JSON.stringify({ nombre: nombre, email: email, contraseña: contra1 }),
                                headers: { 'Content-Type': 'application/json' }
                            });

                            location.href = "/index.html"

                        } else {
                            document.getElementById("alerta").innerText = "El email está en el formato incorrecto"
                        }
                    } else {
                        document.getElementById("alerta").innerText = "La contraseña ha de tener una longitud mayor a 6"
                    }

                } else {
                    document.getElementById("alertas").innerText = "Las contraseñas no coinciden"
                }
            }
        });

}


function cargarPagina() {
    var emailStorage = localStorage.getItem("email");
    var nombreStorage = localStorage.getItem("nombre");

    console.log(emailStorage);

    if (emailStorage != null) {
        var elementosDer = document.getElementById("elementos-der");
        var html = '<li><a href="index.html">Inicio</a>' +
            '</li><li><a href="info.html">Acerca de</a></li>' +
            '<li><a href="index.html" onclick="cerrarSesion()">Cerrar Sesión</a></li>';
        elementosDer.innerHTML = html;
        document.getElementById("nombre-usuario").innerText = nombreStorage;
        rellenarCiudades();
    }
}


function cerrarSesion() {
    localStorage.clear();
}

function marcarComoFav() {
    var url = "http://localhost:8050/ciudadFav";
    var datosCiudad = document.getElementById("datos-ciudad").textContent;
    var datosSplit = datosCiudad.split(" ");
    var ciudad = "";
    var longitud = "";
    var latitud = "";

    longitud = datosSplit[datosSplit.length - 2];
    latitud = datosSplit[datosSplit.length - 3];

    var longMax = datosSplit.length - 3;

    for (i = 0; i < longMax; i++) {
        ciudad += datosSplit[i] + " ";
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ nombreCiudad: ciudad, latitud: latitud, longitud: longitud, email: localStorage.getItem("email") }),
        headers: { 'Content-Type': 'application/json' }
    }).then(function(response){
        rellenarCiudades();
    });
}

function rellenarCiudades() {
    var url = "http://localhost:8050/ciudades";
    var listaCiudades = document.getElementById("ciudades");
    listaCiudades.innerHTML = "<h3>Lista de ciudades favoritas</h3>";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email: localStorage.getItem("email") }),
        headers: { 'Content-Type': 'application/json' }
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);

            var separador = "<hr>";
            for (i = 0; i < data.length; i++) {
                var nombreCiudad = data[i].nombreCiudad;
                var ciudad = "'" + data[i].nombreCiudad + "'";

                var email = "'" + localStorage.getItem("email") + "'";
                var lat = data[i].latitud;
                var long = data[i].longitud;
                var texto = '<a onclick="datosTiempo(' + ciudad + ',' + lat + ',' + long + ',' + "'manolo'" + ')" class="elemento-ciudad">' + nombreCiudad + '</a>';
                texto += '<input id="' + nombreCiudad + '" type="radio" name="papelera"  onclick="eliminarCiudad(' + ciudad + ',' + email + ')"><label for="' + nombreCiudad + '">  🗑</label>'

                listaCiudades.innerHTML += separador;
                listaCiudades.innerHTML += texto;
            }

        });
}

function datosTiempo(nombre, lat, long, estrella) {
    if (estrella != null) {
        var datosTiempoTexto = '<div><h2 id="datos-ciudad">' + nombre + " " + lat + " " + long + '</h2></div>';
        document.getElementById("datos-tiempo").innerHTML = datosTiempoTexto;
    }

    var parrafo = "<h3>El tiempo actual en " + nombre + " es: </h3>"
    document.getElementById("datos-tiempo").innerHTML += parrafo;

    var actual = "<div id='actual' class='actual'></div>"
    document.getElementById("datos-tiempo").innerHTML += actual;

    var tempAct = "<div class='temp-act'><h1 id='temp-actual'></h1></div>"
    document.getElementById("actual").innerHTML += tempAct;

    var tiempoGeneral = "<div class='general-act'><h1 id='tiemp-general'></h1></div>"
    document.getElementById("actual").innerHTML += tiempoGeneral;

    var dia = "<div id='dia' class = 'dia'></div>";
    document.getElementById("datos-tiempo").innerHTML += dia;

    var graficoTempDia = "<div id ='temp-dia' class='temp-dia'><canvas id = 'tempDiaChart'></canvas></div>"
    document.getElementById("dia").innerHTML += graficoTempDia;

    var graficoPrecDia = "<div id ='prec-dia' class='prec-dia'><canvas id = 'precDiaChart'></canvas></div>"
    document.getElementById("dia").innerHTML += graficoPrecDia;

    var semana = "<div id='semana' class = 'dia'></div>";
    document.getElementById("datos-tiempo").innerHTML += semana;

    var graficoTempSemana = "<div id ='temp-semana' class='temp-dia'><canvas id = 'tempSemanaChart'></canvas></div>"
    document.getElementById("semana").innerHTML += graficoTempSemana;

    var graficoPrecSemana = "<div id ='prec-semana' class='prec-dia'><canvas id = 'precSemanaChart'></canvas></div>"
    document.getElementById("semana").innerHTML += graficoPrecSemana;

    temperatura1Semana(lat, long);
    precipitaciones1Semana(lat, long);
    temperatura1Dia(lat, long);
    precipitaciones1Dia(lat, long);
    tiempoAhora(lat, long);

}

function transformarDias(fechasOriginales){
    var devuelve = [];

    for(i=0;i<7;i++){
        var fecha = new Date(fechasOriginales[i]);
        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1;
        var año = fecha.getFullYear();

        var fechaFinal = dia + '/' + mes + '/' + año;

        devuelve.push(fechaFinal);
    }

    return devuelve;
}

function temperatura1Semana(lat, long) {
    var url = "http://localhost:8030/temperaturaSemana/" + lat + "_" + long;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            var ctx = document.getElementById('tempSemanaChart').getContext('2d');
            const dias = transformarDias(data.dias);

            var opciones = {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Días'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'ºC'
                        }
                    }
                }
            };
            var datos = {
                labels: dias,
                datasets: [{
                    label: "Temperaturas máximas 1 semana",
                    data: data.max,
                    borderWidth: 1,
                    borderColor: 'rgb(75, 192, 192)',
                },
                {
                    label: "Temperaturas mínimas 1 semana",
                    data: data.min,
                    borderWidth: 1,
                    borderColor: 'rgb(237, 122, 202)',
                }]
            }

            const myChart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options: opciones
            })

        });
}

function precipitaciones1Semana(lat, long) {
    var url = "http://localhost:8030/precipitacionesSemana/" + lat + "_" + long;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {

            var ctx = document.getElementById('precSemanaChart').getContext('2d');
            const dias = transformarDias(data.dias);
            
            var opciones = {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Días'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '%'
                        }
                    }
                }
            };
            var datos = {
                labels: dias,
                datasets: [{
                    label: "Evolución precipitaciones 1 semana",
                    data: data.datos,
                    borderWidth: 1,
                    borderColor: 'rgb(75, 192, 192)',
                }]
            }

            const myChart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options: opciones
            })
        });
}


function transformarTiempo(tiempoGeneral) {
    switch (tiempoGeneral) {
        case 0:
            return "Cielo despejado";
        case 1:
            return "Mayormente despejado";
        case 2:
            return "Parcialmente nublado";
        case 3:
            return "Nublado";
        case 45:
        case 48:
            return "Niebla";
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return "Llovizna";
        case 61:
        case 63:
        case 65:
            return "Lluvia";
        case 66:
        case 67:
            return "Granizo";
        case 71:
        case 73:
        case 75:
        case 77:
            return "Nieve";
        case 80:
        case 81:
        case 82:
            return "Fuertes rachas de lluvias";
        case 85:
        case 86:
            return "Fuertes rachas de nieve";
        case 95:
            return "Tormenta";
        case 96:
        case 99:
            return "Tormenta con granizo";
    }
}
function tiempoAhora(lat, long) {
    var url = "http://localhost:8030/tiempoAhora/" + lat + "_" + long;
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("temp-actual").innerText = data.temperature + "ºC";
            document.getElementById("tiemp-general").innerText = transformarTiempo(data.weathercode);

        });

}


function temperatura1Dia(lat, long) {
    var url = "http://localhost:8030/temperaturaDia/" + lat + "_" + long;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            var ctx = document.getElementById('tempDiaChart').getContext('2d');
            const horas = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'
                , '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

            var opciones = {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Horas'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'ºC'
                        }
                    }
                }
            };
            var datos = {
                labels: horas,
                datasets: [{
                    label: "Evolución temperatura 24 horas",
                    data: data,
                    borderWidth: 1,
                    borderColor: 'rgb(75, 192, 192)',
                }]
            }

            const myChart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options: opciones
            })

        });
}

function precipitaciones1Dia(lat, long) {
    var url = "http://localhost:8030/precipitacionesDia/" + lat + "_" + long;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {

            var ctx = document.getElementById('precDiaChart').getContext('2d');
            const horas = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'
                , '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

            var opciones = {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Horas'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '%'
                        }
                    }
                }
            };
            var datos = {
                labels: horas,
                datasets: [{
                    label: "Evolución precipitaciones 24 horas",
                    data: data,
                    borderWidth: 1,
                    borderColor: 'rgb(75, 192, 192)',
                }]
            }

            const myChart = new Chart(ctx, {
                type: 'line',
                data: datos,
                options: opciones
            })
        });
}


function eliminarCiudad(nombreCiudad, email) {
    var url = "http://localhost:8050/eliminarCiudad";

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ciudad: nombreCiudad, email: email }),
        headers: { 'Content-Type': 'application/json' }
    }).then(function(response){
        rellenarCiudades();
    });
}