const app = require('./app');
const express = require('express');
var adminRouter = express.Router();

adminRouter.post('/comprobarUsuario',function(req,res){
    var resultado = comprobarUsuario(req.body.email,req.body.contraseña);
    res.send(resultado);
});

app.use(adminRouter);



function comprobarUsuario(email,contraseña){
    
    var url = "http://127.0.0.1:8010/comprobarUsuario/" + email + "_" + contraseña;
    //Aqui va la peticion
}
  
async function main(){
    await app.listen(6000);
    console.log('Users server is running');
}

main();