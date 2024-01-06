export default function CheckboxOrNumber({ number, name, checked, onChange }) {
    return (
        <div className="flex items-center h-8 px-2">
            {number ? (
                <p className="text-xs">{number}</p>
            ) : (
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
            )}
        </div>
    );
}
