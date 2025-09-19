# ⚔️ EL DESPERTAR DEL HÉROE: Un RPG en la Oscuridad de la Consola ⚔️

**Hace mucho tiempo, el reino de Textoria florecía. Pero la oscuridad llegó, y ahora, solo los héroes más valientes, aquellos que se atreven a escribir su propia historia en el código, pueden salvarlo. ¿Estás listo para empuñar tu teclado y forjar tu propia leyenda?**

Este proyecto es un simulador de batallas RPG interactivo y narrativo, completamente construido con la magia de Node.js. Más que un simple programa, es un universo de fantasía donde la programación orientada a objetos da vida a personajes, monstruos y destinos épicos.

---

### La Senda del Héroe: El Viaje que te Espera

Tu aventura comienza aquí. Elige tu destino y prepárate para un mundo de desafíos.

#### **I. La Forja de tu Campeón**
No todos los héroes son iguales. Al comienzo de tu aventura, debes elegir quién serás.

-   **El Guerrero (Fuerza y Furia):** Un maestro del combate cuerpo a cuerpo. Su habilidad especial, el "Ataque Poderoso", desata una fuerza devastadora acumulando **ira** con cada golpe.
-   **El Mago (Mente y Magia):** Un erudito que domina las artes arcanas. Su poder reside en el **maná** y la **inteligencia**, lo que le permite lanzar hechizos como la temible "Bola de Fuego".
-   **El Arquero (Destreza y Precisión):** Un cazador silencioso con un ojo agudo. Su **precisión** le permite realizar un "Disparo Preciso" que rara vez falla, y su **destreza** le concede la posibilidad de un ataque doble por turno.

#### **II. El Crisol del Combate**
El mundo está lleno de peligros. Enfréntate a enemigos aleatorios, desde Goblins hasta temibles Orcos, en un sistema de combate por turnos que te hará pensar cada movimiento.

-   **Ataque Básico:** Un golpe directo y confiable que causa daño y te acerca a tu habilidad especial.
-   **Habilidad Especial:** Una técnica devastadora única para cada clase. Úsala en el momento preciso para cambiar el curso de la batalla.
-   **Uso de Ítems:** La clave para la supervivencia. Consume pociones de vida para restaurar tu salud o usa una poción de inmunidad para volverte invulnerable por un turno.
-   **Retirada Estratégica:** Si la batalla es demasiado dura, intenta huir. Pero ten cuidado, la huida no está garantizada.

#### **III. Un Legado Inmortal**
Cada paso que das y cada enemigo que derrotas se forja en tu leyenda.

-   **Progresión y Crecimiento:** Gana **experiencia** con cada victoria. Acumula los puntos suficientes para subir de **nivel**, lo que te hará más fuerte, más rápido y más resistente.
-   **El Archivo de la Crónica:** El estado de tu juego (personaje, inventario y progreso) se guarda automáticamente en un archivo local. Tu aventura siempre te espera.

---

### La Arquitectura del Reino: Una Visión Interna del Código

El reino de Textoria no se construyó por casualidad. Su arquitectura está cuidadosamente diseñada en módulos para una fácil gestión y expansión.

-   `main.js`: El **Portal de Entrada**. Aquí es donde el juego cobra vida y comienza la aventura.
-   `services/`: Los **Maestros de la Realidad**. Esta carpeta contiene la lógica del juego. Aquí encontrarás los servicios que gestionan las batallas, los personajes y el guardado de la partida.
-   `models/`: El **Archivo de la Creación**. Las clases y objetos que dan forma al mundo. Cada personaje, enemigo e ítem es una entidad con sus propias reglas y atributos.
-   `utils/`: El **Libro de Hechizos**. Una colección de funciones de ayuda que facilitan la vida del desarrollador, desde el manejo de la entrada del usuario hasta la visualización de la barra de vida.
-   `data/`: La **Biblioteca de la Historia**. Aquí se guardan las crónicas de tus aventuras en formato JSON, para que tu legado perdure.
-   `interfaces/`: Los **Pactos Antiguos**. Aunque Node.js no tiene interfaces nativas, estos archivos sirven como un contrato para las clases, garantizando un comportamiento consistente.

---

### Comienza Tu Aventura

La oscuridad se profundiza y el destino te llama. Es hora de empezar.

1.  **Forja los Cimientos:** Abre tu terminal y ejecuta `npm install` para preparar tu entorno.
2.  **Llama al Héroe:** Inicia el juego con el comando `npm start` y prepárate para un mundo de fantasía.

### Reconocimientos

Este reino fue construido y mantenido por las mentes y manos de:
-   Sebastian Gualdron
-   Cristian Perez

---
**Licencia:** Este proyecto está protegido por la licencia **ISC**.