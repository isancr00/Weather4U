function mostrarFormularioInicioSesion(){
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "block";
}

function iniciarSesion(){
    var email = document.getElementById("iniciosesion-email").value;
    var contraseña = document.getElementById("iniciosesion-contraseña").value;

    var url = "http://localhost:8040/comprobarUsuario/"

    if(email != "" && contraseña !=""){
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({ email: email, contraseña:contraseña }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
        //Aquí habría que cambiar el botón de inicio de sesión por un menú que nos permita cerrar la sesión y obtener la info del usuario.

    }else{
        alert("Ambos campos son obligatorios");
    }





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