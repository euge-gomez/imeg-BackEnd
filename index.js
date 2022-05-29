// Entrega 01 
//Definición de Clase Usuario con sus metodos y datos

class Usuario {
    constructor (nombre, apellido) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = [],
        this.mascotas = []
    }
    getFullName() {return alert(`Nombre completo: ${this.nombre}, ${this.apellido}`);}
    addMascota(newPet) {return this.mascotas.push(newPet)}
    countMascotas() {return alert(this.mascotas.length)}
    addBook(nombre, autor) {return this.libros.push({"nombre": nombre, "autor": autor})}
    getBookNames() {
        if(this.libros.length){
            let bookNames = this.libros.map(item => item.nombre)
            console.log("Tus libros se llaman" + bookNames)
        }else { alert("No hay libros para este usuario")}
    }
}

// Creación de Usuarios

let usuario01 = new Usuario ("Tomás", "Marconetto");

console.log(usuario01.getFullName());

usuario01.addMascota("Araña");
usuario01.addMascota("Boa Constrictor");
console.log(usuario01.countMascotas());

usuario01.addBook("Cien Años de Soledad", "García Márquez");
usuario01.addBook("May we be forgiven", "A.M. Holmes");
console.log(usuario01.getBookNames());

console.log(usuario01)
