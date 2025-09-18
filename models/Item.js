class Item {
    #nombre;
    #descripcion;
    #tipo;
    #consumible;

    constructor(nombre, descripcion, tipo, consumible = true) {
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#tipo = tipo;
        this.#consumible = consumible;
    }

    // Getters
    get nombre() { return this.#nombre; }
    get descripcion() { return this.#descripcion; }
    get tipo() { return this.#tipo; }
    get consumible() { return this.#consumible; }

    // Método para usar el item (debe ser sobrescrito)
    usar(personaje) {
        throw new Error("Método 'usar' debe ser implementado");
    }

    // Método para serialización
    toJSON() {
        return {
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            tipo: this.#tipo,
            consumible: this.#consumible
        };
    }
}

module.exports = Item;