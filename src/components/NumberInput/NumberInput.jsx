import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatLocaleString } from "../../utils/common";

// Debounce function to limit the rate of function execution
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const NumberInput = ({
  label,
  name,
  placement,
  icon,
  className,
  errors,
  useCommaSeparator,
  setValue,
  value,
  setErrors,
}) => {
  const iconRef = useRef(null);
  const [cursorPlacement, setCursorPlacement] = useState(0);
  const [formattedValue, setFormattedValue] = useState(value || "");

  // Set cursor placement width only when icon changes
  useEffect(() => {
    if (iconRef.current) {
      setCursorPlacement(iconRef.current.clientWidth);
    }
  }, [icon]);

  // Update input and formatted values when value changes
  useEffect(() => {
    if (useCommaSeparator) {
      setFormattedValue(value ? formatLocaleString(parseFloat(value)) : "");
    } else {
      setFormattedValue(value);
    }
  }, [value, useCommaSeparator]);

  // Debounced input change handler
  const debouncedSetValue = useCallback(
    debounce((newValue) => {
      setValue(prevValue => ({
        ...prevValue,
        [name]: newValue,
      }));
    }, 300),
    [name, setValue]
  );

  // Handle input change
  const onInputChange = ({ target }) => {
    setErrors(prevValue => ({
      ...prevValue,
      [name]: ""
    }))
    let valueWithoutComma = target.value.replace(/,/g, "");
    if (isNaN(valueWithoutComma)) {
      setFormattedValue("");
      debouncedSetValue("");
    } else {
      setFormattedValue(valueWithoutComma);
      debouncedSetValue(valueWithoutComma);
    }
  };

  return (
    <div className={`mb-5 ${className}`}>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div
        className={`group input-container focus-within:border-lime-500 hover:border-slate-900 hover:focus-within:border-lime-500 ${
          errors?.[name] ? "!border-red" : ""
        }`}
      >
        {icon && (
          <div
            ref={iconRef}
            className={`px-4 text-md absolute bg-slate-100 h-full text-slate-700 font-bold flex items-center group-focus-within:bg-lime-500 ${
              errors?.[name] ? "!bg-red text-white" : ""
            } ${
              placement === "left"
                ? `left-0 rounded-tl rounded-bl pl-[${cursorPlacement + 4}px]`
                : `right-0 rounded-tr rounded-br pr-[${cursorPlacement + 4}px]`
            }`}
          >
            {icon}
          </div>
        )}
        <input
          className="sibling my-2 ml-2 mr-2 outline-0 rounded w-full py-1 cursor-pointer font-bold"
          style={{
            paddingLeft: placement === "left" ? `${cursorPlacement + 4}px` : undefined,
            paddingRight: placement === "right" ? `${cursorPlacement + 4}px` : undefined,
          }}
          type="text"
          autoComplete="off"
          name={name}
          value={formattedValue}
          onChange={onInputChange}
        />
      </div>
      {errors?.[name] && <div className="error">{errors[name]}</div>}
    </div>
  );
};

export default NumberInput;
