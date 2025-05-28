"use client";
import { useState, useEffect } from "react";
import AgeFact from "../data/ageRange.json";

export default function Home() {
  const factList = AgeFact as Record<string, string[]>;

  const [loadSeeData, setLoadSeeData] = useState<boolean>(false);
  const [yob, setYob] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [isFinishCalculating, setIsFinishCalculating] =
    useState<boolean>(false);
  const [fact, setFact] = useState<string>("");

  useEffect(() => {
    if (loadSeeData) {
      setTimeout(() => {
        setLoadSeeData(false);
        setIsFinishCalculating(true);
      }, 2000);
    }
  }, [loadSeeData]);

  const getFunFact = (year: number) => {
    setLoadSeeData(true);
    setIsFinishCalculating(false);
    setFact("");
    // get the user age
    const calculatedAge: number = new Date().getFullYear() - year;
    setAge(calculatedAge);

    const randomIndexFacts: number = Math.floor(Math.random() * (5 - 0)) + 0; // generate random number between 0 till 4

    // get the fact based on the age
    const ageFactKeys = Object.keys(AgeFact);
    ageFactKeys.map((key) => {
      const ageRange = key.split("-");
      if (ageRange.length > 1) {
        const [min, max] = key.split("-").map(Number);
        if (calculatedAge >= min && calculatedAge <= max) {
          setFact(factList[key][randomIndexFacts]);
        }
      } else {
        const min = parseInt(key, 10);
        if (calculatedAge >= min) {
          setFact(factList[key][randomIndexFacts]);
        }
      }
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-jua)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-center">
        <h1 className="text-[24px] text-center">
          What did your age says about you?
        </h1>
        <input
          type="date"
          name="age"
          id="age"
          max={`${new Date().toISOString().split("T")[0]}`}
          className="border rounded p-2 border-primary w-full outline-none hover:cursor-pointer"
          onChange={(e) => {
            setYob(new Date(e.target.value).getFullYear());
          }}
        />
        <button
          type="submit"
          className="btn-primary rounded hover:cursor-pointer"
          disabled={loadSeeData}
          onClick={() => {
            getFunFact(yob);
          }}
        >
          See
        </button>
        {loadSeeData && (
          <div className="loading flex">
            <div className="circle me-3"></div>
            <div className="circle circle-2 me-3"></div>
            <div className="circle circle-3"></div>
          </div>
        )}
        {!loadSeeData && isFinishCalculating && (
          <div className="text-center">
            <p>You are {age} years old!</p>
            <p>{fact}</p>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>khairunnisa@2025</p>
      </footer>
    </div>
  );
}
