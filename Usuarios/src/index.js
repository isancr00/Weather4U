const app = require('./app');
const express = require('express');
var adminRouter = express.Router();

adminRouter.post('/comprobarUsuario',function(req,res){
    comprobarUsuario(req,res);
})


app.use(adminRouter);


function comprobarUsuario(req,res){
    var url = 'http://localhost:8010/comprobarUsuario';
    console.log(req.body);
   

}



async function main(){
    await app.listen(6000);
    console.log('Users server is running');
}

main();