import React from "react";
import Select from "react-select";

export default function AddActivitySection(props) {

    const weekCheboxes = props.trainingData.map(day => {
        return (
            <div key={day.day}>
                <input 
                    type="checkbox"
                    id={day.day} 
                    name={day.day}
                    checked={day.checked}
                    onChange={props.weekDayChecked}
                    />
                <label htmlFor={day.day}>{day.day}</label>
            </div>
        )
    })

    const monthOptions = props.trainingData.map(day => {
        return { value: day.day, label: day.day}
    })

    return (
        <form className="add-activity-container">
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
                    {props.site === "week" ? 
                        weekCheboxes : 
                        <Select 
                        options={monthOptions}
                        isMulti
                        hideSelectedOptions={false} 
                        onChange={props.addToMonthState}
                        defaultValue={props.selectedMonthDays}
                        id="month-selected"/>}
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
            <button onClick={props.changeDataTraining}>Add to training plan</button>
        </form>
    )
}