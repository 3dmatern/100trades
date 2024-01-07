export default function BodyCardDate({ dealDate }) {
    return (
        <div className="flex items-center justify-center border-r w-32 min-w-4 h-8 px-2 text-xs">
            {dealDate &&
                `${new Date(dealDate).getMonth() + 1}/${new Date(
                    dealDate
                ).getDate()}/${new Date(dealDate).getFullYear()}  ${new Date(
                    dealDate
                ).getHours()}:${new Date(dealDate).getMinutes()}`}
        </div>
    );
}
