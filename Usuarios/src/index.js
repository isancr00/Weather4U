const app = require('./app');
const express = require('express');
const axios = require('axios').default;
var adminRouter = express.Router();


adminRouter.post('/comprobarUsuario',function(req,res){
    var resultado = comprobarUsuario(req.body.email,req.body.contraseña);
    res.send(resultado);
});

app.use(adminRouter);



function comprobarUsuario(email,contraseña){


    //EL ERROR ESTÁ AQUÍ
    var url = "http://172.30.0.1:8010/comprobarUsuario/" + email + "_" + contraseña;
    //Aqui va la peticion
    axios.get(url)
        .then(function(response){
            console.log(response);
            return resultado;
        })
        .catch(function(error){
            console.error(error);
        });
}

  
async function main(){
    await app.listen(6000);
    console.log('Users server is running');
}

main();