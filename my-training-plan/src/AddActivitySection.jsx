import React from "react";

export default function AddActivitySection() {

    const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const weekDaysCheboxes = weekDays.map(day => {
        return (
            <div>
                <input 
                    type="checkbox"
                    id={day} 
                    name={day}
                    />
                <label htmlFor={day}>{day}</label>
            </div>
        )
    })
    return (
        <div className="add-activity-container">
            <div className="input-container">
            <label htmlFor="activity">Add Activity</label>
            <input
            type="text"
            placeholder="Add activity"
            name="activity"
            id="activity"
            />
            </div>
            <div className="input-container">
            <fieldset>
                <legend>Choose days</legend>
                <div>
                    {weekDaysCheboxes}
                </div>
            </fieldset>
            </div>
            <div className="input-container">
            <label htmlFor="activityHour">Add activity hour</label>
            <input
            type="text"
            placeholder="Activity hour"
            name="activityHour"
            id="activityHour"
            />
            </div>
            <button>Add to training plan</button>
        </div>
    )
}