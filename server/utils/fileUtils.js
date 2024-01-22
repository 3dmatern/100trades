const fs = require("fs");

// Асинхронная функция для добавления данных в конец файла
exports.appendFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};
