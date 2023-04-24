const app = require('./app');
async function main(){
    await app.listen(5000);
    console.log('App server is running');
}

main();