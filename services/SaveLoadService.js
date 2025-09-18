const fs = require('fs').promises;
const path = require('path');

class SaveLoadService {
    static async guardarPartida(datos) {
        try {
            const dataPath = path.join(__dirname, '../data');

            // Asegurarse de que la carpeta existe
            await fs.mkdir(dataPath, { recursive: true });

            const data = {
                ...datos,
                ultimaActualizacion: new Date().toISOString()
            };

            await fs.writeFile(path.join(dataPath, 'savedData.json'), JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error('Error guardando partida:', error);
            return false;
        }
    }

    static async cargarPartida() {
        try {
            const dataPath = path.join(__dirname, '../data/savedData.json');
            const data = await fs.readFile(dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, devolver null
            if (error.code === 'ENOENT') {
                return null;
            }
            console.error('Error cargando partida:', error);
            return null;
        }
    }
}

module.exports = SaveLoadService;