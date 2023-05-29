const app = require('./app');
var express = require('express');
const https = require('https');
var adminRouter = express.Router();

adminRouter.get('/amanecerAtardecer/:coordenadas', function (req, res) {
  amanecerAtardecer(req.params.coordenadas, res);
});

adminRouter.get('/temperatura/:coordenadas', function (req, res) {
  temperatura1Dia(req.params.coordenadas, res);
});

adminRouter.get('/precipitaciones/:coordenadas', function (req, res) {
  precipitaciones1Dia(req.params.coordenadas, res);
});

adminRouter.get('/tiempoAhora/:coordenadas', function (req, res) {
  tiempoAhora(req.params.coordenadas, res);
});

adminRouter.get('/tiempo/:coordenadas', function (req, res) {
  tiempoGeneral1Semana(req.params.coordenadas, res);
});

app.use(adminRouter);

async function tiempoAhora(coordenadas, res) {
  var coordenadasSplit = coordenadas.split('_');
  var latitud = coordenadasSplit[0];
  var longitud = coordenadasSplit[1];

  const url = " https://api.open-meteo.com/v1/forecast?latitude=" + latitud + '&longitude=' + longitud + "&current_weather=true";

  peticionGet(url, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      var resultado_json = JSON.parse(data);
      var resultado = resultado_json.current_weather;
      res.send(resultado);
    }
  });
}

async function tiempoGeneral1Semana(coordenadas, res) {

  var coordenadasSplit = coordenadas.split('_');
  var latitud = coordenadasSplit[0];
  var longitud = coordenadasSplit[1];

  const url = " https://api.open-meteo.com/v1/forecast?latitude=" + latitud + '&longitude=' + longitud + "&daily=weathercode&timezone=auto";
  console.log(url);

  peticionGet(url, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      var resultado_json = JSON.parse(data);
      var resultado = resultado_json.daily.weathercode;
      res.send(resultado);
    }
  });

}


async function temperatura1Dia(coordenadas, res) {
  var coordenadasSplit = coordenadas.split('_');
  var latitud = coordenadasSplit[0];
  var longitud = coordenadasSplit[1];
  const url = " https://api.open-meteo.com/v1/forecast?latitude=" + latitud + '&longitude=' + longitud + "&hourly=temperature_2m&forecast_days=1";
  console.log(url);

  peticionGet(url, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      var resultado_json = JSON.parse(data);
      var resultado = resultado_json.hourly.temperature_2m;
      res.send(resultado);
    }
  });
}

async function precipitaciones1Dia(coordenadas, res) {
  var coordenadasSplit = coordenadas.split('_');
  var latitud = coordenadasSplit[0];
  var longitud = coordenadasSplit[1];
  const url = " https://api.open-meteo.com/v1/forecast?latitude=" + latitud + '&longitude=' + longitud + "&hourly=precipitation_probability&forecast_days=1";

  peticionGet(url, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      var resultado_json = JSON.parse(data);
      var resultado = resultado_json.hourly.precipitation_probability;
      res.send(resultado);
    }
  });

}


function peticionGet(url, callback) {
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


async function main() {
  await app.listen(3000);
  console.log('Weather server is running');
}

main();

