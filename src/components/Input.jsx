import { useState } from "react";

const Input = ({ type = "text", placeholder, inputId, value, onChange }) => {

    return (
        <input type={type} placeholder={placeholder} id={inputId} value={value} onChange={onChange} autoFocus className="input" />
    )
};


export default Input;