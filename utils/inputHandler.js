const readline = require('readline');

class InputHandler {
    constructor() {
        this.rl = null;
        this.initialize();
    }

    initialize() {
        if (!this.rl || this.rl.closed) {
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        }
    }

    question(prompt) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(prompt, (answer) => {
                rl.close();
                resolve(answer.trim()); // 🔹 asegura que nunca llegue con espacios o vacío accidental
            });
        });
    }
    

    close() {
        if (this.rl && !this.rl.closed) {
            this.rl.close();
        }
    }

    pause() {
        return this.question('\nPresiona Enter para continuar...');
    }
}

// Exportar una instancia singleton
module.exports = new InputHandler();