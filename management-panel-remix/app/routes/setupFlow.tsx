import {useState, useEffect } from "react";

export default function SetupFlow() {
    const [step, setStep] = useState<number>(1);
    return (
        <div>
            <div>Setup Wizard</div>
            {step === 1 && 
            <div>
                
            </div>
            }
        </div>
    )
}