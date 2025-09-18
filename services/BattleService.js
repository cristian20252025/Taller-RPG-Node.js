const inquirer = require('inquirer');
const { mostrarResultadoAtaque } = require('../utils/battleUtils');
const { mostrarBarraVida } = require('../utils/displayUtils');
const { crearEnemigoAleatorio } = require('../utils/enemyFactory');
const { mostrarMenuBatalla, pausa } = require('../utils/menuUtils');
const Pocion = require('../models/Pocion');
const Inmunidad = require('../models/Inmunidad');
const inputHandler = require('../utils/inputHandler');
const colores = require('../utils/colors');

class BattleService {
    static async iniciarBatalla(jugador) {
        // Crear enemigo aleatorio según nivel
        const enemigo = crearEnemigoAleatorio(jugador.nivel);

        console.log(colores.red(`\n¡${enemigo.nombre} aparece!`));
        console.log(colores.gray(`Nivel ${enemigo.nivel} - ${enemigo.vida} HP`));

        let turnoJugador = true;
        let batallaActiva = true;

        while (batallaActiva) {
            console.clear();
            console.log(mostrarBarraVida(jugador));
            console.log(mostrarBarraVida(enemigo));

            if (turnoJugador) {
                const { opcion } = await mostrarMenuBatalla(jugador);
                let accionValida = false;

                switch (opcion) {
                    case '1':
                        // Atacar
                        const daño = jugador.atacar(enemigo);
                        mostrarResultadoAtaque(jugador, enemigo, daño);
                        accionValida = true;
                        break;
                    case '2':
                        // Habilidad especial
                        let dañoHabilidad;
                        if (jugador.clase === 'Guerrero') {
                            dañoHabilidad = jugador.ataquePoderoso(enemigo);
                        } else if (jugador.clase === 'Mago') {
                            dañoHabilidad = jugador.usarHabilidadEspecial(enemigo);
                        } else if (jugador.clase === 'Arquero') {
                            dañoHabilidad = jugador.disparoPreciso(enemigo);
                        }
                        mostrarResultadoAtaque(jugador, enemigo, dañoHabilidad, true);
                        if (dañoHabilidad > 0 || jugador.clase === 'Arquero') {
                            accionValida = true;
                        }
                        break;
                    case '3':
                        // Usar item
                        console.clear();
                        console.log(colores.blue(`=== INVENTARIO DE ${jugador.nombre.toUpperCase()} ===`));
                        
                        const inventario = jugador.inventario;

                        if (inventario.length === 0) {
                            console.log(colores.yellow('Tu inventario está vacío.'));
                            await pausa();
                            break;
                        }

                        const itemChoices = inventario.map((item, index) => ({
                            name: `${index + 1}. ${item.nombre} - ${item.descripcion}`, // <-- Corrección aquí
                            value: index
                        }));

                        const { itemIndex } = await inquirer.prompt([
                            {
                                type: 'list',
                                name: 'itemIndex',
                                message: 'Selecciona un item para usar:',
                                choices: itemChoices
                            }
                        ]);

                        if (jugador.usarItem(itemIndex)) {
                            console.log(colores.green(`¡Item ${inventario[itemIndex].nombre} usado con éxito!`));
                            accionValida = true;
                        } else {
                            console.log(colores.yellow('No se pudo usar el item.'));
                        }
                        await pausa();
                        break;
                    case '4':
                        // Huir
                        console.log(colores.yellow('Huyes de la batalla.'));
                        return;
                    default:
                        console.log(colores.yellow('Opción no válida.'));
                        await pausa();
                }

                if (enemigo.vida <= 0) {
                    batallaActiva = false;
                } else if (accionValida) {
                    turnoJugador = false;
                }
            } else {
                // Turno del enemigo
                console.log(colores.gray(`\nTurno de ${enemigo.nombre}...`));
                await pausa();

                const daño = enemigo.atacar(jugador);
                mostrarResultadoAtaque(enemigo, jugador, daño);
                await pausa();

                if (jugador.vida <= 0) {
                    batallaActiva = false;
                } else {
                    turnoJugador = true;
                }
            }
        }

        // --- RESULTADO DE LA BATALLA ---
        if (jugador.vida <= 0) {
            console.log(colores.red(`\n💀 ¡${jugador.nombre} ha sido derrotado!`));
            console.log(colores.yellow('Regresas al punto de partida...'));
            jugador.vida = jugador.vidaMaxima; // Revivir con vida completa

            if (jugador.clase === 'Mago') {
                jugador.descansar(); // Restaurar maná
            }
        } else if (enemigo.vida <= 0) {
            console.log(colores.green(`\n🏆 ¡${enemigo.nombre} ha sido derrotado!`));

            // Ganar experiencia
            const expGanada = enemigo.experienciaOtorgada;
            jugador.ganarExperiencia(expGanada);
            console.log(colores.yellow(`✨ Ganas ${expGanada} puntos de experiencia.`));

            // Posible drop de ítem
            if (Math.random() < enemigo.probabilidadDrop) {
                const pocion = new Pocion('Poción de Vida', 50);
                jugador.agregarItem(pocion);
                console.log(colores.green(`🎁 ${enemigo.nombre} soltó una ${pocion.nombre}. ¡La agregas a tu inventario!`));
            }
        }
        await pausa();
    }
}

module.exports = BattleService;