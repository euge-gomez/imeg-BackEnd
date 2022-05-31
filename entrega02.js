import fs from "fs"

class Contenedor {

    constructor (name) {
        this.fileName = name
    };

//save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.: 

    async save(info)  {
        if (checkFileExists(this.fileName)) {
            await fs.promises.readFile(this.fileName, "utf-8")
            .then(producto => {
                let content = JSON.parse(producto);
                let lastId = content[content.length -1].id + 1;
                info.id = lastId;
                content.push(info);
                fs.promises.writeFile(this.fileName, JSON.stringify(content))})
            .catch(e => (console.error(e)));
        } else {
            info.id = 1;
            let newId = [];
            newId.push(info);
            fs.promises.writeFile(this.fileName, JSON.stringify(newId))
        }
    }

//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.: 

    async getById(id) {
        if(checkFileExists(this.fileName)) {
            try {
                let getId = await fs.promises.readFile(this.fileName, "utf-8");
                if(getId) {
                    let data = JSON.parse(data);
                    return data.find((item) => item.id == id);
                }
            }catch (err) {
                throw new Error(`No se puede obtener el Id: ${err}`)
            }
        }else {
            alert(`No esta creado el archivo en que se aloja el id que buscas`)
        }
    }

//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.: 

    async getAll() {
        if(checkFileExists(this.fileName)) {
            try {
                let getAll = await fs.promises.readFile(this.fileName, "utf-8");
                if(getAll) {
                    let data = JSON.parse(getAll);
                    return data;
                }
            }catch (err) {
                throw new Error(`No se pueden obtener todos los Id: ${err}`)
            }
        }else {
            alert(`No esta creado el archivo en que buscas tus ids`)
        }
    }

// deleteById(Number): void - Elimina del archivo el objeto con el id buscado:

    async deleteById(id) {
        if(checkFileExists(this.fileName)) {
            await fs.promises.readFile(this.fileName, "utf-8")
               .then(productos => {
                   let content = JSON.parse(productos)
                   let deleteById = content.findIndex(item => item.id == id);
                   content.splice(deleteById, 1);
                   fs.promises.writeFile(this.fileName, JSON.stringify(content))
               }).catch (error => (console.error(error))) 
        }else {
            alert(`No existe el archivo que posea ese Id`)
        }
    }

// deleteAll(): void - Elimina todos los objetos presentes en el archivo.

    async deleteAll() {
        if(checkFileExists(this.fileName)) {
            await fs.promises.unlink(this.fileName)
        }else {
            alert(`No esta creado el archivo que quiere borrar`)
        }
    }

}

async function checkFileExists(name) {
    return await fs.promises.access(name, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

const contenedor = new Contenedor("./productos.txt");
contenedor.save("Deo Roll On Todo día Invisible", 400, "https://www.natura.com.bo/sites/default/files/productos/73839.jpg")