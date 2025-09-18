const Personaje = require("./personajes");
const Pocion = require("./Pocion");

class Arquero extends Personaje {
    #destreza;
    #precision;

    constructor(nombre) {
        super(nombre, "Arquero", 120, 15, 10);
        this.#destreza = 15;
        this.#precision = 80;
        this.agregarHabilidad("Disparo Preciso");
    }

    // Getters
    get destreza() {
        return this.#destreza;
    }
    get precision() {
        return this.#precision;
    }

    // Setters
    setDestreza(destreza) {
        this.#destreza = destreza;
    }
    setPrecision(precision) {
        this.#precision = precision;
    }

    // Habilidad especial del Arquero
    disparoPreciso(objetivo) {
        if (Math.random() * 100 <= this.#precision) {
            const daño = Math.max(
                1,
                (this.ataque + this.#destreza) * 1.5 - objetivo.defensa
            );
            objetivo.recibirDaño(daño);
            console.log(`¡${this.nombre} realiza un Disparo Preciso!`);
            return daño;
        } else {
            console.log(`¡${this.nombre} falla el Disparo Preciso!`);
            return 0;
        }
    }

    atacar(objetivo) {
        // Los arqueros tienen un 20% de probabilidad de atacar dos veces
        const daño = super.atacar(objetivo);
        if (Math.random() < 0.2) {
            console.log(`¡${this.nombre} ataca nuevamente!`);
            const segundoDaño = super.atacar(objetivo);
            return daño + segundoDaño;
        }
        return daño;
    }

    subirNivel() {
        super.subirNivel();
        this.#destreza += 3;
        this.#precision += 2;
        console.log(`Destreza aumentada a ${this.#destreza}`);
        console.log(`Precisión aumentada a ${this.#precision}%`);
    }

    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            destreza: this.#destreza,
            precision: this.#precision,
        };
    }

    static fromJSON(data) {
        const arquero = new Arquero(data.nombre);

        // Usar setters para asignar valores
        arquero.setNivel(data.nivel);
        arquero.setExperiencia(data.experiencia);
        arquero.setExperienciaParaSubir(data.experienciaParaSubir);
        arquero.setVidaMaxima(data.vidaMaxima);
        arquero.vida = data.vida;
        arquero.setAtaque(data.ataque);
        arquero.setDefensa(data.defensa);
        arquero.setDestreza(data.destreza);
        arquero.setPrecision(data.precision);

        // Recuperar items
        if (data.inventario) {
            const items = data.inventario
                .map((itemData) => {
                    if (itemData.tipo === "pocion") {
                        return new Pocion(itemData.nombre, itemData.curacion);
                    }
                    return null;
                })
                .filter((item) => item !== null);

            arquero.setInventario(items);
        }

        // Recuperar habilidades
        if (data.habilidades) {
            arquero.setHabilidades([...data.habilidades]);
        }

        return arquero;
    }
}

module.exports = Arquero;
