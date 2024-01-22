const fs = require("fs");
const path = require("path");
const { appendFileAsync } = require("../utils/fileUtils.js");

const maxSize = 5 * 1024 * 1024; // 5MB

exports.uploadImage = async (req, res) => {
    try {
        const { base64String, fileName } = req.body;

        if (!fileName || !base64String) {
            return res.status(400).json({ error: "Выберите изображение!" });
        }

        const matches = base64String.match(
            /^data:image\/([A-Za-z-+/]+);base64,(.+)$/
        );

        if (!matches || matches.length !== 3) {
            return res.status(400).json({ error: "Выберите изображение!" });
        }

        const imageType = matches[1];
        const imageData = matches[2];

        const allowedImageTypes = ["jpeg", "jpg", "png", "gif"];

        if (!allowedImageTypes.includes(imageType.toLowerCase())) {
            return res.status(400).json({ error: "Выберите изображение!" });
        }

        const buffer = Buffer.from(imageData, "base64");
        if (buffer.length > maxSize) {
            return res.status(400).json({
                error: "Выберите изображение размером меньше 5 мегабайт!",
            });
        }

        const rootDir = path.join(__dirname, "../");
        const uploadDir = path.join(rootDir, "images");
        const newFileName = fileName + "." + imageType;
        const filePath = path.join(uploadDir, newFileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Асинхронная запись данных в файл
        await appendFileAsync(filePath, buffer);

        // Логгирование успешной загрузки
        console.log(`Successful upload: ${req.method} ${req.url}`);

        res.json({ success: true, newFileName });
    } catch (error) {
        // Логгирование ошибки загрузки
        console.error("Error uploading file: ", error);

        res.status(500).json({ error: "Ошибка загрузки изображения!" });
    }
};

exports.deleteImage = async (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, "../images", fileName);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);

            // Логгирование успешного удаления
            console.log(`Successful delete: ${req.method} ${req.url}`);

            res.status(200).json({
                success: true,
                message: "Изображение удалено",
            });
        } else {
            // Логгирование ошибки удаления
            console.error("Error, file not found: ", fileName);

            res.status(404).json({ error: "Изображение не найдено" });
        }
    } catch (error) {
        // Логгирование ошибки удаления
        console.error("Error when deleting file: ", error);

        res.status(500).json({ error: "Ошибка при удалении изображения" });
    }
};
