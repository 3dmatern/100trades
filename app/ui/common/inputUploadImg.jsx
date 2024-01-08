"use client";

import Image from "next/image";
import React, { useState } from "react";

const InputUploadImg = ({ name, onImageChange, width, height }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            onImageChange(file);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            onImageChange(file);
            reader.readAsDataURL(file);
        }
    };

    return (
        <label className="block relative w-full h-full">
            <input
                type="file"
                accept="image/*"
                name={name}
                onChange={handleImageUpload}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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
};

export default InputUploadImg;
