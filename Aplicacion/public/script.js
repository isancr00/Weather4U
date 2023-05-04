function mostrarFormularioInicioSesion(){
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "block";
}

function cerrarFormularioInicioSesion(){
    var formularioSesion = document.getElementById("login-form");
    formularioSesion.style.display = "none";
}

function buscar(){
    document.getElementById("informacion").style.display = "none";
}

function iniciarSesion(){
    var email = document.getElementById("iniciosesion-email").value;
    var contraseña = document.getElementById("iniciosesion-contraseña").value;

    var url = "http://localhost:8040/comprobarUsuario/"

    const regex = /[^@]+@[^@]+[.]\w+/;

    if(email != "" && contraseña !=""){
        if(regex.test(email)){           
            fetch(url,{
                method: 'POST',
                body: JSON.stringify({ email: email, contraseña:contraseña }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                var stringData = JSON.stringify(data);
                if(stringData == '{"usuario":[]}'){
                    document.getElementById("alerta").innerText = "Los datos introducidos no se encuentran en el sistema";
                    document.getElementById("iniciosesion-email").value = "";
                    document.getElementById("iniciosesion-contraseña").value = "";
                }
            });
            //Aquí habría que cambiar el botón de inicio de sesión por un menú que nos permita cerrar la sesión y obtener la info del usuario.



        }else{
            document.getElementById("alerta").innerText = "El email está en el formato incorrecto.";
            document.getElementById("iniciosesion-email").value = "";
            document.getElementById("iniciosesion-contraseña").value = "";

        }
    
        }else{
            document.getElementById("alerta").innerText = "Los campos email y contraseña son obligatorios.";
            var email = document.getElementById("iniciosesion-email").innerText = "";
            var contraseña = document.getElementById("iniciosesion-contraseña").innerText = "";
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