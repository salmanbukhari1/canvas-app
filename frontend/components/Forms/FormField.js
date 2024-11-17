import React from 'react';

const FormField = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-field"
    />
  );
};

export default FormField;
