function mostrarFormularioInicioSesion(){
        var formularioSesion = document.getElementById("login-form");
        formularioSesion.style.display = "block";
}

function registrarse(){
    alert("Ha pulsado registrarse");
}

function ejemplo(){
    var datos = 'Hola que tal';
    var url = 'http://localhost:8010/insertar/' + datos;
    fetch(url,{
        method : 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8010',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
          },
        
    })

}