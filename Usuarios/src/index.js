const app = require('./app');
const express = require('express');
const axios = require('axios').default;
const jwt = require('jsonwebtoken');
const secret = 'asdfljngsdflmaJnadfasdak(idjaklsd2r3q432_3242342';
var adminRouter = express.Router();


adminRouter.post('/comprobarUsuario', function (req, res) {
    comprobarUsuario(req.body.email, res);
});

adminRouter.post('/nombreToken', function (req, res) {
    nombreToken(req.body.token, res);
});

adminRouter.post('/iniciarSesion', function (req, res) {
    iniciarSesion(req.body.email, req.body.contraseña, res);
});

adminRouter.post('/cerrarSesion', function (req, res) {
    cerrarSesion(req.body.token);
});

adminRouter.post('/registrarUsuario', function (req, res) {
    registrarUsuario(req.body.nombre, req.body.email, req.body.contraseña, res);
});

app.use(adminRouter);

function registrarUsuario(nombre, email, contraseña, res) {
    var payload = {
        nombre: nombre,
        email: email,
        contraseña: contraseña
    }
    var token = jwt.sign(payload, secret, { expiresIn: '3h' });
    var url = "http://bbdd:7000/registrarUsuario/" + token;
    //Aqui va la peticion

    axios.get(url)
        .then(function (response) {
            const data = response.data;
            res.send(data);
        });
}

function nombreToken(token, res) {
    var nombre = jwt.decode(token).nombre;
    res.send(JSON.stringify({ nombre: nombre }))
}

function cerrarSesion(token){
    var url = "http://bbdd:7000/eliminarToken/" + token;
    axios.get(url);
}

async function iniciarSesion(email, contraseña, res) {
    var url = "http://bbdd:7000/iniciarSesion/" + email + "_" + contraseña;
    var resultado = await axios.get(url);
    res.send(resultado.data);
}

async function comprobarUsuario(email, res) {
    var url = "http://bbdd:7000/comprobarUsuario/" + email;
    //Aqui va la peticion
    var resultado = await axios.get(url);
    res.send(resultado.data);
}


async function main() {
    await app.listen(6000);
    console.log('Users server is running');
}

main();