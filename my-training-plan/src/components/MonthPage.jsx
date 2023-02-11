import React from "react";
import { nanoid } from "nanoid";
import { useTrainingDataContext } from "./TrainingDataContext";


export default function MonthPage({dayInMonth}) {

    const { trainingData, deletePlan } = useTrainingDataContext()


    const monthElements =
        trainingData
            .filter(day => day.id <= dayInMonth)
            .map(day => {
                const activityElements = day.activity.length > 0 ?
                    day.activity.map(activity => {
                        return (
                            <p key={nanoid()} className="activity">{activity.activityTime} {activity.activityName}</p>
                        )
                    }) : ""

                return (
                    <div key={day.day} className="month-day-square">
                        <p className="day-name">{day.day}</p>
                        <div>
                            {activityElements}
                        </div>
                    </div>
                )
            })


    return (
        <>
            <div className="month-section-container">
                {monthElements}
            </div>
            <button onClick={deletePlan}>Delete plan</button>
        </>
    )
}