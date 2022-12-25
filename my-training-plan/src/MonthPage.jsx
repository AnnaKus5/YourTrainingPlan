import React from "react";
// import './App.css'
import "./MonthPage.css"
import { nanoid } from "nanoid";

export default function MonthPage(props) {


    const monthElements = props.trainingData.map(day => {
        
        
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
            {monthElements}
            <button onClick={props.deletePlan}>Delete plan</button>
        </div>
    )
}