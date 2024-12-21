// components/Input.jsx
const Input = ({ label, type, placeholder, value, onChange, inputId }) => {
    return (
        <div className="input-wrapper">
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={inputId}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input-field"
            />
        </div>
    );
};

export default Input;