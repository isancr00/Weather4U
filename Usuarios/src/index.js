const app = require('./app');
const express = require('express');
var adminRouter = express.Router();

adminRouter.post('/comprobarUsuario',function(req,res){
    comprobarUsuario(req,res);
});


app.use(adminRouter);


function comprobarUsuario(req,res){
    var url = "http://localhost:8010/comprobarUsuario"
    var email = req.body.email;
    var contraseña = req.body.contraseña;

    fetch(url,{
        method: 'POST',
        body: JSON.stringify({ email: email, contraseña:contraseña }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .catch(error => console.error(error));

    res.send("Correcto");

}



async function main(){
    await app.listen(6000);
    console.log('Users server is running');
}

main();