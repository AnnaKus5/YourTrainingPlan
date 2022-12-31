import React from "react";
import Select from "react-select";

export default function AddActivitySection(props) {

    const stylesWeek = {
        addActivityContainer: {
            marginTop: "2rem",
            marginBottom: "2rem",
            maxWidth: "250px",
          }
    }

    const styleMonth = {
        addActivityContainer: {
            display: "flex", 
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center"
        },

        inputContainer: {
            display: "flex", 
            flexDirection: "column"
        }
    }

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
        <form style={props.page === "week" ? stylesWeek.addActivityContainer : styleMonth.addActivityContainer}>
            <div style={props.page ==="month" ? styleMonth.inputContainer : null}
            className="input-container"
            >
            <label htmlFor="activity">Add Activity</label>
            <input
            type="text"
            placeholder="Add activity"
            name="activity"
            id="activity"
            ref={props.activityInput}
            />
            </div>
            <div className="input-container">
            <fieldset>
                <legend>Choose days</legend>
                <div>
                    {props.page === "week" ? 
                        weekCheboxes : 
                        <Select 
                        options={monthOptions}
                        isMulti
                        hideSelectedOptions={false} 
                        onChange={props.addToMonthState}
                        value={props.selectedMonthDays}
                        id="month-selected"/>}
                </div>
            </fieldset>
            </div>
            <div style={props.page ==="month" ? styleMonth.inputContainer : null}
            className="input-container">
            <label htmlFor="activityHour">Add activity hour</label>
            <input
            type="text"
            placeholder="Activity hour"
            name="activityHour"
            id="activityHour"
            ref={props.activityHourInput}
            />
            </div>
            <button onClick={props.changeDataTraining}>Add to training plan</button>
        </form>
    )
}