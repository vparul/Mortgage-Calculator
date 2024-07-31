import React, { useState } from "react";
import NumberInput from "../NumberInput";
import RadioButton from "../RadioButton/RadioButton";
import CalculatorIcon from "../../assets/icons/calculator.svg";

const Calculator = ({ formValues, setFormValues, setComputedResult }) => {
  //result screen change
  // change background
  // clear all button functionality
  // Radio button not working properly
  // Responsiveness

  const [errors, setErrors] = useState({});

  const mortgageTypeList = [
    {
      id: 1,
      name: "Repayment",
      value: "repayment",
    },
    {
      id: 2,
      name: "Interest Only",
      value: "interest_only",
    },
  ];

  const onFormSubmit = (e) => {
    e?.preventDefault();
    if (!Object.values(formValues)?.some((value) => value)) {
      Object.keys(formValues)?.forEach((key) =>
        setErrors((prevValues) => ({
          ...prevValues,
          [key]: "This field is required",
        }))
      );
    } else {
      const { mortgageType } = formValues;
      if (mortgageType === "interest_only") {
        setComputedResult(calculateInterestOnlyMortgage());
      } else {
        setComputedResult(calculateMonthlyPayment());
      }
    }
  };

  const getAnnualInterestRate = (interestRate) => interestRate / 100;

  const calculateMonthlyPayment = (paymentsPerYear = 12) => {
    const { mortgageAmount, interestRate, mortgageTerm } = formValues;
    const annualInterestRate = getAnnualInterestRate(interestRate);
    const periodicRate = annualInterestRate / paymentsPerYear;
    const totalPayments = mortgageTerm * paymentsPerYear;
    const monthlyRepayment = (
      (mortgageAmount * periodicRate) /
      (1 - Math.pow(1 + periodicRate, -totalPayments))
    ).toFixed(2);
    return {
      monthlyRepayment,
      totalRepayment: monthlyRepayment * mortgageTerm * paymentsPerYear,
    };
  };

  const calculateInterestOnlyMortgage = (paymentsPerYear = 12) => {
    const { mortgageAmount, interestRate, mortgageTerm } = formValues;
    const annualInterestRate = getAnnualInterestRate(interestRate);
    const monthlyInterest = (
      mortgageAmount *
      (annualInterestRate / paymentsPerYear)
    ).toFixed(2);
    const totalInterest = monthlyInterest * mortgageTerm * paymentsPerYear;
    return {
      monthlyInterest,
      totalInterest,
      totalRepayment: mortgageAmount + totalInterest,
    };
  };

  return (
    <div className="px-8 py-8 w-1/2">
      <div className="pb-8 font-sans flex items-center justify-between">
        <h1 className="text-xl text-slate-900 font-bold">
          Mortgage Calculator
        </h1>
        <button
          type="button"
          className="text-slate-700 border-b-2 hover:text-slate-900 hover:border-slate-900"
        >
          Clear All
        </button>
      </div>
      <form onSubmit={onFormSubmit}>
        <NumberInput
          useCommaSeparator
          name="mortgageAmount"
          label="Mortgage Amount"
          icon="£"
          placement="left"
          errors={errors}
          setValue={setFormValues}
        />
        <div className="flex justify-between items-center">
          <NumberInput
            name="mortgageTerm"
            label="Mortgage Term"
            icon="years"
            placement="right"
            className="w-48"
            errors={errors}
            setValue={setFormValues}
          />
          <NumberInput
            name="interestRate"
            label="Interest Rate"
            icon="%"
            placement="right"
            className="w-48"
            errors={errors}
            setValue={setFormValues}
          />
        </div>
        <RadioButton
          name="mortgageType"
          label="Mortgage Type"
          options={mortgageTypeList}
          errors={errors}
          setValue={setFormValues}
        />
        <button
          className="bg-lime-500 py-3 px-9 rounded-full mt-7 transition-opacity hover:opacity-70"
          type="submit"
          name="calculate"
        >
          <div className="flex text-lg font-bold items-center text-slate-900">
            <img
              src={CalculatorIcon}
              alt="calculator"
              className="pr-2 w-8 h-8"
            />
            Calculate Repayments
          </div>
        </button>
      </form>
    </div>
  );
};

export default Calculator;
