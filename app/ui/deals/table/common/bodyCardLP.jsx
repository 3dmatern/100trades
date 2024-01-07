export default function BodyCardLP({ dealLP, determineTextColor }) {
    return (
        <div className="flex items-center justify-center border-r w-16 min-w-4 h-8 px-2 text-xs">
            <span
                style={{
                    color: determineTextColor(dealLP.value),
                    backgroundColor: dealLP.value,
                }}
                className="rounded-xl px-2"
            >
                {dealLP.label}
            </span>
        </div>
    );
}
