export default function BodyCardProgress({ dealProgress }) {
    return (
        <div className="flex items-center justify-center border-r w-28 min-w-4 h-8 px-2 text-xs">
            {dealProgress || "0.00"}%
        </div>
    );
}
