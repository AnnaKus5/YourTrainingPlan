import React from "react";

export default function AddActivitySection(props) {

    const weekDaysCheboxes = props.trainingData.map(day => {
        return (
            <div key={day.day}>
                <input 
                    type="checkbox"
                    id={day.day} 
                    name={day.day}
                    checked={day.checked}
                    />
                <label htmlFor={day.day}>{day.day}</label>
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