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
import SheetPrivateForm from "./sheetPrivateForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

export default function SettingsSheet({
    sheet,
    userId,
    currentSheetColumns,
    onUpdateSheet,
    onRemoveSheet,
    onUpdatePrivateSettings,
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
        
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Настройки для вашего пользования
            </AccordionTrigger>
            <AccordionContent>
              <SheetPrivateForm
                userId={userId}
                sheetId={sheet.id}
                currentSheetColumns={currentSheetColumns}
                onUpdatePrivateSettings={onUpdatePrivateSettings}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Настройки для публичного просмотра
            </AccordionTrigger>
            <AccordionContent>
              <SheetPublishedForm userId={userId} sheetId={sheet.id} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogClose asChild className="mx-auto">
          <Button
            type="button"
            onClick={(e) => onRemoveSheet(e, sheet.id)}
            className="h-8"
          >
            Удалить лист
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
