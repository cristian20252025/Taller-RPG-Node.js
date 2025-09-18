const colores = {
    red: (t) => `\x1b[31m${t}\x1b[0m`,
    green: (t) => `\x1b[32m${t}\x1b[0m`,
    yellow: (t) => `\x1b[33m${t}\x1b[0m`,
    blue: (t) => `\x1b[34m${t}\x1b[0m`,
    magenta: (t) => `\x1b[35m${t}\x1b[0m`,
    gray: (t) => `\x1b[90m${t}\x1b[0m`,
};

module.exports = colores;