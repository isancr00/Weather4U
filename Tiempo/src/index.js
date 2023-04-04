const app = require('./app');
var express = require('express');
const https = require('https');
var adminRouter = express.Router();

adminRouter.get('/amanecerAtardecer/:coordenadas',function(req,res){
    console.log("Datos amanecer atardecer");
    manejadoraAmanecerAtardecer(req.params.coordenadas,res);
});

app.use(adminRouter);

async function manejadoraAmanecerAtardecer(coordenadas,res){
    var data;
    var coordenadasSplit = coordenadas.split('_');
    var latitud = coordenadasSplit[0];
    var longitud = coordenadasSplit[1];

    const url = "https://api.sunrise-sunset.org/json?lat="+ latitud +'&lng=' + longitud;
    console.log(url);   

    makeGetRequest(url, (error, data) => {
        if (error) {
          console.error(error);
        } else {
            console.log("Peticion realizada con exito")
            res.send(data);
        }
      });
    
}

function makeGetRequest(url, callback) {
  https.get(url, (response) => {
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
    await app.listen(3000);
    console.log('Server is running');
}

main();

