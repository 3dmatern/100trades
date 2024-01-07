export default function BodyCardEffect({ dealEffect }) {
    return (
        <div className="flex items-center justify-center border-r w-24 min-w-4 h-8 px-2 text-xs uppercase">
            {dealEffect === "win" && (
                <span className="inline-block py-1 px-2 bg-green-300 rounded-xl">
                    win
                </span>
            )}
            {dealEffect === "active" && (
                <span className="inline-block py-1 px-2 bg-orange-300 rounded-xl">
                    активна
                </span>
            )}
            {dealEffect === "noLoss" && (
                <span className="inline-block py-1 px-2 bg-gray-300 rounded-xl">
                    бу
                </span>
            )}
            {dealEffect === "loss" && (
                <span className="inline-block py-1 px-2 bg-red-300 rounded-xl">
                    loss
                </span>
            )}
        </div>
    );
}
