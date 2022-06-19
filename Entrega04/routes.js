import express from 'express';
const { Router } = express

const router = Router();

let productos = [];

router
    .route('/')
// GET '/api/productos' -> devuelve todos los productos.
    .get((req, res) => {
        try {
            res.status(200).json({
            ok: true,
            productos,
            });
        }catch (e) {
            res.status(480).json({
                ok: false,
                error: e.message,
            });
        }
    })
 // POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
    .post((req, res) => {
    let newProducto = req.body;
    let id = 0;
    try {
        productos.push(newProducto);
        productos.forEach((e) => {
            if (e.id > id) {
                id = e.id;
            }
        });
        newProducto.id = id + 1;
        res.json({newProducto});
    } catch (error) {
        throw new Error (`No se pudo guardar el producto: ${error}`)
    };
    });
 
// GET '/api/productos/:id' -> devuelve un producto según su id.
    router
    .route('/:id')
    .get((req, res) => {
        let prodId = req.params.id;
            if (isNaN(prodId)) {
                res.json({ error: "El id debe ser un número"})
            }if (prodId === undefined) {
                res.json({ error : 'Producto no encontrado' })
            }let productoEncontrado = productos.find(x => x.id === Number(prodId))
            res.json({ productoEncontrado  })
    })
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
    .put((req, res) => {
        let prodId = req.params.id;
            if (isNaN(prodId)) {
                res.json({ error: "El id debe ser un número"})
            }if (prodId === undefined) {
                res.json({ error : 'Producto no encontrado' })
            }let productoEncontrado = productos.find(x => x.id === Number(prodId))
            productoEncontrado.title = req.body.title;
            productoEncontrado.price = req.body.price;
            productoEncontrado.thumbnail = req.body.thumbnail;
            productoEncontrado.id = prodId;
    })
  // DELETE '/api/productos/:id' -> elimina un producto según su id..
    .delete((req, res) => {
        let prodId = req.params.id;
            if (isNaN(prodId)) {
                res.json({ error: "El id debe ser un número"})
            }if (prodId === undefined) {
                res.json({ error : 'Producto no encontrado' })
            } let productosRemanentes = productos.filter(x => x != Number(prodId))
            res.json({
                acción: `Producto borrado id nro: ${prodId}`,
                productos: productosRemanentes
                })
    })

 export default router;