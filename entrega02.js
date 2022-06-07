import fs from "fs"

const infoBase = fs.readFile("./infoProductos.json", "utf-8", function(err, data){
    console.log(data);
    console.error(err);
})

class Contenedor {

    constructor (name) {
        this.fileName = name
    };

//save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.: 

    async save(info)  {
       const id = 0;
       try {
           const infoBD = JSON.parse(fs.promises.readFile("./infoProductos.json", "utf-8"));
           let productos = infoBD;
           productos.push(info);
           productos.forEach((producto) => {
               if (producto.id > id) {
                   id = producto.id;
               }
           });
           info.id = id + 1;
           await fs.promises.writeFile("./productos.json", JSON.stringify(productos, null, 2));
       } catch (error) {
           throw new Error (`No se pudo guardar el archivo: ${error}`)
       }
    }

//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.: 

    async getById(id) {
        try {
            let getId = await fs.promises.readFile("./productos.json", "utf-8");
            this.fileName = getId;
            let producto = this.fileName.filter((producto) => producto.id === id);
            if(producto) {
               console.log(producto)
            } else {
                console.error("No existe producto buscado")
            }
        }catch (err) {
            throw new Error(`No se puede obtener el Id: ${err}`)
        }
    }

//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.: 

    async getAll() {
        try {
            let getAll = await fs.promises.readFile("./producto.json", "utf-8");
            let productos = getAll
            if(productos.length) {
                let allProducts = productos.localeCompare((producto) => producto);
                console.log(allProducts);
            }else {
                console.error("No hay productos cargados")
            }
        }catch (err) {
            throw new Error(`No se pueden obtener todos los productos: ${err}`)
        }
    }

// deleteById(Number): void - Elimina del archivo el objeto con el id buscado:

    async deleteById(id) {
        try {
            const info = JSON.parse(await fs.promises.readFile("./productos.json", "utf-8"));
            this.fileName = info;
            let producto = this.fileName.filter((producto) => producto.id === id);
            if(producto) {
                this.fileName.delete(producto);
                console.log(`Se ha eliminado el producto identificado con ${id} de la base de productos`)
            } else {
                console.error("No existe el producto buscado")
            }
        }catch (err) {
            throw new Error(`No pudo borrarse el producto: ${err}`);
        }           
    }

// deleteAll(): void - Elimina todos los objetos presentes en el archivo.

    async deleteAll() {
        const info = JSON.parse(await fs.promises.readFile("./productos.json", "utf-8"));
        if(info.length) {
            const baseProductos = info.map((producto) => producto);
            this.fileName.delete(baseProductos);
        }else {
            alert(`No hay productos`)
        }
    }
}

const contendor = new Contenedor(infoBase);

const producto01 = {
    "title": "Deo Roll On Todo día Invisible",
    "price": 400,
    "thumbnail": "https://www.natura.com.bo/sites/default/files/productos/73839.jpg"
}

await contendor.save(producto01)

