import React from "react";

export default function WeekSection(props) {

    const weekElements = props.trainingData.map(day => {
        return (
            <div key={day.day} className="day-container">
                <p className="day-name">{day.day}</p>
                <div className="day-square"></div>
            </div>
        )
    })

    return (
        <div className="week-section-container">
            {weekElements}
        </div>
    )
}