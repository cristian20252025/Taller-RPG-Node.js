const Personaje = require('./personajes');
const Pocion = require('./Pocion');

class Mago extends Personaje {
    #mana;
    #manaMaximo;
    #inteligencia;

    constructor(nombre) {
        super(nombre, 'Mago', 100, 10, 8);
        this.#mana = 50;
        this.#manaMaximo = 50;
        this.#inteligencia = 20;
        this.agregarHabilidad('Bola de Fuego');
    }

    // Getters
    get mana() { return this.#mana; }
    get manaMaximo() { return this.#manaMaximo; }
    get inteligencia() { return this.#inteligencia; }

    // Setters
    setMana(mana) { this.#mana = mana; }
    setManaMaximo(manaMaximo) { this.#manaMaximo = manaMaximo; }
    setInteligencia(inteligencia) { this.#inteligencia = inteligencia; }

    // Implementación de habilidades mágicas
    tieneSuficienteMana(costo) {
        return this.#mana >= costo;
    }

    usarHabilidadEspecial(objetivo) {
        if (this.tieneSuficienteMana(20)) {
            const daño = Math.max(1, this.#inteligencia * 2 - objetivo.defensa);
            objetivo.recibirDaño(daño);
            this.#mana -= 20;
            console.log(`¡${this.nombre} lanza Bola de Fuego!`);
            return daño;
        } else {
            console.log(`No tienes suficiente mana (${this.#mana}/20)`);
            return 0;
        }
    }

    subirNivel() {
        super.subirNivel();
        this.#manaMaximo += 10;
        this.#mana = this.#manaMaximo;
        this.#inteligencia += 5;
        console.log(`Inteligencia aumentada a ${this.#inteligencia}`);
        console.log(`Máximo de mana aumentado a ${this.#manaMaximo}`);
    }

    descansar() {
        this.#mana = this.#manaMaximo;
        console.log(`${this.nombre} descansa y recupera todo su mana.`);
    }

    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            mana: this.#mana,
            manaMaximo: this.#manaMaximo,
            inteligencia: this.#inteligencia
        };
    }

    static fromJSON(data) {
        const mago = new Mago(data.nombre);

        // Usar setters para asignar valores
        mago.setNivel(data.nivel);
        mago.setExperiencia(data.experiencia);
        mago.setExperienciaParaSubir(data.experienciaParaSubir);
        mago.setVidaMaxima(data.vidaMaxima);
        mago.vida = data.vida;
        mago.setAtaque(data.ataque);
        mago.setDefensa(data.defensa);
        mago.setMana(data.mana);
        mago.setManaMaximo(data.manaMaximo);
        mago.setInteligencia(data.inteligencia);

        // Recuperar items
        if (data.inventario) {
            const items = data.inventario.map(itemData => {
                if (itemData.tipo === 'pocion') {
                    return new Pocion(itemData.nombre, itemData.curacion);
                }
                return null;
            }).filter(item => item !== null);

            mago.setInventario(items);
        }

        // Recuperar habilidades
        if (data.habilidades) {
            mago.setHabilidades([...data.habilidades]);
        }

        return mago;
    }
}

module.exports = Mago;