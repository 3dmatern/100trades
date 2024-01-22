"use server";

import axios from "axios";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export const uploadFile = async (base64String, fileName) => {
    try {
        const chunkSize = 1024 * 512; // размер части (в байтах)
        let uploadUrl = "";

        for (let i = 0; i < base64String.length; i += chunkSize) {
            const chunk = base64String.slice(i, i + chunkSize);
            const response = await axios.post(`${IMAGE_URL}/upload`, {
                base64String: chunk,
                fileName,
            });

            if (response.data.success && response.data.newFileName) {
                uploadUrl = response.data.newFileName;
            }
        }

        return uploadUrl;
    } catch (error) {
        console.error("Error uploading file: ", error);
        return {
            error: "Ошибка загрузки изображения!",
        };
    }
};

export const deleteFile = async (fileName) => {
    try {
        const res = await axios.delete(`${IMAGE_URL}/${fileName}`);

        return {
            success: res.message,
        };
    } catch (error) {
        console.error(`Error deleting file: ${fileName}`, error);
        return "Ошибка при удалении файла!";
    }
};
