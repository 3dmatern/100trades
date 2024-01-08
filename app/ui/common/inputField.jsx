export default function InputField({
    label,
    type,
    name,
    value,
    placeholder,
    error,
    onChange,
}) {
    return (
        <label className="block w-full mb-3 text-sky-700">
            {label && <span className="block mb-1">{label}</span>}
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="block w-full py-1 px-2 border border-slate-400 rounded-md outline-sky-700"
            />
        </label>
    );
}
