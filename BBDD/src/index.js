const app = require('./app');
var express = require('express');
var adminRouter = express.Router();

adminRouter.post('/insertar/:datos', function(req,res){
    res.send("Insertada")
    console.log(req.params.datos)
    /*insertarCiudad(req.params.datos)*/
})

app.use(adminRouter);
async function main(){
    await app.listen(4000);
    console.log('App server is running');
}

main();

