const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("./middleware/loggingMiddleware");
const imageRoutes = require("./routes/imageRoutes.js");
const authMiddleware = require("./middleware/authMiddleware.js");

const app = express();
const PORT = 3001;

// установите лимит в размер, который вам нужен, например, '5mb'
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

// Middleware логгирования HTTP-запросов
app.use(logger);

// Подключение роутов, контроллеров и прочих модулей
app.use(authMiddleware);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/images", imageRoutes);

// Middleware логгирования ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
