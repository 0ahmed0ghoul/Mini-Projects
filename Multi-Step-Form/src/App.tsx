import { FormEvent, useState } from "react";
import { useMultistepForm } from "./useMultistepForm";
import { UserForm } from "./UserForm";
import { AddressForm } from "./AddressForm";
import { AccountForm } from "./AccountForm";

type FormData = {
  firstname: string;
  lastname: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstname: "",
  lastname: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>){
    setData(prev => {
      return{...prev, ...fields}
    })
  }

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    backStep,
    nextStep,
  } = useMultistepForm([
  <UserForm {...data} updateFields={updateFields} />, 
  <AddressForm {...data} updateFields={updateFields}/>,
   <AccountForm {...data} updateFields={updateFields} />]);

  function onsubmit(e: FormEvent) {
    e.preventDefault();
    nextStep();
  }
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "arial",
      }}
    >
      <form onSubmit={onsubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
            gap: ".5rem",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={backStep}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
}

export default App;
