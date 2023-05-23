const app = require('./app');
const express = require('express');
const axios = require('axios');
const adminRouter = express.Router();

adminRouter.post("/coordenadas", function(req,res){
    getCoordenadas(req.body.ciudad,res);
});

adminRouter.post("/ciudadFav", function(req,res){
    ciudadFavorita(req.body.nombreCiudad,req.body.latitud,req.body.longitud, req.body.email);
});

adminRouter.post("/ciudades", function(req,res){
    getCiudades(req.body.email,res);
})


app.use(adminRouter);

function getCiudades(email,res){
    var url = "http://bbdd:7000/ciudades/" + email;

    axios.get(url)
    .then(function(response){
        const data = response.data;
        res.send(data);
    });

}

function getCoordenadas(ciudad, res){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0CBgOYDw5P7ibVsmKUEW6xbUnU5zSmD4&address=" + ciudad;
    axios.get(url)
    .then(function(response){
        const data = response.data;
        res.send(data.results[0].geometry.location);
    });
}

function ciudadFavorita(ciudad,longitud,latitud,email){
    var url = "http://bbdd:7000/addCiudad/" +ciudad + "_" + latitud+ "_" + longitud + "_" + email;
    console.log(url);
    axios.get(url);
}


async function main(){
    await app.listen(8000);
    console.log('Cities server is running');
}


main();
