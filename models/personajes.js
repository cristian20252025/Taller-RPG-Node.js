const { randomUUID } = require('crypto');

class Personaje {
    #id;
    #nombre;
    #clase;
    #nivel;
    #experiencia;
    #experienciaParaSubir;
    #vida;
    #vidaMaxima;
    #ataque;
    #defensa;
    #inventario;
    #habilidades;

    constructor(nombre, clase, vida, ataque, defensa) {
        this.#id = randomUUID();
        this.#nombre = nombre;
        this.#clase = clase;
        this.#nivel = 1;
        this.#experiencia = 0;
        this.#experienciaParaSubir = 100;
        this.#vida = vida;
        this.#vidaMaxima = vida;
        this.#ataque = ataque;
        this.#defensa = defensa;
        this.#inventario = [];
        this.#habilidades = [];
    }

    // Getters
    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get clase() { return this.#clase; }
    get nivel() { return this.#nivel; }
    get experiencia() { return this.#experiencia; }
    get experienciaParaSubir() { return this.#experienciaParaSubir; }
    get vida() { return this.#vida; }
    get vidaMaxima() { return this.#vidaMaxima; }
    get ataque() { return this.#ataque; }
    get defensa() { return this.#defensa; }
    get inventario() { return [...this.#inventario]; }
    get habilidades() { return [...this.#habilidades]; }

    // Setters
    set vida(valor) {
        this.#vida = Math.max(0, Math.min(valor, this.#vidaMaxima));
    }
    setNivel(nivel) { this.#nivel = nivel; }
    setExperiencia(exp) { this.#experiencia = exp; }
    setExperienciaParaSubir(expReq) { this.#experienciaParaSubir = expReq; }
    setVidaMaxima(vidaMax) { this.#vidaMaxima = vidaMax; }
    setAtaque(ataque) { this.#ataque = ataque; }
    setDefensa(defensa) { this.#defensa = defensa; }
    setInventario(inventario) { this.#inventario = inventario; }
    setHabilidades(habilidades) { this.#habilidades = habilidades; }

    // Resto de métodos...
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

    curar(cantidad) {
        this.vida += cantidad;
    }

    ganarExperiencia(cantidad) {
        this.#experiencia += cantidad;
        if (this.#experiencia >= this.#experienciaParaSubir) {
            this.subirNivel();
        }
    }

    subirNivel() {
        this.#nivel += 1;
        this.#experiencia -= this.#experienciaParaSubir;
        this.#experienciaParaSubir = Math.floor(this.#experienciaParaSubir * 1.5);

        this.#vidaMaxima += 10;
        this.vida = this.#vidaMaxima;
        this.#ataque += 5;
        this.#defensa += 2;

        console.log(`¡${this.#nombre} ha subido al nivel ${this.#nivel}!`);
    }

    agregarItem(item) {
        this.#inventario.push(item);
    }

    usarItem(indice) {
        if (indice >= 0 && indice < this.#inventario.length) {
            const item = this.#inventario[indice];
            const resultado = item.usar(this);
            if (item.consumible) {
                this.#inventario.splice(indice, 1);
            }
            return resultado;
        }
        return false;
    }

    agregarHabilidad(habilidad) {
        this.#habilidades.push(habilidad);
    }

    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            clase: this.#clase,
            nivel: this.#nivel,
            experiencia: this.#experiencia,
            experienciaParaSubir: this.#experienciaParaSubir,
            vida: this.#vida,
            vidaMaxima: this.#vidaMaxima,
            ataque: this.#ataque,
            defensa: this.#defensa,
            inventario: this.#inventario.map(item => item.toJSON ? item.toJSON() : item),
            habilidades: this.#habilidades
        };
    }

    static fromJSON(data) {
        let personaje;
        switch (data.clase) {
            case 'Guerrero':
                const Guerrero = require('./Guerrero');
                personaje = new Guerrero(data.nombre);
                break;
            case 'Mago':
                const Mago = require('./Mago');
                personaje = new Mago(data.nombre);
                break;
            case 'Arquero':
                const Arquero = require('./Arquero');
                personaje = new Arquero(data.nombre);
                break;
            default:
                throw new Error(`Clase desconocida: ${data.clase}`);
        }

        // Usar setters para asignar valores
        personaje.setNivel(data.nivel);
        personaje.setExperiencia(data.experiencia);
        personaje.setExperienciaParaSubir(data.experienciaParaSubir);
        personaje.setVidaMaxima(data.vidaMaxima);
        personaje.vida = data.vida;
        personaje.setAtaque(data.ataque);
        personaje.setDefensa(data.defensa);

        // Recuperar items
        if (data.inventario) {
            const Pocion = require('./Pocion');
            const items = data.inventario.map(itemData => {
                if (itemData.tipo === 'pocion') {
                    return new Pocion(itemData.nombre, itemData.curacion);
                }
                return null;
            }).filter(item => item !== null);

            personaje.setInventario(items);
        }

        // Recuperar habilidades
        if (data.habilidades) {
            personaje.setHabilidades([...data.habilidades]);
        }

        return personaje;
    }
}

module.exports = Personaje;