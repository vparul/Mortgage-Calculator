import React, { useState } from 'react'
import NumberInput from '../NumberInput';
import RadioButton from '../RadioButton/RadioButton';
import CalculatorIcon from "../../assets/icons/calculator.svg";

const Calculator = ({ formValues }) => {
  const { mortgageAmount, interestRate, mortgageTerm, mortgageType}  = formValues;

  const [errors, setErrors] = useState({});

     const mortgageTypeList = [
    {
      id: 1,
      name: "Repayment",
      value: "repayment"
    },
    {
      id: 2,
      name: "Interest Only",
      value: "interest only"
    }
  ];

  const onFormSubmit = (e) => {
    e?.preventDefault();
    if (!Object.values(formValues)?.some(value => value)) {
      Object.keys(formValues)?.forEach(key => setErrors(prevValues => ({
        ...prevValues,
        [key]: 'This field is required'
      })))
    }
  }

  console.log(errors)
  return (
    <div className='px-8 py-8 w-1/2'>
      <div className='pb-8 font-sans flex items-center justify-between'>
      <h1 className='text-2xl text-slate-900 font-bold'>Mortgage Calculator</h1>
      <button type="button" className='text-slate-700 border-b-2 hover:text-slate-900 hover:border-slate-900'>Clear All</button>
      </div>
      <form onSubmit={onFormSubmit}>
        <NumberInput name="mortgageAmount" label="Mortgage Amount" icon="£" placement="left" errors={errors} />
       <div className='flex justify-between items-center'>
       <NumberInput name="mortgageTerm" label="Mortgage Term" icon="years" placement="right" className="w-48" errors={errors} />
       <NumberInput name="interestRate" label="Interest Rate" icon="%" placement="right" className="w-48" errors={errors} />
       </div>
        <RadioButton name="mortgageType" label="Mortgage Type" options={mortgageTypeList} errors={errors} />
        <button className='bg-lime-500 py-3 px-9 rounded-full mt-7 transition-opacity hover:opacity-70' type="submit" name="calculate">
          <div className="flex text-lg font-bold items-center text-slate-900">
          <img src={CalculatorIcon} alt='calculator' className='pr-2 w-8 h-8' />
          Calculate Repayments
          </div>
        </button>


      </form>
    </div>
  );
}

export default Calculator;