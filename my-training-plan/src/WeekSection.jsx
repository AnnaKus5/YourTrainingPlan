import React from "react";

export default function WeekSection() {

    const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const weekElements = weekDays.map(day => {
        return (
            <div key={day} className="day-container">
                <p className="day-name">{day}</p>
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