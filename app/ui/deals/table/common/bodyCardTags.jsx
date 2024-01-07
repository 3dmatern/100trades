export default function BodyCardTags({ dealTags, determineTextColor }) {
    return (
        <div className="flex items-center justify-start gap-1 flex-nowrap border-r w-72 min-w-4 h-8 px-2 text-xs">
            {dealTags?.map((tag) => (
                <span
                    key={tag.label}
                    style={{
                        color: determineTextColor(tag.value),
                        backgroundColor: tag.value,
                    }}
                    className="rounded-xl px-2 py-0.5"
                >
                    {tag.label}
                </span>
            ))}
        </div>
    );
}
