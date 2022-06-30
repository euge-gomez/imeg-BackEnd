import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 8080; 

import Products from './src/products.js';
const productos = new Products();
import Mensajes from './src/messages.js';
const mensajes = new Mensajes('messages.json');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: import.meta.url })
})

io.on('connection', async (socket) => {
    console.log('Usuario conectado')

    // PRODUCTOS
    socket.emit('productos', productos.getAll())

    socket.on('actualizar', producto => {
        productos.save(producto)
        io.sockets.emit('productos', productos.getAll())
    })
    
    // MENSAJES
    socket.emit('mensajes', await mensajes.getAll())

    socket.on('mensajeNuevo', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajes.save(mensaje)
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
})

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))