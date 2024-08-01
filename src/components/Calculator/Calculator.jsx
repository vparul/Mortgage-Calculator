import React, { useState } from "react";
import NumberInput from "../NumberInput";
import RadioButton from "../RadioButton/RadioButton";
import CalculatorIcon from "../../assets/icons/calculator.svg";
import { MORTGAGE_TYPE } from "../../constants/constants";
import { hasAllRequiredValues } from "../../utils/common";

const Calculator = ({ formValues, setFormValues, setComputedResult }) => {
  const { INTEREST_ONLY, REPAYMENT } = MORTGAGE_TYPE;

  const [errors, setErrors] = useState({});

  const mortgageTypeList = [
    {
      id: 1,
      name: "Repayment",
      value: REPAYMENT,
    },
    {
      id: 2,
      name: "Interest Only",
      value: INTEREST_ONLY,
    },
  ];

  const onFormSubmit = (e) => {
    e?.preventDefault();
    if (!hasAllRequiredValues(formValues)) {
      Object.keys(formValues)?.forEach((key) => {
        if (!formValues[key]) {
          setErrors((prevValues) => ({
            ...prevValues,
            [key]: "This field is required",
          }));
        }
      });
    } else {
      setErrors({});
      const { mortgageType } = formValues;
      if (mortgageType === INTEREST_ONLY) {
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
      totalRepayment: Number(mortgageAmount) + Number(totalInterest),
    };
  };

  const onClearAll = () => {
    setFormValues({
      mortgageAmount: "",
      mortgageType: "",
      mortgageTerm: "",
      interestRate: "",
    });
    setComputedResult(null);
  };

  return (
    <div className="w-auto px-8 px-8 py-8 md:w-1/2">
      <div className="pb-8 font-sans flex flex-col md:flex-row md:items-center items-start  justify-between">
        <h1 className="text-xl text-slate-900 font-bold">
          Mortgage Calculator
        </h1>
        <button
          type="button"
          className="text-slate-700 border-b-2 hover:text-slate-900 hover:border-slate-900"
          onClick={onClearAll}
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
          value={formValues?.["mortgageAmount"]}
          setValue={setFormValues}
          setErrors={setErrors}
        />
        <div className="flex flex-col  md:flex-row md:items-center justify-between items-start">
          <NumberInput
            name="mortgageTerm"
            label="Mortgage Term"
            icon="years"
            placement="right"
            className="w-full md:w-48"
            errors={errors}
            setValue={setFormValues}
            value={formValues?.["mortgageTerm"]}
            setErrors={setErrors}
          />
          <NumberInput
            name="interestRate"
            label="Interest Rate"
            icon="%"
            placement="right"
            className="w-full md:w-48"
            errors={errors}
            setValue={setFormValues}
            value={formValues?.["interestRate"]}
            setErrors={setErrors}
          />
        </div>
        <RadioButton
          name="mortgageType"
          label="Mortgage Type"
          options={mortgageTypeList}
          errors={errors}
          setValue={setFormValues}
          value={formValues?.["mortgageType"]}
          setErrors={setErrors}
        />
        <button
          className="w-full items-center bg-lime-500 py-3 px-9 rounded-full mt-7 transition-opacity hover:opacity-70 md:w-4/5"
          type="submit"
          name="calculate"
        >
          <div className="flex text-lg font-bold items-center justify-center text-slate-900">
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
