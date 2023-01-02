import React from "react";
import Select from "react-select";
import { useTrainingDataContext } from "./TrainingDataContext";

export default function AddActivitySection() {

    const {page, 
        trainingData, 
        weekDayChecked,
        addDataToTrainingPlan, 
        selectedMonthDays, 
        setSelectedMonthDays, 
        activityInput, 
        activityHourInput} = useTrainingDataContext()


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

    const weekCheboxes = trainingData.map(day => {
        return (
            <div key={day.day}>
                <input 
                    type="checkbox"
                    id={day.day} 
                    name={day.day}
                    checked={day.checked}
                    onChange={weekDayChecked}
                    />
                <label htmlFor={day.day}>{day.day}</label>
            </div>
        )
    })

    const monthOptions = trainingData.map(day => {
        return { value: day.day, label: day.day}
    })

    return (
        <form style={page === "week" ? stylesWeek.addActivityContainer : styleMonth.addActivityContainer}>
            <div style={page ==="month" ? styleMonth.inputContainer : null}
            className="input-container"
            >
            <label htmlFor="activity">Add Activity</label>
            <input
            type="text"
            placeholder="Add activity"
            name="activity"
            id="activity"
            ref={activityInput}
            />
            </div>
            <div className="input-container">
            <fieldset>
                <legend>Choose days</legend>
                <div>
                    {page === "week" ? 
                        weekCheboxes : 
                        <Select 
                        options={monthOptions}
                        isMulti
                        hideSelectedOptions={false} 
                        onChange={(selected) => setSelectedMonthDays(selected)}
                        value={selectedMonthDays}
                        id="month-selected"/>}
                </div>
            </fieldset>
            </div>
            <div style={page ==="month" ? styleMonth.inputContainer : null}
            className="input-container">
            <label htmlFor="activityHour">Add activity hour</label>
            <input
            type="text"
            placeholder="Activity hour"
            name="activityHour"
            id="activityHour"
            ref={activityHourInput}
            />
            </div>
            <button onClick={addDataToTrainingPlan}>Add to training plan</button>
        </form>
    )
}