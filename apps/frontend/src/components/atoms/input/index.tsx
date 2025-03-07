import React, { useState } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}

const Input: React.FC<IProps> = ({ onChange, placeholder, className }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value != '') {
      setValue(value);
      onChange?.(e);
    }
  };

  return (
    <input
      type='text'
      value={value}
      className={`${className} focus:ring-primary w-full rounded-md border p-2 px-4 py-2 text-sm shadow-sm focus:border-transparent focus:outline-none focus:ring-2`}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;
