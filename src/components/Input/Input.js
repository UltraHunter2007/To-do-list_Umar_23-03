import React from 'react';
import classes from './Input.module.css'

function Input({ name, value, placeholder, onChange }) {
    return (
        <input
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}

export default Input;
