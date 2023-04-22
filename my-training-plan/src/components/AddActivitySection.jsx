import React, { useEffect, useState, useRef } from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import axios from "axios";
import MonthInput from "./MonthInput";
import WeekInput from "./WeekInput";

export default function AddActivitySection() {

    const [checkboxState, setCheckboxState] = useState(false)
    const [selectedDaysInMonth, setSelectedDaysInMonth] = useState(new Date())
    const [newActivity, setNewActivity] = useState({
        nameActivity: "",
        timeActivity: ""
    })
    // validation info: / state or separate func? it can't be ref:
    // add button should be enable if activity name is empty
    const [emptyActivity, setEmptyActivity] = useState(false)
    const { page, resourceUrl, getData, updateActivitySection, formSumbit, trainingData,setTrainingData, setFormSubmit } = useTrainingDataContext()
    

    const activityInput = useRef()
    const activityHourInput = useRef()

    useEffect(() => {

        setCheckboxState(page === "week" ?
            {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            } :
            {
                1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false,
                8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false,
                15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false,
                22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false,
                29: false, 30: false, 31: false
            })

        setNewActivity({
            nameActivity: "",
            timeActivity: ""
        })

        setSelectedDaysInMonth("")

    }, [page, formSumbit])

    //handleActivityChange
    function handleAvtivityState(e) {
        const { name, value } = e.target
        setNewActivity(prevActivity => {
            return {
                ...prevActivity,
                [name]: value
            }
        })
    }

    // getCheckboxWithTrueValue
    function getCheckboxWithTrueValue() {
        const days = Object.entries(checkboxState)

        let id = 1

        const arrOfIdSelectedDays = days.map(day => {
            const newDay = [...day, id]
            id += 1
            return newDay
        }).
            filter(day => day[1] === true)
            .map(day => day[2])

        return arrOfIdSelectedDays
        //return arrOfId's -> daysToUpdateId
    }

    //change the name -> addActivity
    async function sendData(e) {
        e.preventDefault()

        const response = await axios.get(resourceUrl)
        const data = response.data

        const idsOfUpdatedDays = getCheckboxWithTrueValue();
        //getData
        const updatedTrainingData = trainingData.map(day => {
            if (idsOfUpdatedDays.includes(day.id)) {
                const newActivitySection = updateActivitySection(day, "add", null, newActivity)    
                return {
                    ...day,
                    activity: newActivitySection
                }
            } 
            return day;
        })

        const newData = {
            ...data,
            trainingData: updatedTrainingData
        }

        //patch nie działa tak jakbym chciała
        
        await axios.put(resourceUrl, newData)
        getData(resourceUrl, setTrainingData)

        //TO DO:
        //send all resource like save/delete/update plan
        //add walidation

    }


        // if (activityInput.current.value !== "") {
        //     const days = checkboxStateWithTrueValue()
        //     //I can't send data that way
        //     for (const day of days) {
        //         const id = day[2]
        //         const response = await axios.get(`${resourceUrl}/${id}`)
        //         const data = response.data
        //         const updatedData = {
        //             ...data,
        //             activity: [
        //                 ...data.activity,
        //                 {
        //                     activityId: data.activity.length + 1,
        //                     activityName: newActivity.nameActivity,
        //                     activityTime: newActivity.timeActivity,
        //                     markAsDone: false
        //                 }
        //             ]
        //         }

        //         await axios.put(`${resourceUrl}/${id}`, updatedData)
        //         setFormSubmit(prev => !prev)
        //         setEmptyActivity(false)

        //     }

        // } else {
        //     setEmptyActivity(true)
        // }
    


    return (
        <form
            className={page === "week" ? "week-add-activity-container" : "month-add-activity-container"}>
            {page === "month" &&
                <MonthInput
                    setCheckboxState={setCheckboxState}
                    selectedDaysInMonth={selectedDaysInMonth}
                    setSelectedDaysInMonth={setSelectedDaysInMonth} />}
            <div className={page === "month" ? "month-input-container input-container" : "input-container"} >
                <fieldset>
                    <legend>Activity name:</legend>
                    <input
                        type="text"
                        placeholder="Add activity"
                        name="nameActivity"
                        id="nameActivity"
                        className="activity-input"
                        value={newActivity.nameActivity}
                        onChange={(e) => handleAvtivityState(e)}
                        ref={activityInput} />
                        { emptyActivity && <p className="empty-activity-info">Add activity name!</p>}
                </fieldset>
            </div>
            <div className="input-container">
                {page === "week" &&
                    <WeekInput
                        checkboxState={checkboxState}
                        setCheckboxState={setCheckboxState} />
                }
            </div>
            <div className={page === "month" ? "month-input-container input-container" : "input-container"} >
                <fieldset>
                    <legend>Activity hour:</legend>
                    <input
                        type="text"
                        placeholder="Add activity hour"
                        name="timeActivity"
                        id="timeActivity"
                        className="activity-input"
                        value={newActivity.timeActivity}
                        onChange={(e) => handleAvtivityState(e)}
                        ref={activityHourInput} />
                </fieldset>
            </div>
            <button onClick={(e) => sendData(e)}>Add activity</button>
        </form>
    )
}