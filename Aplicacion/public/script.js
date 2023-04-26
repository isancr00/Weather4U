function mostrarFormularioInicioSesion(){
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "block";
}

function iniciarSesion(){
    var email = document.getElementById("iniciosesion-email").value;
    var contraseña = document.getElementById("iniciosesion-contraseña").value;
    console.log(JSON.stringify({email: email, contraseña:contraseña}));

    //Hay que hacer una petición get a el microservicio de usuarios para comprobar que existe un usuario con dicho email y contraseña.
    var url = "http://localhost:8040/comprobarUsuario"

    //Lo hacemos como una petición post para ocultar la contraseña
    fetch(url,{
        method: 'POST',
        body: JSON.stringify({ email: email, contraseña:contraseña }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .catch(error => console.error(error));

    //Aquí habría que cambiar el botón de inicio de sesión por un menú que nos permita cerrar la sesión y obtener la info del usuario.
}

function cambiarARegistro(){
    //Cambiar de pantalla a la de registro.html
    location.href = "/registro.html"

}

/*Ejemplo de post para guardar en BBDD


function ejemplo(){



    var url = 'http://localhost:8010/insertar/hola';
    fetch(url,{
        method : 'POST',
    })

}*/