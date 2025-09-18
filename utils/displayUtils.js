function showWelcomeScreen() {
    return new Promise((resolve) => {
        console.clear();
        console.log('\x1b[36m╔══════════════════════════════════════╗');
        console.log('║           RPG BATTLE SIMULATOR         ║');
        console.log('╚══════════════════════════════════════╝\x1b[0m');
        console.log('\n\x1b[33mDesarrollado con Node.js\x1b[0m');
        
        const rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('\n\x1b[90mPresiona Enter para continuar...\x1b[0m', () => {
            rl.close();
            resolve();
        });
    });
}

function mostrarBarraVida(personaje) {
    const porcentaje = (personaje.vida / personaje.vidaMaxima) * 100;
    const barras = Math.floor(porcentaje / 5);
    const barra = '█'.repeat(barras) + '░'.repeat(20 - barras);
    
    let color;
    if (porcentaje > 70) color = '\x1b[32m'; // verde
    else if (porcentaje > 30) color = '\x1b[33m'; // amarillo
    else color = '\x1b[31m'; // rojo
    
    return `${color}${personaje.nombre}: ${barra} ${personaje.vida}/${personaje.vidaMaxima} HP\x1b[0m`;
}

module.exports = {
    showWelcomeScreen,
    mostrarBarraVida
};