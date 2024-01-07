export default function BodyCardPose({ dealPose }) {
    return (
        <div className="flex items-center justify-center border-r w-20 min-w-4 h-8 px-2 text-xs">
            <span>₽{dealPose}</span>
        </div>
    );
}
