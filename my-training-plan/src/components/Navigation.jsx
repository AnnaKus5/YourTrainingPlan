import React from "react";
import { useTrainingDataContext } from "./TrainingDataContext";

export default function Navigation() {

    const {changePlan} = useTrainingDataContext()

    return (
      <nav>
        <button onClick={changePlan} className="nav-button" id="week-button">WEEK</button>
        <button onClick={changePlan} className="nav-button" id="month-button">MONTH</button>
      </nav>
    )
}