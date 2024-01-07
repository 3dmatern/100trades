export default function BodyCardRisk({ dealRisk }) {
    return (
        <div className="flex items-center justify-center border-r w-16 min-w-4 h-8 px-2 text-xs">
            <span>{dealRisk && dealRisk + "%"}</span>
        </div>
    );
}
