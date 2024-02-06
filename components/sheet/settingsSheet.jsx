"use client";

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SheetForm from "@/components/sheet/sheetForm";
import SheetPublishedForm from "@/components/sheet/sheetPublishedForm";

export default function SettingsSheet({
    sheet,
    userId,
    onUpdateSheet,
    onRemoveSheet,
}) {
    return (
        <Dialog>
            <DialogTrigger className="hover:scale-110">
                <Image
                    src="/gear.svg"
                    alt="settings sheet"
                    width={16}
                    height={16}
                />
            </DialogTrigger>
            <DialogContent className="lg:max-w-lg max-w-sm">
                <DialogHeader>
                    <DialogTitle>Настройки листа</DialogTitle>
                </DialogHeader>

                <SheetForm
                    sheet={sheet}
                    userId={userId}
                    onUpdateSheet={onUpdateSheet}
                />
                <DialogClose asChild className="mx-auto">
                    <Button
                        type="button"
                        onClick={(e) => onRemoveSheet(e, sheet.id)}
                        className="h-8"
                    >
                        Удалить лист
                    </Button>
                </DialogClose>

                <SheetPublishedForm userId={userId} sheetId={sheet.id} />
            </DialogContent>
        </Dialog>
    );
}
