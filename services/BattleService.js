const inquirer = require('inquirer');
const { mostrarBarraVida, colores, mostrarResultadoAtaque } = require('../utils/battleUtils');
const { crearEnemigoAleatorio } = require('../utils/enemyFactory');
const { mostrarMenuBatalla, pausa } = require('../utils/menuUtils');
const Pocion = require('../models/Pocion');

class BattleService {
    static async iniciarBatalla(jugador) {
        // Crear enemigo basado en el nivel del jugador
        const enemigo = crearEnemigoAleatorio(jugador.nivel);

        console.log(colores.red(`\n¡${enemigo.nombre} aparece!`));
        console.log(colores.gray(`Nivel ${enemigo.nivel} - ${enemigo.vida} HP`));

        let turnoJugador = true;
        let batallaActiva = true;

        while (batallaActiva && jugador.vida > 0 && enemigo.vida > 0) {
            if (turnoJugador) {
                // Turno del jugador
                console.log(colores.blue(`\n=== TURNO DE ${jugador.nombre.toUpperCase()} ===`));
                console.log(mostrarBarraVida(jugador));
                console.log(mostrarBarraVida(enemigo));

                const accion = await mostrarMenuBatalla(jugador);

                switch (accion.opcion) {
                    case 'atacar':
                        const daño = jugador.atacar(enemigo);
                        mostrarResultadoAtaque(jugador, enemigo, daño);
                        break;

                    case 'habilidad_especial':
                        let dañoHabilidad = 0;
                        if (jugador.clase === 'Guerrero') {
                            dañoHabilidad = jugador.ataquePoderoso(enemigo);
                        } else if (jugador.clase === 'Mago') {
                            dañoHabilidad = jugador.usarHabilidadEspecial(enemigo);
                        } else if (jugador.clase === 'Arquero') {
                            dañoHabilidad = jugador.disparoPreciso(enemigo);
                        }

                        if (dañoHabilidad > 0) {
                            mostrarResultadoAtaque(jugador, enemigo, dañoHabilidad, true);
                        }
                        break;

                    case 'usar_item':
                        if (jugador.inventario.length === 0) {
                            console.log(colores.yellow('No tienes items en tu inventario.'));
                            turnoJugador = true; // Permite elegir otra acción
                            continue;
                        }

                        const { indiceItem } = await inquirer.prompt([
                            {
                                type: 'list',
                                name: 'indiceItem',
                                message: 'Selecciona un item para usar:',
                                choices: jugador.inventario.map((item, i) => ({
                                    name: `${i + 1}. ${item.nombre} - ${item.descripcion}`,
                                    value: i
                                }))
                            }
                        ]);

                        jugador.usarItem(indiceItem);
                        break;

                    case 'huir':
                        if (Math.random() < 0.5) {
                            console.log(colores.green('¡Logras huir de la batalla!'));
                            batallaActiva = false;
                        } else {
                            console.log(colores.red('¡No logras huir!'));
                        }
                        break;
                }
            } else {
                // Turno del enemigo
                console.log(colores.red(`\n=== TURNO DE ${enemigo.nombre.toUpperCase()} ===`));
                console.log(mostrarBarraVida(jugador));
                console.log(mostrarBarraVida(enemigo));

                await pausa();

                const daño = enemigo.atacar(jugador);
                mostrarResultadoAtaque(enemigo, jugador, daño);
            }

            // Cambiar turno si la batalla sigue activa
            if (batallaActiva) {
                turnoJugador = !turnoJugador;
            }

            await pausa();
        }

        // Resultado de la batalla
        if (jugador.vida <= 0) {
            console.log(colores.red(`\n¡${jugador.nombre} ha sido derrotado!`));
            console.log(colores.yellow('Regresas al punto de partida...'));
            jugador.vida = jugador.vidaMaxima; // Restaurar vida

            if (jugador.clase === 'Mago') {
                jugador.descansar(); // Restaurar mana
            }
        } else if (enemigo.vida <= 0) {
            console.log(colores.green(`\n¡${enemigo.nombre} ha sido derrotado!`));

            // Otorgar experiencia
            const expGanada = enemigo.experienciaOtorgada;
            jugador.ganarExperiencia(expGanada);
            console.log(colores.yellow(`¡Ganas ${expGanada} puntos de experiencia!`));

            // Posible drop de items
            if (Math.random() < enemigo.probabilidadDrop) {
                const pocion = new Pocion('Poción de Vida', 50);
                jugador.agregarItem(pocion);
                console.log(colores.green(`¡${enemigo.nombre} soltó una ${pocion.nombre}!`));
            }
        }

        await pausa();
    }
}

module.exports = BattleService;