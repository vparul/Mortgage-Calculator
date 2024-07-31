import React from 'react'


const RadioButton = ({label, name, options}) => {
    return (
        <>
        <label htmlFor={name} className='label'>{label}</label>
        {options?.map(({ name, value, id }) => (
        <div key={value} className='input-container py-3 px-4 hover:border-lime'>
            <input type='radio' id={id} name={name} value={value} className='w-5 h-5 focus:text-lime' onChange={() => {}} />
            <label htmlFor={id} className='pl-4 text-lg font-bold text-slate-900 cursor-pointer'>{name}</label>
        </div>

        ))}
        </>
    )
}

export default RadioButton;