const app = require('./app');
const express = require('express');
const axios = require('axios');
const adminRouter = express.Router();

adminRouter.post("/coordenadas", function(req,res){
    getCoordenadas(req.body.ciudad,res);
});


app.use(adminRouter);

function getCoordenadas(ciudad, res){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0CBgOYDw5P7ibVsmKUEW6xbUnU5zSmD4&address=" + ciudad;
    axios.get(url)
    .then(function(response){
        const data = response.data;
        res.send(data.results[0].geometry.location);


    });
}


async function main(){
    await app.listen(8000);
    console.log('Cities server is running');
}


main();
