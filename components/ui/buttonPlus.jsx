import Image from "next/image";

export default function ButtonPlus({ className, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-1 rounded-sm bg-slate-100 hover:bg-slate-200 ${className}`}
        >
            <Image src="./plus-lg.svg" alt="plus" width={16} height={16} />
        </button>
    );
}
