const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// Crear instancia de readline para este módulo
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class CharacterService {
    static async crearPersonaje() {
        return new Promise(async (resolve) => {
            console.clear();
            console.log('\x1b[34m=== CREAR PERSONAJE ===\x1b[0m\n');
            
            const nombre = await new Promise((resolveNombre) => {
                rl.question('¿Cómo se llamará tu personaje? ', resolveNombre);
            });

            console.log('\nSelecciona la clase:');
            console.log('1. Guerrero (Alta vida, alto ataque)');
            console.log('2. Mago (Baja vida, alto daño mágico)');
            console.log('3. Arquero (Daño consistente, ataques dobles)');
            
            const claseOp = await new Promise((resolveClase) => {
                rl.question('Opción: ', resolveClase);
            });

            let personaje;
            const Guerrero = require('../models/Guerrero');
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

            // Dar items iniciales
            personaje.agregarItem(new Pocion('Poción de Vida Pequeña', 30));
            personaje.agregarItem(new Pocion('Poción de Vida Pequeña', 30));

            console.log(`\x1b[32m¡${personaje.nombre} el ${personaje.clase} ha sido creado!\x1b[0m`);
            resolve(personaje);
        });
    }

    static async cargarPersonajes() {
        try {
            const dataPath = path.join(__dirname, '../data/savedData.json');
            const data = await fs.readFile(dataPath, 'utf8');
            const jsonData = JSON.parse(data);
            
            const Personaje = require('../models/Personaje');
            return jsonData.personajes.map(p => Personaje.fromJSON(p));
        } catch (error) {
            // Si el archivo no existe, devolver array vacío
            if (error.code === 'ENOENT') {
                return [];
            }
            console.log('\x1b[31mError cargando personajes:\x1b[0m', error.message);
            return [];
        }
    }

    static async guardarPersonajes(personajes) {
        try {
            const dataPath = path.join(__dirname, '../data');
            
            // Asegurarse de que la carpeta existe
            await fs.mkdir(dataPath, { recursive: true });
            
            const data = {
                personajes: personajes.map(p => p.toJSON()),
                ultimaActualizacion: new Date().toISOString()
            };
            
            await fs.writeFile(path.join(dataPath, 'savedData.json'), JSON.stringify(data, null, 2));
        } catch (error) {
            console.log('\x1b[31mError guardando personajes:\x1b[0m', error.message);
        }
    }

    static async seleccionarPersonaje(personajes) {
        if (personajes.length === 0) return null;
        
        console.clear();
        console.log('\x1b[34m=== SELECCIONAR PERSONAJE ===\x1b[0m\n');
        
        personajes.forEach((p, i) => {
            console.log(`\x1b[37m${i + 1}. ${p.nombre} (Nivel ${p.nivel} ${p.clase}) - ${p.vida}/${p.vidaMaxima} HP\x1b[0m`);
        });
        
        const opcion = await new Promise((resolve) => {
            rl.question('\nSelecciona un personaje: ', resolve);
        });
        
        const index = parseInt(opcion) - 1;
        
        if (index >= 0 && index < personajes.length) {
            return personajes[index];
        }
        
        console.log('\x1b[33mSelección no válida.\x1b[0m');
        await new Promise((resolve) => {
            rl.question('Presiona Enter para continuar...', resolve);
        });
        return null;
    }
}

module.exports = CharacterService;