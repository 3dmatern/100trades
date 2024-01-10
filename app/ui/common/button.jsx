import clsx from "clsx";

export default function Button({ children, className, ...rest }) {
    return (
        <button
            {...rest}
            className={clsx(
                `flex items-center gap-1 m-auto py-1 px-4 text-white rounded-md bg-blue-700 hover:bg-blue-500`,
                className
            )}
        >
            {children}
        </button>
    );
}
