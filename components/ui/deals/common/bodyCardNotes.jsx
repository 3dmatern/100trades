"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { updateEntrie } from "@/actions/entrie";

export default function BodyCardNotes({
    userId,
    sheetId,
    dealId,
    dealNotes,
    columnWidth,
}) {
    const textRef = useRef(null);
    const [isPending, startTransition] = useTransition();
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
            if (
                textRef.current &&
                !textRef.current.contains(e.target) &&
                open
            ) {
                startTransition(() => {
                    if ((!dealNotes && !note) || dealNotes === note) {
                        setOpen(false);
                        return;
                    }
                    updateEntrie({
                        userId,
                        values: { id: dealId, sheetId, notes: note },
                    })
                        .then((data) => {
                            if (data.error) {
                                toast.error(data.error);
                                setOpen(true);
                            }
                            if (data.success) {
                                toast.success(data.success);
                                setOpen(false);
                            }
                        })
                        .catch(() => toast.error("Что-то пошло не так!"));
                });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <div
            ref={textRef}
            onClick={() => setOpen(true)}
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center relative border-r h-8 px-2`}
        >
            {open && !isPending ? (
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
