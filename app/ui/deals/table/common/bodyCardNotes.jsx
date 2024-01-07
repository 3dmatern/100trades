export default function BodyCardNotes({ dealNotes }) {
    return (
        <div className="flex items-center justify-center flex-nowrap border-r w-44 min-w-4 h-8 px-2 text-xs">
            {dealNotes}
        </div>
    );
}
