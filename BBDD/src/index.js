const app = require('./app');
var express = require('express');
var mongoose = require('mongoose');
var adminRouter = express.Router();

adminRouter.post('/insertar/:datos', function(req,res){
    res.send("Insertada")
    console.log(req.params.datos)
    insertarUsuario(req.params.datos)
})

adminRouter.post('/comprobarUsuario',function(req,res){
    comprobarUsuario(req,res);
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

async function insertarUsuario(datos){
    var paco = new Usuario({
        email:"paco23@gmail.com",
        contraseña:"paco34", 
        nombreCompleto:"Paco Fernández Rodríguez",
        ciudades:[
            {nombreCiudad:"Cádiz",latitud:23,longitud:43},
            {nombreCiudad:"Madrid",latitud:34,longitud:53}
        ]
    });

    await paco.save().then(() => console.log("Paco añadido"));
}

async function comprobarUsuario(req,res){

    var email = req.body.email;
    var contraseña = req.body.contraseña;
    
    await Usuario.find({email:email,contraseña:contraseña}).exec()
    .then((usuario) => {
        console.log(usuario);
    })
    .catch((err) => {
        console.error(err);
    });


    res.send("Correcto");
}


async function main(){
    await app.listen(4000);
    console.log('Database server is running');
}



main();

