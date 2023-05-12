const app = require('./app');
const express = require('express');
const axios = require('axios').default;
var adminRouter = express.Router();


adminRouter.post('/comprobarUsuario',function(req,res){
    comprobarUsuario(req.body.email,res);
});

adminRouter.post('/iniciarSesion',function(req,res){
    iniciarSesion(req.body.email,req.body.contraseña,res);
});

adminRouter.post('/registrarUsuario',function(req,res){
    registrarUsuario(req.body.nombre,req.body.email,req.body.contraseña,res);
});

app.use(adminRouter);

function registrarUsuario(nombre,email,contraseña,res){
    var url = "http://bbdd:7000/registrarUsuario/" +nombre + "_" + email + "_" + contraseña;
    //Aqui va la peticion
    axios.get(url)
    .then(function(response){
        const data = response.data;
        res.send(data);
    });
}


async function iniciarSesion(email,contraseña,res){
    var url = "http://bbdd:7000/iniciarSesion/" + email + "_" + contraseña;
    //Aqui va la peticion
    var resultado = await axios.get(url);
    res.send(resultado.data);
}

async function comprobarUsuario(email,res){
    var url = "http://bbdd:7000/comprobarUsuario/" + email;
    //Aqui va la peticion
    var resultado = await axios.get(url);
    res.send(resultado.data);
}

  
async function main(){
    await app.listen(6000);
    console.log('Users server is running');
}

main();