import express from 'express';
import router from './routes.js';

const Port = 8081

const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', router);

const server = app.listen(Port, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 });
 
server.on("error", error => console.log(`Error en servidor ${error}`));