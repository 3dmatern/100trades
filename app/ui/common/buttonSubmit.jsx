export default function ButtonSubmit({ className, name, disabled }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`block w-max m-auto py-1 px-4 text-white rounded-md bg-blue-700 hover:bg-blue-500 ${className}`}
        >
            {name}
        </button>
    );
}
