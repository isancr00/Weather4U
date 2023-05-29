function buscar() {
    var ciudad = document.getElementById('caja-busqueda').value;
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
                var estrella = '<input id="radio1" type="radio" name="estrellas" value="5" onclick="marcarComoFav()"><label for="radio1" class = "estrella"> ★</label></div></h2>';
                datosTiempoTexto += estrella;
            } else {
                datosTiempoTexto += "</h2></div>";
            }
            document.getElementById("datos-tiempo").innerHTML = datosTiempoTexto;
            datosTiempo(lat, long);
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
    });

    rellenarCiudades();
}

function rellenarCiudades() {
    var url = "http://localhost:8050/ciudades";
    var listaCiudades = document.getElementById("ciudades");
    listaCiudades.innerHTML = "";
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
                var texto = '<a onclick="datosTiempo(' + lat + ',' + long + ')" class="elemento-ciudad">' + nombreCiudad + '</a>';
                texto += '<input id="radio1" type="radio" name="estrellas" value="5" onclick="eliminarCiudad(' + ciudad + ',' + email + ')"><label for="radio1"> 🗑</label>'

                listaCiudades.innerHTML += separador;
                listaCiudades.innerHTML += texto;
            }

        });
}

function datosTiempo(lat, long) {
    var datosTiempoGeneral1Semana = tiempoGeneral1Semana(lat, long);
    var datosTemperatura1Dia = temperatura1Dia(lat, long);
    var datosPrecipitaciones1Dia = precipitaciones1Dia(lat, long);
    var datosTiempoAhora = tiempoAhora(lat, long);

}

function generarGrafico(titulo, datos){
    var datosTiempoText = document.getElementById("datos-tiempo");
    datosTiempoText.innerHTML += '<canvas id="myChart"></canvas>'

    var ctx = document.getElementById("myChart").getContext('2d');
    const horas = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'
        , '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    var data = {
        labels: horas,
        datasets: [{
            label: titulo,
            data: datos,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
        }]
    }
    
    const myChart = new Chart(ctx,{
        type: 'line',
        data: data
    })
}

function tiempoAhora(lat, long) {
    var url = "http://localhost:8030/tiempoAhora/" + lat + "_" + long;
    var devuelve = "";
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });
}

function tiempoGeneral1Semana(lat, long) {
    var url = "http://localhost:8030/tiempo/" + lat + "_" + long;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

function temperatura1Dia(lat, long) {
    var url = "http://localhost:8030/temperatura/" + lat + "_" + long;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            generarGrafico('Evolución de la temperatura', data);
        });
}

function precipitaciones1Dia(lat, long) {
    var url = "http://localhost:8030/precipitaciones/" + lat + "_" + long;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });
}


function eliminarCiudad(nombreCiudad, email) {
    var url = "http://localhost:8050/eliminarCiudad";

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ciudad: nombreCiudad, email: email }),
        headers: { 'Content-Type': 'application/json' }
    })

    rellenarCiudades();
}