import React from "react";
import {nanoid} from "nanoid"

export default function WeekSection(props) {

    const weekElements = props.trainingData.map(day => {
        
        
        const activityElements = day.activity.length > 0 ?
            day.activity.map(activity => {
                return (
                    <p key={nanoid()} className="activity">{activity.newActivityHour} - {activity.newActivity}</p>
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
            {weekElements}
            <button onClick={props.deletePlan}>Delete plan</button>
        </div>
    )
}