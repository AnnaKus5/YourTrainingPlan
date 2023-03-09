import React from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import { Link } from "react-router-dom";

export default function Navigation() {

  const {setPage} = useTrainingDataContext()

    return (
      <nav>
        <Link to="/week" ><button onClick={() => setPage("week")} className="nav-button" id="week-button">WEEK</button></Link>
        <Link to="/month"><button onClick={() => setPage("month")} className="nav-button" id="month-button">MONTH</button></Link>
        <Link to="/yourtrainingplans"><button className="nav-button" id="archive-button">MY PLANS</button></Link>
      </nav>
    )
}