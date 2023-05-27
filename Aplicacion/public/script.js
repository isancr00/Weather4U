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
            var datosTiempo = '<div><h2 id="datos-ciudad">' + ciudad + " " + lat + " " + long;
            if (emailStorage != null) {
                var estrella = '<input id="radio1" type="radio" name="estrellas" value="5" onclick="marcarComoFav()"><label for="radio1"> ★</label></div></h2>';
                datosTiempo += estrella;
            } else {
                datosTiempo += "</h2></div>";
            }
            document.getElementById("datos-tiempo").innerHTML = datosTiempo;

            datosTiempo(lat,long)
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
                            document.getElementById("alertas").innerText = "El email está en el formato incorrecto"
                        }
                    } else {
                        document.getElementById("alertas").innerText = "La contraseña ha de tener una longitud mayor a 6"
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

    for (i = 0; i<longMax ; i++) {
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
    //AQUI HAY QUE COMPROBAR QUE LA CIUDAD NO ESTÁ ENTRE LAS YA EXISTENTES
    var url = "http://localhost:8050/ciudades";
    var listaCiudades = document.getElementById("ciudades");
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email: localStorage.getItem("email") }),
        headers: { 'Content-Type': 'application/json' }
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);

            var separador = "<hr>";
            for(i=0;i<data.length;i++){
                var nombreCiudad = data[i].nombreCiudad;
                var ciudad = "'" + data[i].nombreCiudad + "'";

                var email = "'" + localStorage.getItem("email") + "'";
                var lat = data[i].latitud;
                var long = data[i].longitud;  
                var texto = '<a onclick="datosTiempo(' + lat + ',' + long + ')">' + nombreCiudad + '</a>';
                texto += '<input id="radio1" type="radio" name="estrellas" value="5" onclick="eliminarCiudad(' + ciudad + ',' + email +')"><label for="radio1"> 🗑</label>'

                listaCiudades.innerHTML += separador;
                listaCiudades.innerHTML += texto;
            }

        });
}

function datosTiempo(lat,long){
    console.log(lat);

}

function eliminarCiudad(nombreCiudad,email){
    //Eliminamos ciudad
    var url = "http://localhost:8050/eliminarCiudad";

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ciudad: nombreCiudad, email:email }),
        headers: { 'Content-Type': 'application/json' }
    })
}