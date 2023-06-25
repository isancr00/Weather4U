const app = require('./app');
var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const secret = 'asdfljngsdflmaJnadfasdak(idjaklsd2r3q432_3242342';
var adminRouter = express.Router();

adminRouter.get('/iniciarSesion/:datos', function (req, res) {
    iniciarSesion(req.params.datos, res);
})

adminRouter.get('/comprobarCaducidadToken/:datos', function (req, res) {
    comprobarCaducidadToken(req.params.datos, res);
})


adminRouter.get('/eliminarToken/:datos', function (req, res) {
    eliminarToken(req.params.datos);
});

adminRouter.get('/comprobarUsuario/:datos', function (req, res) {
    comprobarUsuarioRegistro(req.params.datos, res);
})


adminRouter.get('/registrarUsuario/:datos', function (req, res) {
    registrarUsuario(req.params.datos);
})

adminRouter.get('/addCiudad/:datos', function (req, res) {
    añadirCiudad(req.params.datos);
})

adminRouter.get('/ciudades/:datos', function (req, res) {
    getCiudades(req.params.datos, res);
})

adminRouter.get('/eliminarCiudad/:datos', function (req, res) {
    eliminarCiudad(req.params.datos);
})

app.use(adminRouter);


mongoose.connect('mongodb://root:rootpassword@mongodb:27017/', {
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err))

const usuarioEsquema = new mongoose.Schema({
    email: String,
    contraseña: String,
    nombreCompleto: String,
    token: String,
    ciudades: [{ nombreCiudad: String, latitud: Number, longitud: Number }]
});

const Usuario = new mongoose.model('Usuario', usuarioEsquema);


async function comprobarCaducidadToken(datos, res) {
    const result = await Usuario.find({ token: datos });
    var fechaActual = new Date();
    var decodedToken = jwt.decode(datos);
    var fechaToken = new Date(decodedToken.exp * 1000); 
    console.log(result);
    if (fechaActual >= fechaToken) {
        //Token caducado ponerle vacio
        result[0].token = "";
        result[0].save();
        res.send(JSON.stringify({ token: "" }))
    } else {
        res.send(JSON.stringify({ token: result[0].token }));

    }
}


async function eliminarToken(datos) {
    const result = await Usuario.find({ token: datos });

    if(result.length != 0){
        result[0].token = "";
        result[0].save();
    }
}

async function iniciarSesion(datos, res) {
    var datosSplit = datos.split("_");
    var email = datosSplit[0];
    var contraseña = datosSplit[1];

    const result = await Usuario.find({ email: email, contraseña: contraseña });


    if (result[0] != null) {

        var fecha = new Date();
        var tokenActual = result[0].token;

        var payload = {
            nombre: result[0].nombreCompleto,
            email: result[0].email,
            contraseña: result[0].contraseña
        }
        var token = jwt.sign(payload, secret, { expiresIn: '3h' });

        if (tokenActual != "") {
            var decodedToken = jwt.decode(tokenActual);
            var fechaToken = new Date(decodedToken.exp * 1000);
            console.log(fechaToken);


            if (fecha >= fechaToken) {
                result[0].token = token;
                result[0].save();

                res.send(JSON.stringify({ token: token }));
            } else {
                res.send(JSON.stringify({ token: tokenActual }));
            }
        } else {
            result[0].token = token;
            result[0].save();
            res.send({ token: token });
        }

    } else {
        res.send(JSON.stringify([]));
    }
}

async function comprobarUsuarioRegistro(datos, res) {

    var email = datos;
    const result = await Usuario.find({ email: email });
    res.send(JSON.stringify(result));
}


async function registrarUsuario(datos) {
    var token = datos;
    var decoded = jwt.decode(token);

    const insertar = new Usuario({ email: decoded.email, contraseña: decoded.contraseña, nombreCompleto: decoded.nombre, ciudades: [], token: token });
    insertar.save().then(() => console.log("Insertado"));
}

async function añadirCiudad(datos) {
    var datosSplit = datos.split('_');
    var ciudad = datosSplit[0];
    var longitud = datosSplit[2];
    var latitud = datosSplit[1];
    var token = datosSplit[3];

    if(datosSplit.length > 3){
        for(i=4;i<datosSplit.length;i++){
            token += "_" + datosSplit[i];
        }
    }

    var existe = false;


    const result = await Usuario.find({ token: token });
    var ciudades = result[0].ciudades;

    for (i = 0; i < ciudades.length; i++) {
        console.log(ciudades[i].nombreCiudad);
        if (ciudades[i].nombreCiudad == ciudad) {
            existe = true;
        }
    }

    if (existe == false) {
        console.log("No existe")
        result[0].ciudades.push({ nombreCiudad: ciudad, latitud: latitud, longitud: longitud });
        result[0].save();

    }
}

async function eliminarCiudad(datos) {
    var datosSplit = datos.split("_");
    var token = datosSplit[1];

    if(datosSplit.length > 2){
        for(i=2;i<datosSplit.length;i++){
            token += "_" + datosSplit[i];
        }
    }

    var ciudad = datosSplit[0];
    const result = await Usuario.find({ token: token });

    for (i = 0; i < result[0].ciudades.length; i++) {
        var nombreAux = result[0].ciudades[i].nombreCiudad;

        if (nombreAux == ciudad) {
            result[0].ciudades.splice(i, 1);
            result[0].save();
        }
    }
}

async function getCiudades(token, res) {
    const result = await Usuario.find({ token: token });

    if (result != []) {
        res.send(JSON.stringify(result[0].ciudades));
    }
}

async function main() {
    await app.listen(7000);
    console.log('Database server is running');
}

main();

