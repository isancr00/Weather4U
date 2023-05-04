const app = require('./app');
const express = require('express');
const axios = require('axios').default;
var adminRouter = express.Router();


adminRouter.post('/comprobarUsuario',function(req,res){
    comprobarUsuario(req.body.email,req.body.contraseña,res);
});

app.use(adminRouter);



function comprobarUsuario(email,contraseña,res){

    var url = "http://bbdd:7000/comprobarUsuario/" + email + "_" + contraseña;
    //Aqui va la peticion
    axios.get(url)
    .then(function(response){
        const data = response.data;
        console.log(data);
        res.send(data);
    });
}

  
async function main(){
    await app.listen(6000);
    console.log('Users server is running');
}

main();