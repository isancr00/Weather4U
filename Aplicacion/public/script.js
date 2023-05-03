function mostrarFormularioInicioSesion(){
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "block";
}

async function iniciarSesion(){
    var email = document.getElementById("iniciosesion-email").value;
    var contraseña = document.getElementById("iniciosesion-contraseña").value;
   /* console.log(JSON.stringify({email: email, contraseña:contraseña}));

    var url = "http://localhost:8010/comprobarUsuario/" + email + "_" + contraseña;
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
        }
        else {
            console.log('Error en la petición');
        }
    };

    xhr.send();*/

    var url = "http://localhost:8040/comprobarUsuario/"

    if(email != "" && contraseña !=""){
        await fetch(url,{
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