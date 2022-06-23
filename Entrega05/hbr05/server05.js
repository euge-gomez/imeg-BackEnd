import express, { json, urlencoded } from 'express';
import { engine } from 'express-handlebars';
const app = express();
const PORT = process.env.PORT || 8080; 

import apiProducts from './src/products.js'
const prods = new apiProducts()

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
    }

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logErrors)

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/productos', (req, res) => {
    const products = prods.getAll()
    res.render('listaProductos.hbs', {
        Products: products,
        ProductsQty: products.length
    })
})

app.post('/productos', (req, res) => {
    const product = req.body
    prods.save(product)
    res.redirect('/')
})


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))