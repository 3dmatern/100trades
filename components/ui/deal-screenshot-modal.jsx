import { UiModal } from "@/components/uikit/ui-modal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export function DealScreenshotModal({
    isOpen,
    deal,
    currentScreen,
    table,
    onRemove,
    onClose,
}) {
    return (
        <UiModal
            width="full"
            isOpen={isOpen}
            onClose={onClose}
            className="py-5 z-10 overflow-hidden"
        >
            <UiModal.Header className="text-white">{deal?.name}</UiModal.Header>
            <UiModal.Body className="max-h-[80%] mx-auto px-10">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        startIndex: currentScreen === "imageEnd" ? 1 : 0,
                    }}
                    className="h-full"
                >
                    <CarouselContent className="h-full">
                        <CarouselItem>
                            <img
                                src={IMAGE_URL + "/" + deal?.imageStart}
                                alt="screenshot-start"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "733px",
                                }}
                                className="mx-auto"
                            />
                        </CarouselItem>
                        {deal?.imageEnd && (
                            <CarouselItem>
                                <img
                                    src={IMAGE_URL + "/" + deal?.imageEnd}
                                    alt="screenshot-end"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "733px",
                                    }}
                                    className="mx-auto"
                                />
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </UiModal.Body>
            <UiModal.Footer>
                <button
                    type="button"
                    onClick={() =>
                        onRemove({
                            dealId: deal.id,
                            inputName: currentScreen,
                            fileName: deal?.[currentScreen],
                        })
                    }
                    className="w-max py-1 px-2 absolute bottom-10 left-1/2 -translate-x-1/2 bg-red-700 hover:bg-red-500 rounded-md text-white"
                >
                    Удалить скриншот
                </button>
                {table}
            </UiModal.Footer>
        </UiModal>
    );
}
