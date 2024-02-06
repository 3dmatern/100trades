import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CopyableLink({ linkToCopy }) {
    const inputRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(linkToCopy);
            setCopied(true);

            // Дополнительная логика после копирования
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Ошибка при копировании в буфер обмена", err);
        }
    };

    return (
        <div className="flex items-center">
            <Input
                ref={inputRef}
                type="text"
                value={linkToCopy}
                readOnly
                className="mr-2 border border-gray-300 p-2"
            />
            <Button onClick={handleCopy} className="py-2 px-4 rounded">
                {copied ? "Скопировано" : "Копировать"}
            </Button>
        </div>
    );
}
