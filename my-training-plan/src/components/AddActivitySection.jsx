import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { useTrainingDataContext } from "./TrainingDataContext";
import { nanoid } from "nanoid";
import axios from "axios";

export default function AddActivitySection() {

    const activityInput = useRef()
    const activityHourInput = useRef()

    const { page,
        trainingData,
        setTrainingData } = useTrainingDataContext()

    const [formSumbit, setFormSubmit] = useState(false)
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

    function handleWeekCheckboxState(e) {
        const {name} = e.target

        setCheckboxState(prev => {
            return {
                ...prev, 
                [name]: !prev[name]
                }
        })
    }

    function handleMonthCheckboxState(selected) {
        selected.map(day => {
            setCheckboxState(prev => {
                return {
                    ...prev, 
                    [day.value]: !prev[day.value]
                    }
            })
        } )
        // można wybrać tylko jeden dzień 
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
                axios.put(`http://localhost:3000/training-data-week/${day[2]}`,
                {
                    id: day[2],
                    day: day[0],
                    activity: [
                        {
                            activityId: 1, 
                            activityName: newActivity.nameActivity,
                            activityTime: newActivity.timeActivity,
                            markAsDone: false
                        }
                    ]
                })
            })
    
            setFormSubmit(prev => !prev)

        } else {
            console.log("Add activity name!")
        }
    }

    const weekCheboxes = trainingData.map(day => {
        const name = day.day
        return (
            <div key={nanoid()}>
                <input
                    type="checkbox"
                    id={day.id}
                    name={name}
                    checked={checkboxState[name]}
                    onChange={handleWeekCheckboxState}
                />
                <label htmlFor={name}>{name}</label>
            </div>
        )
    })

    const monthOptions = trainingData.map(day => {
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
    //przenieść do osobnego komponentu ze stylami?

    return (
        <form style={page === "week" ? addActivityStylesWeek.addActivityContainer : AddActivityStylesMonth.addActivityContainer}>
            <div style={page === "month" ? AddActivityStylesMonth.inputContainer : null}
                className="input-container"
            >
                <label htmlFor="nameActivity">Add Activity</label>
                <input
                    type="text"
                    placeholder="Add activity"
                    name="nameActivity"
                    id="nameActivity"
                    value={newActivity.nameActivity}
                    onChange={(e) => handleAvtivityState(e)}
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
                                onChange={(selected) => handleMonthCheckboxState(selected)}
                                value={checkboxState}
                                id="month-selected" />}
                    </div>
                </fieldset>
            </div>
            <div style={page === "month" ? AddActivityStylesMonth.inputContainer : null}
                className="input-container">
                <label htmlFor="timeActivity">Add activity hour</label>
                <input
                    type="text"
                    placeholder="Activity hour"
                    name="timeActivity"
                    id="timeActivity"
                    value={newActivity.timeActivity}
                    onChange={(e) => handleAvtivityState(e)}
                    ref={activityHourInput}
                />
            </div>
            <button onClick={(e) => sendData(e)}>Add to training plan</button>
        </form>
    )
}