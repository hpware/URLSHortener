import { useState, useEffect } from "react";

// Create tables
async function CreateDatabases({ set }: { set: any }) {
  //const req = await fetch("http://172.2.0.3/api/createdatabase", {
  //  method: "POST",
  //});
  //const res = await req.json();
  set("asdas");
}

// Pages
function StepCounter({ step }: { step: number }) {
  return <div>You are at {step}</div>;
}

function Init({ dbinfo, setdbinfo }: { dbinfo: any; setdbinfo: any }) {
  return (
    <div>
      {dbinfo === "" ? (
        <button
          onClick={() => {
            CreateDatabases(setdbinfo);
          }}
        >
          Create tables
        </button>
      ) : (
        <button disabled={true}>Create tables</button>
      )}
      <p>{String(dbinfo)}</p>
      <p>{dbinfo}</p>
    </div>
  );
}

function Email() {}

export default function SetupFlow() {
  const [step, setStep] = useState<number>(1);
  const [databaseinfo, setdatabaseinfo] = useState<string>("");
  return (
    <div>
      <div>Setup Wizard</div>
      <StepCounter step={step} />
      {step === 1 ? (
        <Init dbinfo={databaseinfo} setdbinfo={setdatabaseinfo} />
      ) : step === 2 ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
