class IAtaque {
    atacar(objetivo) {
        throw new Error("Método 'atacar' debe ser implementado");
    }
}

module.exports = IAtaque;