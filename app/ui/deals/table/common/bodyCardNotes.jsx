"use client";

import React, { useEffect, useRef, useState } from "react";

export default function BodyCardNotes({ dealNotes }) {
    const textRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");

    const handleChange = ({ target }) => {
        setNote(target.value);
    };

    useEffect(() => {
        if (dealNotes) {
            setNote(dealNotes);
        }
    }, [dealNotes]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (textRef.current && !textRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        const handleScroll = () => {
            setOpen(false);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            ref={textRef}
            onClick={() => setOpen(true)}
            className={`flex items-center relative border-r w-44 min-w-4 h-8 px-2`}
        >
            {open ? (
                <textarea
                    type="text"
                    name="note"
                    value={note}
                    onChange={handleChange}
                    className={`w-full h-32 text-xs border border-blue-800 absolute left-0 top-0 z-10 p-1 ${
                        open ? "outline-blue-800" : ""
                    } resize-none`}
                />
            ) : (
                <span
                    onClick={() => setOpen(true)}
                    className="w-full overflow-hidden text-xs whitespace-nowrap text-ellipsis pointer-events-none"
                >
                    {note}
                </span>
            )}
        </div>
    );
}
