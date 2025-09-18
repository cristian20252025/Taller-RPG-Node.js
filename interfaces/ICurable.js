class ICurable {
    curar(cantidad) {
        throw new Error("Método 'curar' debe ser implementado");
    }
}

module.exports = ICurable;