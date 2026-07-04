import "./Input.css";

function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error
}) {

    return (

        <div className="input-group">

            <label>
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />

            {
                error &&
                <span className="error">
                    {error}
                </span>
            }

        </div>

    );

}

export default Input;