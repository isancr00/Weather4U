const app = require('./app');
const express = require('express');
const http = require('http');
var adminRouter = express.Router();

adminRouter.post('/comprobarUsuario',function(req,res){
    comprobarUsuario(req,res);
});

app.use(adminRouter);



function comprobarUsuario(req,res){
    
    var url = "http://localhost:8010/comprobarUsuario/" + req.body.email + "_" + req.body.contraseña;
        
    
    peticionGet(url, (error, data) => {
        if (error) {
          console.error(error);
        } else {
            console.log("Peticion realizada con exito")
            if(data == []){
                res.send("No existe");
            }else{
                res.send("Existe");
            }
        }
      });
}


function peticionGet(url, callback) {
    http.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
  
      response.on('end', () => {
        callback(null, data);
      });
  
    }).on('error', (error) => {
      callback(error, null);
    });
  }
  

  
async function main(){
    await app.listen(6000);
    console.log('Users server is running');
}

main();