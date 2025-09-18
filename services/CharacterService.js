const fs = require('fs').promises;
const path = require('path');
const inputHandler = require('../utils/inputHandler');
const RUTA_ARCHIVO = path.resolve(__dirname, '../data/savedData.json');

async function asegurarDirectorio() {
    const directorio = path.dirname(RUTA_ARCHIVO);
    if (!fs.existsSync(directorio)) {
        await fs.mkdir(directorio, { recursive: true });
        console.log('\x1b[32mDirectorio creado con éxito!\x1b[0m', directorio);
    }
}

class CharacterService {
    static async crearPersonaje() {
        return new Promise(async (resolve) => {
            console.clear();
            console.log('\x1b[34m=== CREAR PERSONAJE ===\x1b[0m\n');
            
            // Usar readline de forma temporal
            const tempRl = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const nombre = await new Promise((resolveNombre) => {
                tempRl.question('¿Cómo se llamará tu personaje? ', resolveNombre);
            });

            console.log('\nSelecciona la clase:');
            console.log('1. Guerrero (Alta vida, alto ataque)');
            console.log('2. Mago (Baja vida, alto daño mágico)');
            console.log('3. Arquero (Daño consistente, ataques dobles)');
            
            const claseOp = await new Promise((resolveClase) => {
                tempRl.question('Opción: ', resolveClase);
            });

            // CERRAR la instancia temporal inmediatamente
            tempRl.close();

            let personaje;
            const Guerrero = require('../models/guerreros');
            const Mago = require('../models/Mago');
            const Arquero = require('../models/Arquero');
            const Pocion = require('../models/Pocion');

            switch (claseOp) {
                case '1':
                    personaje = new Guerrero(nombre);
                    break;
                case '2':
                    personaje = new Mago(nombre);
                    break;
                case '3':
                    personaje = new Arquero(nombre);
                    break;
                default:
                    console.log('\x1b[33mOpción no válida, creando Guerrero por defecto.\x1b[0m');
                    personaje = new Guerrero(nombre);
            }

            personaje.agregarItem(new Pocion('Poción de Vida Pequeña', 30));
            personaje.agregarItem(new Pocion('Poción de Vida Pequeña', 30));

            console.log(`\x1b[32m¡${personaje.nombre} el ${personaje.clase} ha sido creado!\x1b[0m`);
            resolve(personaje);
        });
    }


    static async cargarPersonajes() {
        try {
            const data = await fs.readFile(RUTA_ARCHIVO, 'utf8');
            const jsonData = JSON.parse(data);
            
            console.log('\x1b[36mPersonajes cargados del archivo:\x1b[0m', jsonData.personajes.length);
            
            const Personaje = require('../models/personajes');
            return jsonData.personajes.map(p => Personaje.fromJSON(p));
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('\x1b[33mNo se encontró archivo de guardado, empezando desde cero.\x1b[0m');
                return [];
            }
            console.log('\x1b[31mError cargando personajes:\x1b[0m', error.message);
            return [];
        }
    }

        

static async guardarPersonajes(personajes) {
    try {
        console.log('\x1b[36mGuardando personajes...\x1b[0m');
        
        // Leer personajes existentes primero
        let todosLosPersonajes = [];
        try {
            const datos = await fs.readFile(RUTA_ARCHIVO, 'utf8');
            todosLosPersonajes = JSON.parse(datos).personajes || [];
            console.log('\x1b[36mPersonajes existentes cargados:\x1b[0m', todosLosPersonajes.length);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('\x1b[33mNo existe archivo previo, creando nuevo.\x1b[0m');
            } else {
                console.log('\x1b[33mError leyendo archivo, empezando desde cero:\x1b[0m', error.message);
            }
        }

        // Convertir los nuevos personajes a JSON
        const nuevosPersonajesJSON = personajes.map(p => p.toJSON());
        
        // Combinar y eliminar duplicados por ID
        const personajesActualizados = [...todosLosPersonajes];
        
        nuevosPersonajesJSON.forEach(nuevoPersonaje => {
            const indiceExistente = personajesActualizados.findIndex(p => p.id === nuevoPersonaje.id);
            
            if (indiceExistente !== -1) {
                // Reemplazar personaje existente
                personajesActualizados[indiceExistente] = nuevoPersonaje;
                console.log('\x1b[33mPersonaje actualizado:\x1b[0m', nuevoPersonaje.nombre);
            } else {
                // Agregar nuevo personaje
                personajesActualizados.push(nuevoPersonaje);
                console.log('\x1b[32mNuevo personaje agregado:\x1b[0m', nuevoPersonaje.nombre);
            }
        });

        // Guardar todo el array actualizado
        const data = {
            personajes: personajesActualizados,
            ultimaActualizacion: new Date().toISOString()
        };
        
        await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(data, null, 4));
        console.log('\x1b[32m¡Archivo guardado exitosamente! Total personajes:\x1b[0m', personajesActualizados.length);
        
    } catch (error) {
        console.log('\x1b[31mError guardando personajes:\x1b[0m', error.message);
    }
}
    
static async agregarPersonaje(nuevoPersonaje) {
    try {
        console.log('\x1b[36mAgregando nuevo personaje...\x1b[0m');
        
        // Leer personajes existentes
        let data = { personajes: [] };
        try {
            const datos = await fs.readFile(RUTA_ARCHIVO, 'utf8');
            data = JSON.parse(datos);
            console.log('\x1b[36mPersonajes existentes:\x1b[0m', data.personajes.length);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('\x1b[33mCreando nuevo archivo de guardado.\x1b[0m');
            }
        }

        // Agregar el nuevo personaje
        data.personajes.push(nuevoPersonaje.toJSON());
        data.ultimaActualizacion = new Date().toISOString();
        
        await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(data, null, 4));
        console.log('\x1b[32m¡Personaje agregado correctamente! Total:\x1b[0m', data.personajes.length);
        
    } catch (error) {
        console.log('\x1b[31mError agregando personaje:\x1b[0m', error.message);
    }
}



static async seleccionarPersonaje(personajes) {
    if (personajes.length === 0) return null;

    while (true) {
        console.clear();
        console.log('\x1b[34m=== SELECCIONAR PERSONAJE ===\x1b[0m\n');
        
        personajes.forEach((p, i) => {
            console.log(`${i + 1}. ${p.nombre} (Nivel ${p.nivel} ${p.clase}) - ${p.vida}/${p.vidaMaxima} HP`);
        });

        const opcion = await inputHandler.question('\nSelecciona un personaje (o 0 para volver): ');
        const index = parseInt(opcion) - 1;

        if (opcion === '0') {
            return null; // volver atrás
        }

        if (!isNaN(index) && index >= 0 && index < personajes.length) {
            return personajes[index];
        }

        console.log('\x1b[33mSelección no válida.\x1b[0m');
        await inputHandler.pause();
    }
}

}

module.exports = CharacterService;