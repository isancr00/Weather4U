const app = require('./app');
const mongoose = require('mongoose');
var express = require('express');
var adminRouter = express.Router();

adminRouter.post('/insertar/:datos', function(req,res){
    console.log(req.params.datos)
    insertar(req.params.datos,res);
})

app.use(adminRouter);  

/*
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

*/
async function insertar(datos,res){
    /*var paco = new Usuario({
        email:"paco23@gmail.com",
        contraseña:"paco34", 
        nombreCompleto:"Paco Fernández Rodríguez",
        ciudades:[
            {nombreCiudad:"Cádiz",latitud:23,longitud:43},
            {nombreCiudad:"Madrid",latitud:34,longitud:53}
        ]
    });

    await paco.save().then(() => console.log("Paco añadido"));*/

    console.log(datos);
    console.log("Proba proba los tambores");
    res.send("Insertada");

}

async function main(){
    await app.listen(5000);
    console.log('App server is running');

    
}

main();

