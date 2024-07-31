import React from 'react'

const NumberInput = ({ label, name, placement, icon, className }) => {
    return (
        <div className={`mb-5 ${className}`}>
        <label className='label' htmlFor={name}>{label}</label>
        <div className='group input-container focus-within:border-lime-500 hover:border-slate-900 hover:focus-within:border-lime-500'>
            {icon ? (
                <div className={`px-4 text-lg absolute bg-slate-100 h-full text-slate-700 font-bold flex items-center group-focus-within:bg-lime-500 ${placement === 'left' ? 'left-0 rounded-tl rounded-bl' : 'right-0 rounded-tr rounded-br' }`}>
                {icon}
                </div>
            ) : null}
            <input className='sibling my-2 ml-2 mr-2 outline-0 rounded w-full py-1 cursor-pointer ' type="number" name={name} />
        </div>
        </div>
    )
}
export default NumberInput;
