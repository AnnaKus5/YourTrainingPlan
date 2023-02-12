import React, { useEffect, useState, useRef } from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import axios from "axios";
import MonthInput from "./MonthInput";
import WeekInput from "./WeekInput";

export default function AddActivitySection({ selectedMonth, setSelectedMonth, selectedDays, setSelectedDays, formSumbit, setFormSubmit }) {

    const activityInput = useRef()
    const activityHourInput = useRef()

    const { page,
        setTrainingData } = useTrainingDataContext()

    // const [formSumbit, setFormSubmit] = useState(false)
    const [checkboxState, setCheckboxState] = useState()
    const [newActivity, setNewActivity] = useState({
        nameActivity: "",
        timeActivity: ""
    })

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

        axios.get(`http://localhost:3000/training-data-${page}`)
            .then((response) => {
                setTrainingData(response.data)
            })

        setNewActivity({
            nameActivity: "",
            timeActivity: ""
        })

        setSelectedDays("")

    }, [page, formSumbit])


    function handleAvtivityState(e) {
        const { name, value } = e.target
        setNewActivity(prevActivity => {
            return {
                ...prevActivity,
                [name]: value
            }
        })
    }

    function createArrayWihTrueValue() {
        const days = Object.entries(checkboxState)

        let id = 1

        const arrWithId = days.map(day => {
            const newDay = [...day, id]
            id += 1
            return newDay
        })

        const arrWithTrueValue = arrWithId.filter(day => {
            return day[1] === true
        })

        return arrWithTrueValue
    }


    function sendData(e) {
        e.preventDefault()

        if (activityInput.current.value !== "") {

            const days = createArrayWihTrueValue()

            days.map(day => {
                const id = day[2]

                axios.get(`http://localhost:3000/training-data-${page}/${id}`)
                    .then(response => {
                        const data = response.data
                        const updatedData = {
                            ...data,
                            activity: [
                                ...data.activity,
                                {
                                    activityId: data.activity.length + 1,
                                    activityName: newActivity.nameActivity,
                                    activityTime: newActivity.timeActivity,
                                    markAsDone: false
                                }
                            ]
                        }
                        axios.put(`http://localhost:3000/training-data-${page}/${id}`, updatedData)
                            .then(() => setFormSubmit(prev => !prev))

                    })
            })

        } else {
            console.log("Add activity name!")
        }

    }

    return (
        <form
            className={page === "week" ? "week-add-activity-container" : "month-add-activity-container"}>
            {page === "month" &&
                <MonthInput
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    setCheckboxState={setCheckboxState}
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays} />}
            <div className={page === "month" ? "month-input-container input-container" : "input-container"} >
                <label htmlFor="nameActivity">Add Activity</label>
                <input
                    type="text"
                    placeholder="Add activity"
                    name="nameActivity"
                    id="nameActivity"
                    value={newActivity.nameActivity}
                    onChange={(e) => handleAvtivityState(e)}
                    ref={activityInput} />
            </div>
            <div className="input-container">
                {page === "week" &&
                    <WeekInput
                        checkboxState={checkboxState}
                        setCheckboxState={setCheckboxState} />
                }
            </div>
            <div className={page === "month" ? "month-input-container input-container" : "input-container"} >
                <label htmlFor="timeActivity">Add activity hour</label>
                <input
                    type="text"
                    placeholder="Activity hour"
                    name="timeActivity"
                    id="timeActivity"
                    value={newActivity.timeActivity}
                    onChange={(e) => handleAvtivityState(e)}
                    ref={activityHourInput} />
            </div>
            <button onClick={(e) => sendData(e)}>Add to training plan</button>
        </form>
    )
}