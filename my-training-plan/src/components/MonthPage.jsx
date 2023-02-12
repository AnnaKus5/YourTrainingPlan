import React from "react";
import { nanoid } from "nanoid";
import { useTrainingDataContext } from "./TrainingDataContext";


export default function MonthPage({dayInMonth, markAsDone, removeActivity, savePlan, deletePlan}) {

    const { trainingData } = useTrainingDataContext()

    const monthElements =
        trainingData
            .filter(day => day.id <= dayInMonth)
            .map(day => {
                const activityElements = day.activity.length > 0 ?
                    day.activity.map(activity => {
                        return (
                            <p key={activity.activityId} className="activity">
                            {activity.markAsDone ?
                            <img src="src\images\checkbox-checked.png" className="checkbox" id={activity.activityId} onClick={markAsDone}/> :
                            <img src="src\images\checkbox-unchecked.png" className="checkbox" id={activity.activityId} onClick={markAsDone}/>} 
                            <span>{activity.activityTime} {activity.activityName}</span>
                            <img src="src\images\remove.png" className="remove-icon" id={activity.activityId} onClick={removeActivity}/>
                        </p>                        )
                    }) : ""

                return (
                    <div key={day.day} className="month-day-square" id={day.id}>
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
            <button onClick={savePlan} className="save-button">Save plan</button>
            <button onClick={deletePlan}>Delete plan</button>
        </>
    )
}