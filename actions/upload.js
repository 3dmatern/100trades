"use server";

import fs from "fs";
import path from "path";

export const uploadImage = async (data) => {
    try {
        const maxSize = 5 * 1024 * 1024; // 5MB

        const { base64String, fileName } = data;

        if (!fileName || !base64String) {
            return { error: "Выберите изображение!" };
        }

        // Извлекаем тип изображения из base64 строки
        const matches = base64String.match(
            /^data:image\/([A-Za-z-+/]+);base64,(.+)$/
        );

        if (!matches || matches.length !== 3) {
            return { error: "Выберите изображение!" };
        }

        const imageType = matches[1];
        const imageData = matches[2];

        // Преобразовываем base64 в буфер
        const buffer = Buffer.from(imageData, "base64");

        if (buffer.length > maxSize) {
            return {
                error: "Выберите изображение размером меньше 5 мегабайт!",
            };
        }

        // Директория, куда будут сохраняться изображения
        const uploadDir = path.join(process.cwd(), "public/uploads");
        // Создаем директорию, если она не существует
        fs.mkdirSync(uploadDir, { recursive: true });

        // Конкотинируем имя и формат
        const newFileName = fileName + "." + imageType;

        // Полный путь к файлу
        const filePath = path.join(uploadDir, newFileName);

        // Проверяем существование файла с таким именем
        if (fs.existsSync(filePath)) {
            // Если файл существует, удаляем его перед заменой
            fs.unlinkSync(filePath);
        }

        // Сохраняем изображение на сервер
        fs.writeFileSync(filePath, buffer);

        return `uploads/${newFileName}`;
    } catch (error) {
        console.error("Error uploading file: ", error);
        return {
            error: "Ошибка загрузки изображения!",
        };
    }
};
