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
            document.getElementById('datos-tiempo').innerText = ciudad + ": " + lat + " " + long;
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
                document.getElementById("alertas").innerText = "Correo ya registrado"
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
        //Añadir el menú desplegable con el nombre del usuario y con la opción perfil y la opción cerrar sesión
        var elementosDer = document.getElementById("elementos-der");
        var html = '<li><a href="index.html">Inicio</a>' + 
        '</li><li><a href="info.html">Acerca de</a></li>'+ 
        '<div class="menu-desplegable"><span>' + nombreStorage +'</span>'+
        '<div class="contenido-menu"><a href="perfil.html">'+
        'Perfil</a><p></p><a href="index.html" onclick="'+
        'cerrarSesion()">Cerrar Sesión</a></div></div>';
        elementosDer.innerHTML = html;
    }


}


function cerrarSesion() {
    localStorage.clear();

}