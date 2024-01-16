"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function InputUploadImg({ name, onImageChange, width, height }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            onImageChange(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    };

    const handlePast = (e) => {
        const items = e.clipboardData.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile();
                handleImageUpload(file);
                break;
            }
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setSelectedImage(null);
        onImageChange(null);
    };

    return (
        <label className="block w-full h-full">
            <input
                type="file"
                accept="image/*"
                name={name}
                onChange={(e) => handleImageUpload(e.target.files[0])}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onPaste={handlePast}
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-full h-full cursor-pointer opacity-0"
            />

            <Image
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0"
                src={selectedImage ? selectedImage : "./dropbox.svg"}
                width={selectedImage ? width : 16}
                height={selectedImage ? height : 16}
                alt="dropbox"
            />
        </label>
    );
}
