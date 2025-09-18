const Item = require('./Item');

class Inmunidad extends Item {
    constructor() {
        super('Poción de Inmunidad', 'Te otorga inmunidad por un solo ataque.', 'inmunidad');
    }

    usar(personaje) {
        personaje.setInmunidad(true);
        console.log(`${personaje.nombre} usa una Poción de Inmunidad. ¡Estás a salvo del próximo ataque!`);
        return true;
    }

    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            tipo: this.tipo
        };
    }
}

module.exports = Inmunidad;