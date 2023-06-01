const app = require('./app');
const express = require('express');
const axios = require('axios');
const adminRouter = express.Router();

adminRouter.post("/coordenadas", function (req, res) {
    getCoordenadas(req.body.ciudad, res);
});

adminRouter.post("/ciudadFav", function (req, res) {
    ciudadFavorita(req.body.nombreCiudad, req.body.latitud, req.body.longitud, req.body.email);
    res.status(200).send();
});

adminRouter.post("/ciudades", function (req, res) {
    getCiudades(req.body.email, res);
})

adminRouter.post("/eliminarCiudad", function (req, res) {
    eliminarCiudad(req.body.email, req.body.ciudad);
    res.status(200).send();
})



app.use(adminRouter);

function getCiudades(email, res) {
    var url = "http://bbdd:7000/ciudades/" + email;

    axios.get(url)
        .then(function (response) {
            const data = response.data;
            res.send(data);
        });

}

function getCoordenadas(ciudad, res) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0CBgOYDw5P7ibVsmKUEW6xbUnU5zSmD4&address=" + ciudad;
    axios.get(url)
        .then(function (response) {
            const data = response.data;
            res.send(data.results[0].geometry.location);
        });
}

function ciudadFavorita(ciudad, latitud, longitud, email) {
    var url = "http://bbdd:7000/addCiudad/" + ciudad + "_" + latitud + "_" + longitud + "_" + email;
    console.log(url);
    axios.get(url);
}

function eliminarCiudad(email, ciudad) {
    var url = "http://bbdd:7000/eliminarCiudad/" + email + "_" + ciudad;
    console.log(url);
    axios.get(url);
}


async function main() {
    await app.listen(8000);
    console.log('Cities server is running');
}


main();
