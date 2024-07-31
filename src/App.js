import { useState } from "react";
import Calculator from "./components/Calculator";
import Result from "./components/Result";

function App() {
  const [formValues, setFormValues] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });
  const [computedResult, setComputedResult] = useState(null);

  return (
    <div className="md:bg-slate-100 w-screen md:h-screen md:flex md:items-center md:justify-center">
      <div className="flex items-center justify-center">
        <div className="w-full flex flex-col md:flex-row bg-white md:m-12 rounded-3xl w-3/5">
          <Calculator
            formValues={formValues}
            setFormValues={setFormValues}
            setComputedResult={setComputedResult}
          />
          <Result formValues={formValues} computedResult={computedResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
