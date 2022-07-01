const socket = io.connect()

// PRODUCTOS
const agregarProducto = document.getElementById('agregarProducto')
agregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        product: agregarProducto[0].value,
        price: agregarProducto[1].value,
        thumbnail: agregarProducto[2].value
    }
    socket.emit('actualizar', producto)
    agregarProducto.reset()
})

socket.on('productos', productos => {
    vistaTabla(productos).then(html => {
        document.getElementById('listadoProductos').innerHTML = html
    })
})

async function vistaTabla(productos) {
    return await fetch('listaProductos.hbs')
    .then(res => res,text())
    .then(resp => {
        const plantilla = Handlebars.compile(resp)
        const html = plantilla({
        Products: productos,
        ProductsQty: productos.length
        })
        return html
    })    
}

// MENSAJES
const userName = document.getElementById('userName')
const textoUser = document.getElementById('textoUser')
const botonMensaje = document.getElementById('botonEnvio')

const imprimirMensajes = document.getElementById('formMensajes')
imprimirMensajes.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        user: userName.value,
        msg: textoUser.value
    }
    socket.emit('mensajeNuevo', mensaje)
    imprimirMensajes.reset()
    textoUser.focus()
})

socket.on('mensajes', mensajes => {
    const html = contenedorMensajes(mensajes)
    document.getElementById('contenedorMensajes').innerHTML = html
})

function contenedorMensajes(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.user}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.msg}</i>
            </div>
        `)
    }).join(" ")
}

userName.addEventListener('input', () => {
    const usuario = userName.value.length
    const mensaje = textoUser.value.length
    userName.disabled = !usuario
    botonMensaje.disabled = !usuario || !mensaje
})

textoUser.addEventListener('input', () => {
    const mensaje = textoUser.value.length
    botonMensaje.disabled = !mensaje 
})