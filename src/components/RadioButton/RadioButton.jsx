import React, { useState } from "react";

const RadioButton = ({ label, name, options, value, errors, setValue }) => {
  const [checkedValue, setCheckedValue] = useState(value);

  const onOptionChange = ({ target }) => {
    setValue(target.value);
    setCheckedValue(target.value);
  };

  return (
    <>
      <label htmlFor={name} className="label">
        {label}
      </label>
      {options?.map(({ name, value, id }) => (
        <div
          key={value}
          className="input-container py-3 px-4 hover:border-lime-500 focus-within:bg-lime-100 focus-within:border-lime-500"
        >
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            className="w-4 h-4 sr-only peer focus:text-lime-500"
            onChange={onOptionChange}
          />
          <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full">
            <div
              className={`w-3 h-3 rounded-full ${
                checkedValue === value ? "bg-lime-500" : " bg-transparent"
              }`}
            ></div>
          </div>
          <label
            htmlFor={id}
            className="pl-4 text-lg font-bold text-slate-900 cursor-pointer"
          >
            {name}
          </label>
        </div>
      ))}
      {errors?.[name] && <div className="error">{errors?.[name]}</div>}
    </>
  );
};

export default RadioButton;
