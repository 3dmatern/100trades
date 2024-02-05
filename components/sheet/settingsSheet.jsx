"use client";

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
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
            <DialogContent>
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

                <SheetPublishedForm sheet={sheet} />
            </DialogContent>
        </Dialog>
    );
}
