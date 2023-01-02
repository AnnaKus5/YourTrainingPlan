import React from "react"
import { TrainingDataContex } from "./TrainingDataContext"

export default function Navigation() {

    return (
    <TrainingDataContex.Consumer>
        <nav>
      <button onClick={changePlan} className="nav-button" id="week-button">WEEK</button>
      <button onClick={changePlan} className="nav-button" id="month-button">MONTH</button>
    </nav>
    </TrainingDataContex.Consumer>
    )
}