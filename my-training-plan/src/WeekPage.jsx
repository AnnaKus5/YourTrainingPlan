import React from "react";
import { useState, useEffect } from "react"
import WeekSection from "./WeekSection";

export default function WeekPage(props) {


    return (
        <WeekSection 
        trainingData={props.trainingData}
        setTrainingData={props.setTrainingData}
        createTrainingData={props.createTrainingData}
        deletePlan={props.deletePlan}
        />
    )
}

// zlikwidować weeksection ?