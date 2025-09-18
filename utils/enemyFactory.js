const Enemigo = require('../models/Enemigo');


function crearEnemigoAleatorio(nivelJugador) {
    // Ajustar nivel del enemigo basado en el nivel del jugador (±2 niveles)
    const nivel = Math.max(1, nivelJugador + Math.floor(Math.random() * 5) - 2);

    const enemigos = [
        {
            nombre: 'Goblin',
            vida: 30 + (nivel * 10),
            ataque: 5 + (nivel * 2),
            defensa: 2 + nivel,
            experiencia: 20 + (nivel * 5),
            dropRate: 0.3
        },
        {
            nombre: 'Orco',
            vida: 50 + (nivel * 15),
            ataque: 8 + (nivel * 3),
            defensa: 5 + (nivel * 2),
            experiencia: 30 + (nivel * 8),
            dropRate: 0.4
        },
        {
            nombre: 'Esqueleto',
            vida: 40 + (nivel * 12),
            ataque: 7 + (nivel * 2),
            defensa: 3 + nivel,
            experiencia: 25 + (nivel * 6),
            dropRate: 0.2
        },
        {
            nombre: 'Lobo Gigante',
            vida: 35 + (nivel * 8),
            ataque: 10 + (nivel * 3),
            defensa: 1 + nivel,
            experiencia: 22 + (nivel * 7),
            dropRate: 0.3
        },
        {
            nombre: 'Troll',
            vida: 80 + (nivel * 20),
            ataque: 12 + (nivel * 4),
            defensa: 8 + (nivel * 2),
            experiencia: 40 + (nivel * 10),
            dropRate: 0.5
        }
    ];

    const enemigoData = enemigos[Math.floor(Math.random() * enemigos.length)];

    return new Enemigo(
        enemigoData.nombre,
        nivel,
        enemigoData.vida,
        enemigoData.ataque,
        enemigoData.defensa,
        enemigoData.experiencia,
        enemigoData.dropRate
    );
}

module.exports = {
    crearEnemigoAleatorio
};