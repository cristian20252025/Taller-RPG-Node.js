class IUsaMagia {
    usarHabilidadEspecial(objetivo) {
        throw new Error("Método 'usarHabilidadEspecial' debe ser implementado");
    }

    tieneSuficienteMana() {
        throw new Error("Método 'tieneSuficienteMana' debe ser implementado");
    }
}

module.exports = IUsaMagia;