const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");

exports.uploadImage = async (req, res) => {
    try {
        const imageBuffer = req.file.buffer;
        const fileName = req.body.fileName;

        if (!imageBuffer || !fileName) {
            return res
                .status(400)
                .json({ error: "Выберите изображение! server 12" });
        }

        const dimensions = sizeOf(imageBuffer);
        const format = dimensions.type;

        const allowedImageTypes = ["jpeg", "jpg", "png", "gif", "webp"];

        if (!allowedImageTypes.includes(format.toLowerCase())) {
            return res
                .status(400)
                .json({ error: "Выберите изображение! server 29" });
        }

        const rootDir = path.join(__dirname, "../");
        const uploadDir = path.join(rootDir, "images");
        const newFileName = fileName + "." + format;

        const filePath = path.join(uploadDir, newFileName);

        // Убедимся, что директория для сохранения файлов существует
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Сохраняем файл
        fs.writeFileSync(filePath, req.file.buffer);

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
