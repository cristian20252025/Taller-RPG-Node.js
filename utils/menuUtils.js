const readline = require('readline');

// Función para pausa
function pausa() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('\nPresiona Enter para continuar...', () => {
            rl.close();
            resolve();
        });
    });
}

// Función para mostrar menú principal
async function mostrarMenuPrincipal() {
    console.clear();
    console.log('\x1b[34m=== SIMULADOR DE BATALLAS RPG ===\x1b[0m\n');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        console.log('1. Crear personaje');
        console.log('2. Ver personajes');
        console.log('3. Gestionar personaje');
        console.log('4. Iniciar batalla');
        console.log('5. Salir');
        
        rl.question('\nSelecciona una opción: ', (opcion) => {
            rl.close();
            resolve({ opcion });
        });
    });
}

// Función para mostrar menú de personaje
async function mostrarMenuPersonaje(personaje) {
    console.clear();
    console.log(`\x1b[34m=== GESTIONANDO: ${personaje.nombre} ===\x1b[0m\n`);
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        console.log('1. Ver estadísticas');
        console.log('2. Ver inventario');
        console.log('3. Volver al menú principal');
        
        rl.question('\nSelecciona una opción: ', (opcion) => {
            rl.close();
            resolve({ opcion });
        });
    });
}

// Función para mostrar menú de batalla
async function mostrarMenuBatalla(personaje) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        console.log('\nOpciones de batalla:');
        console.log('1. Atacar');
        
        // Personalizar nombre de habilidad especial según clase
        let habilidadNombre = 'Habilidad especial';
        if (personaje.clase === 'Guerrero') {
            habilidadNombre = 'Ataque Poderoso (20 ira)';
        } else if (personaje.clase === 'Mago') {
            habilidadNombre = 'Bola de Fuego (20 mana)';
        } else if (personaje.clase === 'Arquero') {
            habilidadNombre = 'Disparo Preciso';
        }
        
        console.log(`2. ${habilidadNombre}`);
        console.log('3. Usar item');
        console.log('4. Huir');
        
        rl.question('Selecciona una acción: ', (opcion) => {
            rl.close();
            resolve({ opcion });
        });
    });
}

module.exports = {
    pausa,
    mostrarMenuPrincipal,
    mostrarMenuPersonaje,
    mostrarMenuBatalla
};