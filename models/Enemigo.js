const { randomUUID } = require('crypto');

class Enemigo {
    #id;
    #nombre;
    #nivel;
    #vida;
    #vidaMaxima;
    #ataque;
    #defensa;
    #experienciaOtorgada;
    #probabilidadDrop;

    constructor(nombre, nivel, vida, ataque, defensa, experienciaOtorgada, probabilidadDrop) {
        this.#id = randomUUID();
        this.#nombre = nombre;
        this.#nivel = nivel;
        this.#vida = vida;
        this.#vidaMaxima = vida;
        this.#ataque = ataque;
        this.#defensa = defensa;
        this.#experienciaOtorgada = experienciaOtorgada;
        this.#probabilidadDrop = probabilidadDrop;
    }

    // Getters
    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get nivel() { return this.#nivel; }
    get vida() { return this.#vida; }
    get vidaMaxima() { return this.#vidaMaxima; }
    get ataque() { return this.#ataque; }
    get defensa() { return this.#defensa; }
    get experienciaOtorgada() { return this.#experienciaOtorgada; }
    get probabilidadDrop() { return this.#probabilidadDrop; }

    // Setters
    set vida(valor) {
        this.#vida = Math.max(0, Math.min(valor, this.#vidaMaxima));
    }

    // Métodos públicos
    atacar(objetivo) {
        const dañoBase = this.#ataque;
        const variacion = Math.floor(Math.random() * 5) - 2;
        const daño = Math.max(1, dañoBase + variacion - objetivo.defensa);
        objetivo.recibirDaño(daño);
        return daño;
    }

    recibirDaño(daño) {
        this.vida -= daño;
        return this.vida > 0;
    }

    // Método para serialización
    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            nivel: this.#nivel,
            vida: this.#vida,
            vidaMaxima: this.#vidaMaxima,
            ataque: this.#ataque,
            defensa: this.#defensa,
            experienciaOtorgada: this.#experienciaOtorgada,
            probabilidadDrop: this.#probabilidadDrop
        };
    }
}

module.exports = Enemigo;