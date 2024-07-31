import React, { useEffect, useRef, useState } from "react";

const NumberInput = ({
  label,
  name,
  placement,
  icon,
  className,
  errors,
  useCommaSeparator,
  setValue,
}) => {
  const iconRef = useRef(null);

  const [cursorPlacement, setCursorPlacement] = useState(null);
  const [inputValue, setInputValue] = useState();
  const [formattedValue, setFormattedValue] = useState();

  useEffect(() => {
    if (iconRef?.current) {
      setCursorPlacement(iconRef?.current.clientWidth);
    }
  }, [icon]);

  const emptyInputFields = () => {
    setInputValue("");
    setFormattedValue("");
    setValue("");
  };

  const onInputChange = ({ target }) => {
    let valueWithoutComma = target?.value.replace(/,/g, "");
    if (isNaN(valueWithoutComma)) {
      emptyInputFields();
      return;
    }
    if (valueWithoutComma) {
      setInputValue(valueWithoutComma);
      setFormattedValue(valueWithoutComma);
      setValue(valueWithoutComma);
    } else {
      emptyInputFields();
    }
  };

  const onInputBlur = () => {
    if (inputValue && useCommaSeparator) {
      setFormattedValue(parseFloat(inputValue)?.toLocaleString("en-GB"));
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
        {icon ? (
          <div
            ref={iconRef}
            className={`px-4 text-md absolute bg-slate-100 h-full text-slate-700 font-bold flex items-center group-focus-within:bg-lime-500 ${
              errors?.[name] ? "!bg-red text-white" : ""
            } ${
              placement === "left"
                ? `left-0 rounded-tl rounded-bl pl-[${cursorPlacement + 4}px]`
                : `right-0 rounded-tr rounded-br pr-[${cursorPlacement + 4}px]`
            }
            `}
          >
            {icon}
          </div>
        ) : null}
        <input
          className="sibling my-2 ml-2 mr-2  outline-0 rounded w-full py-1 cursor-pointer"
          style={{
            paddingLeft:
              placement === "left" ? `${cursorPlacement + 4}px` : null,
            paddingRight:
              placement === "right" ? `${cursorPlacement + 4}px` : null,
          }}
          type="text"
          autoComplete="off"
          name={name}
          value={formattedValue}
          onClick={onInputChange}
          onBlur={onInputBlur}
        />
      </div>
      {errors?.[name] && <div className="error">{errors?.[name]}</div>}
    </div>
  );
};
export default NumberInput;
