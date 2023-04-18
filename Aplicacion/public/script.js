function mostrarFormularioInicioSesion(){

    if(document.getElementById("inicio-usuario").value == "Iniciar Sesion"){
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "block";
    }else{
        //Cerrar la sesión
    }
}

function registrarse(){
    alert("Ha pulsado registrarse");
}

function iniciarSesion(){

    var email = document.getElementById("iniciosesion-email").value;
    var contraseña = document.getElementById("iniciosesion-contraseña").value;

    console.log(email);
    console.log(contraseña);


    //Esto habria que hacerlo consultando a la base de datos pero es para tener algo en el front
    if(email == "rosa@gmail.com" && contraseña == "bonito23"){
        //Se ha iniciado sesión
        //Primero ocultamos el formulario
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "none";

        //A continuación cambiamos el iniciar sesión por el nombre del usuario.
        document.getElementById("inicio-usuario").innerText = "Rosa Bonito";
    }


    alert("Ha pulsado iniciar sesión");
}
