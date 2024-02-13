"use client";

import React, { useEffect, useRef, useState } from "react";

export default function BodyCardNotes({
    dealId,
    dealNotes,
    columnWidth,
    isPending,
    onActionDeal,
    isAdmin,
}) {
    const textRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState("");

    const handleChange = ({ target }) => {
        setNotes(target.value);
    };

    const updateNote = async () => {
        if ((!dealNotes && !notes) || dealNotes === notes) {
            setOpen((prev) => false);
            return;
        }
        onActionDeal({ id: dealId, notes: notes });
        setNotes("");
    };

    useEffect(() => {
        if (dealNotes) {
            setNotes((prev) => dealNotes);
        }
    }, [dealNotes]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (textRef.current && !textRef.current.contains(e.target)) {
                setOpen((prev) => false);
            }
        };
        const handleScroll = () => {
            setOpen((prev) => false);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="table-cell align-middle h-full">
            <div
                ref={textRef}
                onClick={() => setOpen((prev) => true)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-start h-full px-2 relative border-r"
            >
                {open &&
                !isAdmin &&
                (!isPending ||
                    (Object.keys(isPending)[1] === "notes" &&
                        isPending.id !== dealId)) ? (
                    <textarea
                        type="text"
                        name="notes"
                        value={notes}
                        onChange={handleChange}
                        onBlur={updateNote}
                        className={`w-full h-32 text-xs border border-blue-800 absolute left-0 top-0 z-10 p-1 ${
                            open ? "outline-blue-800" : ""
                        } resize-none`}
                    />
                ) : (
                    <span
                        onClick={() => setOpen((prev) => true)}
                        className="text-xs whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none"
                    >
                        {notes}
                    </span>
                )}
            </div>
        </div>
    );
}
