import React, {useState} from "react";
import Select from "react-select";
import { useTrainingDataContext } from "./TrainingDataContext";
import { nanoid } from "nanoid";

export default function AddActivitySection() {

    // const {addActivityStylesWeek, AddActivityStylesMonth} = useStyles()

    const {page, 
        trainingData, 
        trainingData2,
        weekDayChecked,
        addDataToTrainingPlan, 
        selectedMonthDays, 
        setSelectedMonthDays, 
        activityInput, 
        activityHourInput} = useTrainingDataContext()

        
    const [newActivity, setNewActivity] = useState({
        selectedDay: {
        monday: false, 
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
        },
        activity: "",
        activityHour: null
    }) 
        console.log(newActivity)

    function addActivityToState(e) {
        setNewActivity(prevActivity => {
            const {name} = e.target
            return {
                ...prevActivity, 
                selectedDay: {
                    ...prevActivity.selectedDay,
                    [name]: !prevActivity.selectedDay[name]
                }
            }
        })
    }

    function handleChangeInput(e) {
        const {name, value} = e.target
        setNewActivity(prevActivity => {
            return {
                ...prevActivity,
                [name]: value
            }

        })
    }

    const weekCheboxes = trainingData2.map(day => {
        const name = day.day
        return (
            <div key={nanoid()}>
                <input 
                    type="checkbox"
                    id={name} 
                    name={name}
                    checked={newActivity.selectedDay[name]}
                    onChange={(e) => addActivityToState(e)}
                    />
                <label htmlFor={name}>{name}</label>
            </div>
        )
    })

    const monthOptions = trainingData2.map(day => {
        return { value: day.day, label: day.day }
    })



    const addActivityStylesWeek = {
        addActivityContainer: {
            marginTop: "2rem",
            marginBottom: "2rem",
            maxWidth: "250px",
          }
    }

    const AddActivityStylesMonth = {
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

    return (
        <form style={page === "week" ? addActivityStylesWeek.addActivityContainer : AddActivityStylesMonth.addActivityContainer}>
            <div style={page ==="month" ? AddActivityStylesMonth.inputContainer : null}
            className="input-container"
            >
            <label htmlFor="activity">Add Activity</label>
            <input
            type="text"
            placeholder="Add activity"
            name="activity"
            id="activity"
            value={newActivity.activity}
            onChange={(e) => handleChangeInput(e)}
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
            <div style={page ==="month" ? AddActivityStylesMonth.inputContainer : null}
            className="input-container">
            <label htmlFor="activityHour">Add activity hour</label>
            <input
            type="text"
            placeholder="Activity hour"
            name="activityHour"
            id="activityHour"
            value={newActivity.hour}
            onChange={(e) => handleChangeInput(e)}
            ref={activityHourInput}
            />
            </div>
            <button onClick={addDataToTrainingPlan}>Add to training plan</button>
        </form>
    )
}