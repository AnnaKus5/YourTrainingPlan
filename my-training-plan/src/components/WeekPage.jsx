import React from "react";
import {nanoid} from "nanoid"
import { useTrainingDataContext } from "./TrainingDataContext";

export default function WeekPage() {

    const { trainingData, trainingData2, deletePlan} = useTrainingDataContext()

        
        const weekElements = trainingData.map(day => {
        
        const activityElements = day.activity.length > 0 ?
            day.activity.map(activity => {
                return (
                    <p key={nanoid()} className="activity">{activity.activityTime} {activity.activityName}</p>
                )
            }) : ""

        return (
            <div key={day.day} className="day-container">
                <p className="day-name">{day.day}</p>
                <div className="day-square">
                    {activityElements}
                </div>
            </div>
        )
    })


    return (
        <div className="week-section-container">
            { weekElements}
            <button onClick={deletePlan}>Delete plan</button>
            {/* <button onClick={deletePlan}>Download plan</button> */}
        </div>
    )
}