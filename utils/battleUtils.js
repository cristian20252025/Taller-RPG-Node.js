const  colores  = require('../utils/displayUtils');

function mostrarResultadoAtaque(atacante, objetivo, daño, esHabilidad = false) {
    if (daño > 0) {
        if (esHabilidad) {
            console.log(colores.magenta(`¡${atacante.nombre} usa una habilidad especial!`));
        }
        console.log(colores.red(`¡${atacante.nombre} ataca a ${objetivo.nombre} y causa ${daño} puntos de daño!`));

        if (objetivo.vida <= 0) {
            console.log(colores.red(`¡${objetivo.nombre} ha sido derrotado!`));
        }
    } else {
        console.log(colores.yellow(`¡${atacante.nombre} ataca pero no causa daño a ${objetivo.nombre}!`));
    }
}

function calcularExperiencia(nivelEnemigo, nivelJugador) {
    const baseExp = 20;
    const exp = baseExp * nivelEnemigo;

    // Ajustar experiencia según diferencia de nivel
    const diferenciaNivel = nivelJugador - nivelEnemigo;
    if (diferenciaNivel > 0) {
        return Math.max(5, Math.floor(exp / (diferenciaNivel + 1)));
    } else if (diferenciaNivel < 0) {
        return Math.floor(exp * (1 - diferenciaNivel * 0.1));
    }

    return exp;
}

module.exports = {
    mostrarResultadoAtaque,
    calcularExperiencia
};