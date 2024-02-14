"use client";

import { useCallback, useEffect, useState } from "react";

import { UiModal } from "@/components/uikit/ui-modal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export function DealScreenshotModal({
    isOpen,
    deal,
    currentScreen,
    table,
    onRemove,
    onClose,
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
            <UiModal.Header className="text-white">{deal?.name}</UiModal.Header>
            <UiModal.Body className="mx-auto px-0">
                <Carousel
                    setApi={setEmblaApi}
                    opts={{
                        align: "start",
                        loop: true,
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

                    <div className="flex items-center justify-center ">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => scrollTo(index)}
                                className="w-10 h-10 flex items-center ml-3 mr-3 bg-transparent"
                            >
                                <span
                                    className={cn(
                                        "w-full h-1 bg-white rounded",
                                        index === selectedIndex &&
                                            "bg-gradient-to-r from-cyan-500 to-blue-500"
                                    )}
                                />
                            </DotButton>
                        ))}
                    </div>
                </Carousel>
            </UiModal.Body>
            <UiModal.Footer className="flex-col h-max p-0">
                <button
                    type="button"
                    onClick={() =>
                        onRemove({
                            dealId: deal.id,
                            inputName: currentScreen,
                            fileName: deal?.[currentScreen],
                        })
                    }
                    className="w-max mx-auto py-1 px-2 h-8 bg-red-700 hover:bg-red-500 rounded-md text-white"
                >
                    Удалить скриншот
                </button>
                {table}
            </UiModal.Footer>
        </UiModal>
    );
}

export const DotButton = (props) => {
    const { children, ...restProps } = props;

    return (
        <button type="button" {...restProps}>
            {children}
        </button>
    );
};
