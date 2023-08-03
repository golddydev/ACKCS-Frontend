import React from 'react';

const Input = ({value, placeholder, onChange, multiLine, disabled}) => {
    if (!multiLine) return <input className="border-2 border-black w-full h-10 rounded-lg px-2 text-blueGray-500" value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}/>
    else return <textarea className="border-1 border-blueGray-200 w-full rounded-lg px-2 text-blueGray-500" value={value} onChange={onChange} placeholder={placeholder} rows={5} disabled={disabled}/>
};

export default Input