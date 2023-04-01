const app = require('./app');
var express = require('express');
var adminRouter = express.Router()

adminRouter.get('/amanecerAtardecer/:coordenadas',function(req,res){
    console.log("Datos amanecer atardecer");
    getAmanecerAtardecer(res);
});

app.use(adminRouter);

async function getAmanecerAtardecer(res){

    
}





async function main(){
    await app.listen(3000);
    console.log('Server is running');
}

main();

