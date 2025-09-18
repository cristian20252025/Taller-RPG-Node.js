const Personaje = require('./personajes');
const Pocion = require('./Pocion');

class Guerrero extends Personaje {
    #fuerza;
    #ira;

    constructor(nombre) {
        super(nombre, 'Guerrero', 150, 18, 12);
        this.#fuerza = 15;
        this.#ira = 0;
        this.agregarHabilidad('Ataque Poderoso');
    }

    // Getters para campos privados
    get fuerza() { return this.#fuerza; }
    get ira() { return this.#ira; }

    // Setters para campos privados
    setFuerza(fuerza) { this.#fuerza = fuerza; }
    setIra(ira) { this.#ira = ira; }

    // Habilidad especial del Guerrero
    ataquePoderoso(objetivo) {
        if (this.#ira >= 20) {
            const daño = Math.max(1, (this.ataque + this.#fuerza) * 2 - objetivo.defensa);
            objetivo.recibirDaño(daño);
            this.#ira = 0;
            console.log(`¡${this.nombre} usa Ataque Poderoso!`);
            return daño;
        } else {
            console.log(`No tienes suficiente ira (${this.#ira}/20)`);
            return 0;
        }
    }

    atacar(objetivo) {
        const daño = super.atacar(objetivo);
        this.#ira += 5;
        return daño;
    }

    get fuerza() { return this.#fuerza; }
    get ira() { return this.#ira; }

    subirNivel() {
        super.subirNivel();
        this.#fuerza += 3;
        console.log(`Fuerza aumentada a ${this.#fuerza}`);
    }

    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            fuerza: this.#fuerza,
            ira: this.#ira
        };
    }

    static fromJSON(data) {
        const guerrero = new Guerrero(data.nombre);

        // Usar los setters públicos para asignar valores
        guerrero.setNivel(data.nivel);
        guerrero.setExperiencia(data.experiencia);
        guerrero.setExperienciaParaSubir(data.experienciaParaSubir);
        guerrero.setVidaMaxima(data.vidaMaxima);
        guerrero.vida = data.vida; // Usar el setter público
        guerrero.setAtaque(data.ataque);
        guerrero.setDefensa(data.defensa);
        guerrero.setFuerza(data.fuerza);
        guerrero.setIra(data.ira);

        // Recuperar items
        if (data.inventario) {
            const items = data.inventario.map(itemData => {
                if (itemData.tipo === 'pocion') {
                    return new Pocion(itemData.nombre, itemData.curacion);
                }
                return null;
            }).filter(item => item !== null);

            guerrero.setInventario(items);
        }

        // Recuperar habilidades
        if (data.habilidades) {
            guerrero.setHabilidades([...data.habilidades]);
        }

        return guerrero;
    }
}

module.exports = Guerrero;