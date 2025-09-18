const { startGame } = require('./services/GameService');

async function main() {
    try {
        await startGame();
    } catch (error) {
        console.error('Error inesperado:', error);
    }
}

// Manejar cierre graceful
process.on('SIGINT', () => {
    console.log('\n¡Hasta pronto!');
    process.exit(0);
});

main();