function mostrarFormularioInicioSesion(){
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "block";
}

function registrarse(){
    alert("Ha pulsado registrarse");
}

function ejemplo(){
    var url = 'http://localhost:8010/insertar/';
    fetch(url,{
        method : 'POST',
    })

}