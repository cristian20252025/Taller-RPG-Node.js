const { showWelcomeScreen } = require('../utils/displayUtils');
const { crearPersonaje, cargarPersonajes, guardarPersonajes, seleccionarPersonaje } = require('./CharacterService');
const { iniciarBatalla } = require('./BattleService');
const { mostrarMenuPrincipal, mostrarMenuPersonaje, pausa } = require('../utils/menuUtils');

class GameService {
    static async startGame() {
        await showWelcomeScreen();
        
        let personajes = await cargarPersonajes();
        let salir = false;

        while (!salir) {
            const respuesta = await mostrarMenuPrincipal();
            
            switch (respuesta.opcion) {
                case '1':
                    const nuevoPersonaje = await crearPersonaje();
                    if (nuevoPersonaje) {
                        personajes.push(nuevoPersonaje);
                        await guardarPersonajes(personajes);
                        console.log('\x1b[32m¡Personaje creado con éxito!\x1b[0m');
                    }
                    await pausa();
                    break;
                    
                    case '2':
                        console.clear();
                        console.log('\x1b[34m=== TUS PERSONAJES ===\x1b[0m');
                    
                        // 🔹 Volvemos a leer el archivo para asegurar que están todos los personajes guardados
                        personajes = await cargarPersonajes();
                    
                        if (personajes.length === 0) {
                            console.log('\x1b[33mNo hay personajes creados.\x1b[0m');
                        } else {
                            personajes.forEach((p, i) => {
                                console.log(`\x1b[37m${i + 1}. ${p.nombre} (Nivel ${p.nivel} ${p.clase}) - ${p.vida}/${p.vidaMaxima} HP\x1b[0m`);
                            });
                        }
                        await pausa();
                        break;
                    
                    
                        case '3':
                            if (personajes.length === 0) {
                                console.log('\x1b[33mNo hay personajes creados.\x1b[0m');
                                await pausa();
                            } else {
                                const personaje = await seleccionarPersonaje(personajes);
                                if (personaje) {
                                    console.clear();
                                    console.log(`\x1b[34m=== ESTADÍSTICAS DE ${personaje.nombre.toUpperCase()} ===\x1b[0m`);
                                    console.log(`\x1b[37mClase: ${personaje.clase}`);
                                    console.log(`Nivel: ${personaje.nivel}`);
                                    console.log(`Experiencia: ${personaje.experiencia}/${personaje.experienciaParaSubir}`);
                                    console.log(`Vida: ${personaje.vida}/${personaje.vidaMaxima}`);
                                    console.log(`Ataque: ${personaje.ataque}`);
                                    console.log(`Defensa: ${personaje.defensa}`);
                        
                                    // 🔹 Mostrar atributos especiales según la clase
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
                        
                                    // 🔹 Mostrar habilidades
                                    console.log('\nHabilidades:');
                                    if (personaje.habilidades.length > 0) {
                                        personaje.habilidades.forEach(habilidad => {
                                            console.log(`- ${habilidad}`);
                                        });
                                    } else {
                                        console.log('Ninguna');
                                    }
                        
                                    // 🔹 Mostrar inventario
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
                        console.log('\x1b[33mNo hay personajes creados. Crea al menos uno primero.\x1b[0m');
                        await pausa();
                    } else {
                        const personaje = await seleccionarPersonaje(personajes);
                        if (personaje) {
                            await iniciarBatalla(personaje);
                            await guardarPersonajes(personajes);
                        }
                    }
                    break;
                    
                case '5':
                    salir = true;
                    console.log('\x1b[34m¡Hasta pronto!\x1b[0m');
                    break;
                    
                default:
                    console.log('\x1b[33mOpción no válida.\x1b[0m');
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
                    console.log(`\x1b[34m=== ESTADÍSTICAS DE ${personaje.nombre.toUpperCase()} ===\x1b[0m`);
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
                        console.log(`\x1b[34m=== INVENTARIO DE ${personaje.nombre.toUpperCase()} ===\x1b[0m`);
                    
                        if (personaje.inventario.length === 0) {
                            console.log('\x1b[33mEl inventario está vacío.\x1b[0m');
                        } else {
                            personaje.inventario.forEach((item, i) => {
                                console.log(`\x1b[37m${i + 1}. ${item.nombre} - ${item.descripcion}\x1b[0m`);
                            });
                    
                            const respuesta = await require('../utils/inputHandler').question('\n¿Quieres usar algún item? (s/n): ');
                            if (respuesta.toLowerCase() === 's') {
                                const itemIndex = await require('../utils/inputHandler').question('Selecciona un item para usar: ');
                                const index = parseInt(itemIndex) - 1;
                    
                                if (index >= 0 && index < personaje.inventario.length) {
                                    personaje.usarItem(index);
                                    await guardarPersonajes(personajes);
                                    console.log('\x1b[32m¡Item usado con éxito!\x1b[0m');
                                } else {
                                    console.log('\x1b[33mSelección no válida.\x1b[0m');
                                }
                            }
                        }
                    
                        await pausa();
                        break;
                    
                    
                case '3':
                    volver = true;
                    break;
                    
                default:
                    console.log('\x1b[33mOpción no válida.\x1b[0m');
                    await pausa();
            }
        }
    }
}

module.exports = GameService;