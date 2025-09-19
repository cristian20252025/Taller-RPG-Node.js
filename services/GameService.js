const { showWelcomeScreen } = require('../utils/displayUtils');
const CharacterService = require('./CharacterService');
const { iniciarBatalla } = require('./BattleService');
const { mostrarMenuPrincipal, mostrarMenuPersonaje, pausa } = require('../utils/menuUtils');
const colores = require('../utils/colors');

class GameService {
    static async startGame() {
        await showWelcomeScreen();
        
        let personajes = await CharacterService.cargarPersonajes();
        let salir = false;

        while (!salir) {
            const respuesta = await mostrarMenuPrincipal();
            
            switch (respuesta.opcion) {
                case '1':
                    const nuevoPersonaje = await CharacterService.crearPersonaje();
                    if (nuevoPersonaje) {
                        personajes.push(nuevoPersonaje);
                        await CharacterService.guardarPersonajes(personajes);
                        console.log(colores.green('¡Personaje creado con éxito!'));
                    }
                    await pausa();
                    break;
                    
                case '2':
                    console.clear();
                    console.log(colores.blue('=== TUS PERSONAJES ==='));
                    
                    // Se elimina la recarga de personajes aquí para evitar problemas
                    // personajes = await CharacterService.cargarPersonajes();
                    
                    if (personajes.length === 0) {
                        console.log(colores.yellow('No hay personajes creados.'));
                    } else {
                        personajes.forEach((p, i) => {
                            console.log(`\x1b[37m${i + 1}. ${p.nombre} (Nivel ${p.nivel} ${p.clase}) - ${p.vida}/${p.vidaMaxima} HP\x1b[0m`);
                        });
                    }
                    await pausa();
                    break;
                    
                case '3':
                    if (personajes.length === 0) {
                        console.log(colores.yellow('No hay personajes creados.'));
                        await pausa();
                    } else {
                        const personaje = await CharacterService.seleccionarPersonaje(personajes);
                        if (personaje) {
                            console.clear();
                            console.log(colores.blue(`=== ESTADÍSTICAS DE ${personaje.nombre.toUpperCase()} ===`));
                            console.log(`\x1b[37mClase: ${personaje.clase}`);
                            console.log(`Nivel: ${personaje.nivel}`);
                            console.log(`Experiencia: ${personaje.experiencia}/${personaje.experienciaParaSubir}`);
                            console.log(`Vida: ${personaje.vida}/${personaje.vidaMaxima}`);
                            console.log(`Ataque: ${personaje.ataque}`);
                            console.log(`Defensa: ${personaje.defensa}`);
                        
                            if (personaje.clase === 'Guerrero') {
                                console.log(`Fuerza: ${personaje.fuerza}`);
                                console.log(`Ira: ${personaje.ira}/20`);
                            } else if (personaje.clase === 'Mago') {
                                console.log(`Inteligencia: ${personaje.inteligencia}`);
                                console.log(`Mana: ${personaje.mana}/${personaje.manaMaximo}`);
                            } else if (personaje.clase === 'Arquero') {
                                console.log(`Destreza: ${personaje.destreza}`);
                                console.log(`Precisión: ${personaje.precision}%`);
                            }
                        
                            console.log('\nHabilidades:');
                            if (personaje.habilidades.length > 0) {
                                personaje.habilidades.forEach(habilidad => {
                                    console.log(`- ${habilidad}`);
                                });
                            } else {
                                console.log('Ninguna');
                            }
                        
                            console.log('\nInventario:');
                            if (personaje.inventario.length > 0) {
                                personaje.inventario.forEach((item, i) => {
                                    console.log(`${i + 1}. ${item.nombre} - ${item.descripcion}`);
                                });
                            } else {
                                console.log('Vacío');
                            }
                        
                            await pausa();
                        }
                    }
                    break;
                    
                case '4':
                    if (personajes.length === 0) {
                        console.log(colores.yellow('No hay personajes creados. Crea al menos uno primero.'));
                        await pausa();
                    } else {
                        const personaje = await CharacterService.seleccionarPersonaje(personajes);
                        if (personaje) {
                            await iniciarBatalla(personaje);
                            await CharacterService.guardarPersonajes(personajes);
                        }
                    }
                    break;
                
                case '5':
                    if (personajes.length === 0) {
                        console.log(colores.yellow('No hay personajes para eliminar.'));
                        await pausa();
                    } else {
                        const personajeAEliminar = await CharacterService.seleccionarPersonaje(personajes);
                        await CharacterService.eliminarPersonaje(personajes, personajeAEliminar);
                        personajes = await CharacterService.cargarPersonajes(); // Recargar la lista de personajes
                    }
                    await pausa();
                    break;
                
                case '6':
                    salir = true;
                    console.log(colores.blue('¡Hasta pronto!'));
                    break;
                    
                default:
                    console.log(colores.yellow('Opción no válida.'));
                    await pausa();
            }
        }
    }

    static async #gestionarPersonaje(personaje, personajes) {
        let volver = false;
        
        while (!volver) {
            const respuesta = await mostrarMenuPersonaje(personaje);
            
            switch (respuesta.opcion) {
                case '1':
                    console.clear();
                    console.log(colores.blue(`=== ESTADÍSTICAS DE ${personaje.nombre.toUpperCase()} ===`));
                    console.log(`\x1b[37mClase: ${personaje.clase}`);
                    console.log(`Nivel: ${personaje.nivel}`);
                    console.log(`Experiencia: ${personaje.experiencia}/${personaje.experienciaParaSubir}`);
                    console.log(`Vida: ${personaje.vida}/${personaje.vidaMaxima}`);
                    console.log(`Ataque: ${personaje.ataque}`);
                    console.log(`Defensa: ${personaje.defensa}`);
                    
                    if (personaje.clase === 'Guerrero') {
                        console.log(`Fuerza: ${personaje.fuerza}`);
                        console.log(`Ira: ${personaje.ira}/20`);
                    } else if (personaje.clase === 'Mago') {
                        console.log(`Inteligencia: ${personaje.inteligencia}`);
                        console.log(`Mana: ${personaje.mana}/${personaje.manaMaximo}`);
                    } else if (personaje.clase === 'Arquero') {
                        console.log(`Destreza: ${personaje.destreza}`);
                        console.log(`Precisión: ${personaje.precision}%`);
                    }
                    
                    console.log('\nHabilidades:');
                    personaje.habilidades.forEach(habilidad => {
                        console.log(`- ${habilidad}`);
                    });
                    await pausa();
                    break;
                    
                case '2':
                    console.clear();
                    console.log(colores.blue(`=== INVENTARIO DE ${personaje.nombre.toUpperCase()} ===`));
                    
                    if (personaje.inventario.length === 0) {
                        console.log(colores.yellow('El inventario está vacío.'));
                    } else {
                        personaje.inventario.forEach((item, i) => {
                            console.log(`\x1b[37m${i + 1}. ${item.nombre} - ${item.descripcion}\x1b[0m`);
                        });
                    
                        const respuesta = await inputHandler.question('\n¿Quieres usar algún item? (s/n): ');
                        if (respuesta.toLowerCase() === 's') {
                            const itemIndex = await inputHandler.question('Selecciona un item para usar: ');
                            const index = parseInt(itemIndex) - 1;
                    
                            if (index >= 0 && index < personaje.inventario.length) {
                                personaje.usarItem(index);
                                await CharacterService.guardarPersonajes(personajes);
                                console.log(colores.green('¡Item usado con éxito!'));
                            } else {
                                console.log(colores.yellow('Selección no válida.'));
                            }
                        }
                    }
                    
                    await pausa();
                    break;
                    
                case '3':
                    volver = true;
                    break;
                    
                default:
                    console.log(colores.yellow('Opción no válida.'));
                    await pausa();
            }
        }
    }
}

module.exports = GameService;