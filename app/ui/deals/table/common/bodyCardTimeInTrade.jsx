export default function BodyCardTimeInTrade({ dealTimeInTrade }) {
    return (
        <div className="flex items-center justify-center flex-nowrap border-r w-32 min-w-4 h-8 px-2 text-xs">
            {dealTimeInTrade ? dealTimeInTrade : "NaN"}
        </div>
    );
}
