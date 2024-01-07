import Image from "next/image";

export default function BodyCardScreenshot({
    dealImageSrc,
    imageAlt,
    width,
    height,
}) {
    return (
        <div className="flex items-center justify-center border-r w-24 min-w-4 h-8 px-2 text-xs">
            {dealImageSrc && (
                <Image
                    src={`/${dealImageSrc}`}
                    alt={imageAlt}
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
}
