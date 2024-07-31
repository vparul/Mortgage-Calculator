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

  return (
    <div className="bg-slate-100 h-screen w-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex bg-white m-12 rounded-3xl w-3/5">
          <Calculator formValues={formValues} />
          <Result formValues={formValues} />
        </div>
      </div>
    </div>
  );
}

export default App;
