import Image from "next/image";
import CopyableLink from "../copyableLink";
import { Button } from "../ui/button";

export default function SheetIsPublished({ sheetPublishedId, onClick }) {
    return (
        <>
            <span className="flex items-center gap-2 w-max text-base font-semibold">
                Опубликован
                <Image
                    src="/done-black.svg"
                    alt="опубликован"
                    width={16}
                    height={16}
                />
            </span>
            <CopyableLink
                linkToCopy={`${process.env.NEXT_PUBLIC_APP_URL}/published?id=${sheetPublishedId}`}
            />

            <Button
                type="button"
                onClick={onClick}
                className="w-max mx-auto h-8"
            >
                Удалить из публикации
            </Button>
        </>
    );
}
