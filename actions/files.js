"use server";

import axios from "axios";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export const uploadFile = async (formData) => {
    try {
        const response = await axios.post(`${IMAGE_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.error) {
            return {
                error: response.data.error,
            };
        }
        return response.data.newFileName;
    } catch (error) {
        console.error("Error uploading file: ", error);
        return {
            error: "Ошибка при отправке изображения!",
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
