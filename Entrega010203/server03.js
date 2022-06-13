import fs from "fs";
import express from "express";

const app = express();

const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));

const infoBase = JSON.parse(fs.readFileSync("./productos.json", "utf-8"));

const infoDB = infoBase.map((productos) => productos);

app.get('/productos', (req, res) => {
    try {
        res.send(infoDB);
      } catch (err) {
        console.log(err);
      } 
});

const max = parseInt(infoDB.length);

const randomNumber = parseInt(Math.floor(Math.random() * max));

const randomProduct = infoDB[randomNumber];

app.get("/productoRandom", (req, res) => {
  try {
    res.send(randomProduct);
  } catch (err) {
    console.log(err);
  }
});


 
