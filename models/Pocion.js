const Item = require('./Item');

class Pocion extends Item {
    #curacion;

    constructor(nombre, curacion) {
        super(nombre, `Restaura ${curacion} puntos de vida`, 'pocion');
        this.#curacion = curacion;
    }

    usar(personaje) {
        personaje.curar(this.#curacion);
        console.log(`${personaje.nombre} usa ${this.nombre} y recupera ${this.#curacion} puntos de vida.`);
        return true;
    }

    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            curacion: this.#curacion
        };
    }

    static fromJSON(data) {
        return new Pocion(data.nombre, data.curacion);
    }
}

module.exports = Pocion;