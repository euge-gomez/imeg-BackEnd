    // PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
    // DELETE '/api/productos/:id' -> elimina un producto según su id.


import express from 'express';
const { Router } = express

const router = Router();

let productos = [];

router
    .route('/productos')
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
router
    .route('/productos/:id')
// GET '/api/productos/:id' -> devuelve un producto según su id.
    .get((res, req) => {
        let prodId = Number(req.params.id);
        console.log(prodId)
            if (isNaN(prodId)) {
                res.json({ error: "El id debe ser un número"})
            }if (prodId === undefined) {
                res.json({ error : 'Producto no encontrado' })
            }let productoEncontrado = productos.find(x => x.id === prodId)
            res.json({ productoEncontrado  })
    })



 export default router;