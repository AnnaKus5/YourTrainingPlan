import React from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import { Link } from "react-router-dom";

export default function Navigation() {

    const {changePlan} = useTrainingDataContext()

    return (
      <nav>
        <Link to="/week" ><button className="nav-button" id="week-button">WEEK</button></Link>
        <Link to="/month"><button className="nav-button" id="month-button">MONTH</button></Link>
      </nav>
    )
}