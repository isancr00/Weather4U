function mostrarFormularioInicioSesion(){
    document.getElementById("informacion").style.display = "none";
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

    var url = "http://localhost:8040/iniciarSesion/"

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
                if(JSON.stringify(data) == '[]'){
                    document.getElementById("alerta").innerText = "Los datos introducidos no se encuentran en el sistema";
                    document.getElementById("iniciosesion-email").value = "";
                    document.getElementById("iniciosesion-contraseña").value = "";
                }else{
                    cerrarFormularioInicioSesion();
                    document.getElementById("informacion").style.display = "none";
                    document.getElementById("inicio-usuario").innerText = data[0].nombreCompleto;
                    document.getElementById("boton-inicio").setAttribute("onclick","cerrarSesion()")
                    mostrarCiudades(data[0].ciudades);
                }
            });

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
    location.href = "/registro.html"

}

function volverAInicio(){
    location.href = "/index.html"
}

function mostrarCiudades(ciudades){
    console.log("Las ciudades son: " + ciudades);
}

function registro(){
    var nombre = document.getElementById("nombreCompleto").value;
    var email = document.getElementById("email").value;
    var contra1 = document.getElementById("contra1").value;
    var contra2 = document.getElementById("contra2").value;
    var url1 = "http://localhost:8040/comprobarUsuario/";
    var url2 = "http://localhost:8040/registrarUsuario/";
    const regex = /[^@]+@[^@]+[.]\w+/;

    fetch(url1,{
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if(JSON.stringify(data) != '[]'){
            document.getElementById("alertas").innerText = "Este correo ya está registrado en el servicio. Pruebe a iniciar sesión"
        }else{
            if(contra1 == contra2){

                if(contra1.length > 6){
                    if(regex.test(email)){
                        fetch(url2,{
                            method: 'POST',
                            body: JSON.stringify({ nombre:nombre ,email: email, contraseña:contra1 }),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        
                        volverAInicio();

                    }else{
                        document.getElementById("alertas").innerText = "El email está en el formato incorrecto"
                    }
                }else{
                    document.getElementById("alertas").innerText = "La contraseña ha de tener una longitud mayor a 6"
                }
        
            }else{
                document.getElementById("alertas").innerText = "Las contraseñas no coinciden"
            }
        }
    });

}


function cerrarSesion(){
    document.getElementById("login-form").innerHTML = "<p>Cerrar Sesión</p>";
    mostrarFormularioInicioSesion();
}