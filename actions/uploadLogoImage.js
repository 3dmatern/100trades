"use server"

import fs from "fs";
import path from "path";

export const uploadLogoImage = async (formData) => {
    // Чтение содержимого файла
    const imageBuffer = await formData.get("logo").arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    const uploadDir = path.join(process.cwd(), "public");
    const newFileName = "logo.png";
    const filePath = path.join(uploadDir, newFileName);

    // Убедимся, что директория для сохранения файлов существует
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Удаляем файл, если существует
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    // Сохраняем файл
    fs.writeFileSync(filePath, buffer);

    // Логгирование успешной загрузки
    console.log(`Successful upload logo: ${filePath}`);

    return { success: true, newFileName };
};