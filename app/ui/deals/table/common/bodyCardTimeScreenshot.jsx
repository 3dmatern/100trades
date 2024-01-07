export default function BodyCardTimeScreenshot({ dealTimeScreenshot }) {
    return (
        <div className="flex items-center justify-center border-r w-32 min-w-4 h-8 px-2 text-xs">
            {dealTimeScreenshot ? dealTimeScreenshot : "NaN"}
        </div>
    );
}
