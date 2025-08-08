import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const nextStep = () => {
        setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    };
    const backStep = () => {
        setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    }
    const goToStep = (stepIndex: number) => {
        setCurrentStepIndex((prev) => Math.min(Math.max(stepIndex, 0), steps.length -1));
    };
    return{
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        nextStep,
        backStep,
        goToStep,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length -1,
    }
}