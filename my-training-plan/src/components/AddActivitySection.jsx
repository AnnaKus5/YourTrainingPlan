import React, { useEffect, useState, useRef } from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import axios from "axios";
import MonthInput from "./MonthInput";
import WeekInput from "./WeekInput";

export default function AddActivitySection({url}) {

    const [checkboxState, setCheckboxState] = useState(false)
    const [selectedDaysInMonth, setSelectedDaysInMonth] = useState(new Date())
    const [newActivity, setNewActivity] = useState({
        nameActivity: "",
        timeActivity: ""
    })
    const [validationInfo, setValidationInfo] = useState({
        emptyActivity: false,
        emptySelectedDays: false
    })

    const { page, getData, updateActivitySection, trainingData,setTrainingData, formSumbit } = useTrainingDataContext()
    
    const selectedDaysInWeek = getCheckboxWithTrueValue()

    const isDaysSelected = selectedDaysInMonth.length > 0 || selectedDaysInWeek.length > 0 ? true : false

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

        setValidationInfo({
            emptyActivity: false,
            emptySelectedDays: false
        })

    }, [page, formSumbit])

    function handleActivityChange(e) {
        const { name, value } = e.target
        setNewActivity(prevActivity => {
            return {
                ...prevActivity,
                [name]: value
            }
        })
    }

    function getCheckboxWithTrueValue() {
        const days = Object.entries(checkboxState)

        let id = 1

        const arrOfIdSelectedDays = days.map(day => {
            const newDay = [...day, id]
            id += 1
            return newDay
        })
            .filter(day => day[1] === true)
            .map(day => day[2])

        return arrOfIdSelectedDays
    }

    async function handleAddActivity(e, url) {
        e.preventDefault()


        if (newActivity.nameActivity !== "" && isDaysSelected) {
            const response = await axios.get(url)
            const data = response.data
    
            const idsOfUpdatedDays = getCheckboxWithTrueValue();
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
            
            await axios.put(url, newData)
            getData(url, setTrainingData)

            setFormSubmit(prev => !prev)

        } else {
            if (newActivity.nameActivity === "" && !isDaysSelected) {
                setValidationInfo(prev => {
                    return {
                        emptyActivity: true, 
                        emptySelectedDays: true
                    }
                })
            }
            if (newActivity.nameActivity === "") {
                setValidationInfo(prev => {
                    return {
                        ...prev,
                        emptyActivity: true
                    }
                })
            }
            if (!isDaysSelected) {
                setValidationInfo(prev => {
                    return {
                        ...prev,
                        emptySelectedDays: true 
                    }
                })
            }
        }
    }


    return (
        <form
            className={page === "week" ? "week-add-activity-container" : "month-add-activity-container"}>
            {page === "month" &&
                <MonthInput
                    setCheckboxState={setCheckboxState}
                    selectedDaysInMonth={selectedDaysInMonth}
                    setSelectedDaysInMonth={setSelectedDaysInMonth}
                    validationInfo={validationInfo} />}
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
                        onChange={(e) => handleActivityChange(e)}
                        />
                        { validationInfo.emptyActivity && <p className="empty-activity-info">Add activity name!</p>}
                </fieldset>
            </div>
            <div className="input-container">
                {page === "week" &&
                    <WeekInput
                        checkboxState={checkboxState}
                        setCheckboxState={setCheckboxState}
                        validationInfo={validationInfo} />
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
                        onChange={(e) => handleActivityChange(e)}
                        />
                </fieldset>
            </div>
            <button onClick={(e) => handleAddActivity(e, url)}>Add activity</button>
        </form>
    )
}