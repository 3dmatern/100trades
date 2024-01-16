"use server";

import fs from "fs";
import path from "path";

export const uploadFile = (data) => {
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

export const deleteFile = (fileName) => {
    const filePathToDelete = path.join(process.cwd(), "public/", fileName);
    console.log(filePathToDelete);

    // Проверяем, существует ли файл перед уделением
    if (!fs.existsSync(filePathToDelete)) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        fs.unlinkSync(filePathToDelete);
        return { success: "Файл успешно удален!" };
    } catch (error) {
        console.error(`Error deleting file: ${fileName}`, error);
        return "Ошибка при удалении файла!";
    }
};
