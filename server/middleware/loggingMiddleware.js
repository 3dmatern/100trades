const morgan = require("morgan");

// Создание токена формата 'combined'
morgan.token(
    "combined",
    ":remote-addr :method :url :status :res[content-length] - :response-time ms"
);

// Middleware для логгирования HTTP-запросов
const logger = morgan("combined");

module.exports = logger;
