const app = require('./app');
var express = require('express');
var mongoose = require('mongoose');
var adminRouter = express.Router();

adminRouter.get('/iniciarSesion/:datos',function(req,res){
    iniciarSesion(req.params.datos,res);
})

adminRouter.get('/comprobarUsuario/:datos',function(req,res){
    comprobarUsuario(req.params.datos,res);
})


adminRouter.get('/registrarUsuario/:datos',function(req,res){
    registrarUsuario(req.params.datos);
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
    ciudades:[{nombreCiudad:String, latitud:Number,longitud:Number}]
});

const Usuario = new mongoose.model('Usuario',usuarioEsquema);


async function iniciarSesion(datos,res){

    var datosSplit = datos.split("_");
    var email = datosSplit[0];
    var contraseña = datosSplit[1];

    const result = await Usuario.find({email:email,contraseña:contraseña});
    res.send(JSON.stringify(result));
}

async function comprobarUsuario(datos,res){

    var email = datos;

    const result = await Usuario.find({email:email});
    res.send(JSON.stringify(result));
}


async function registrarUsuario(datos){

    var datosSplit = datos.split("_");
    var email = datosSplit[1];
    var contraseña = datosSplit[2];
    var nombreCompleto = datosSplit[0];

    const insertar = new Usuario({email:email, contraseña:contraseña, nombreCompleto: nombreCompleto, ciudades:[]});
    insertar.save().then(() => console.log("Insertado"));


}

async function main(){
    await app.listen(7000);
    console.log('Database server is running');
}



main();

