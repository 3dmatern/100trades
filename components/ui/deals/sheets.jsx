"use client";

import { useState } from "react";

import ButtonPlus from "@/components/ui/buttonPlus";
import Sheet from "@/components/ui/deals/sheet";
import Table from "@/components/ui/deals/table";

export default function Sheets({ className, sheets }) {
    const [open, setOpen] = useState(false);
    const [indexSheet, setIndexSheet] = useState(0);

    return (
        <div className={className}>
            <div className="flex items-center justify-start gap-1 h-9">
                {sheets.map((sheet, index) => (
                    <Sheet
                        key={sheet.id}
                        index={index}
                        selectSheet={indexSheet}
                        sheet={sheet}
                        onClickIndex={setIndexSheet}
                        className={
                            indexSheet === index ? "bg-gray-100" : "bg-gray-200"
                        }
                    />
                ))}
                <ButtonPlus className="flex items-center justify-center size-9" />
            </div>
            <Table sheetId={sheets[indexSheet].id} />
        </div>
    );
}
