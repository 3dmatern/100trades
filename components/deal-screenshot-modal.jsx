"use client";

import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { UiModal } from "@/components/uikit/ui-modal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export function DealScreenshotModal({
    isOpen,
    deal,
    currentScreen,
    onRemove,
    onClose,
    isPublished,
    table,
}) {
    const [emblaApi, setEmblaApi] = useState();
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollTo = useCallback(
        (index) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        if (currentScreen === "imageEnd") {
            scrollTo(1);
            setSelectedIndex(1);
        }

        emblaApi.on("init", (emblaApi) => {
            setScrollSnaps(emblaApi.scrollSnapList());
        });

        emblaApi.on("select", (emblaApi) => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        });

        return () => {
            scrollTo(0);
            setSelectedIndex(0);
        };
    }, [currentScreen, emblaApi, scrollTo]);

    return (
        <UiModal
            width="full"
            isOpen={isOpen}
            onClose={onClose}
            className="py-0 z-[4]"
        >
            <UiModal.Header className="flex items-center justify-center gap-5 text-white uppercase">
                {deal?.name}
                {!isPublished && (
                    <Button
                        title="Удалить скриншот"
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                            onRemove({
                                dealId: deal.id,
                                inputName: currentScreen,
                                fileName: deal?.[currentScreen],
                            })
                        }
                        className="w-max px-2  bg-red-700 hover:bg-red-500 rounded-md"
                    >
                        <TrashIcon />
                    </Button>
                )}
            </UiModal.Header>
            <UiModal.Body className="mx-auto px-0">
                <Carousel
                    setApi={setEmblaApi}
                    opts={{
                        align: "start",
                        loop: true,
                        duration: 0,
                    }}
                >
                    <CarouselContent className="flex items-center">
                        {[deal?.imageStart, deal?.imageEnd].map(
                            (src) =>
                                src && (
                                    <CarouselItem key={src}>
                                        <img
                                            src={IMAGE_URL + "/" + src}
                                            alt="screenshot-start"
                                            className="block xl:max-h-[800px] max-h-[720px] w-auto mx-auto"
                                        />
                                    </CarouselItem>
                                )
                        )}
                    </CarouselContent>

                    <div className="flex items-center justify-center my-5">
                        {scrollSnaps.map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => scrollTo(index)}
                                variant={
                                    index === selectedIndex ? "outline" : ""
                                }
                                size="sm"
                                className={cn(
                                    "w-max flex items-center ml-3 mr-3"
                                )}
                            >
                                СКРИН {index + 1}
                            </Button>
                        ))}
                    </div>
                </Carousel>
            </UiModal.Body>
            <UiModal.Footer className="flex-col h-max p-0 pb-5">
                {table}
            </UiModal.Footer>
        </UiModal>
    );
}

function TrashIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                fill="currentColor"
            />
        </svg>
    );
}
