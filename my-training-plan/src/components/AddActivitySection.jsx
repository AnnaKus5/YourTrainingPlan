import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useTrainingDataContext } from "./TrainingDataContext";
import { nanoid } from "nanoid";
import axios from "axios";

export default function AddActivitySection() {

    const { page,
        trainingData,
        weekDayChecked,
        addDataToTrainingPlan,
        selectedMonthDays,
        setSelectedMonthDays,
        activityInput,
        activityHourInput } = useTrainingDataContext()

    const [checkboxState, setCheckboxState] = useState()
    const [selectDay, setSelectDay] = useState([])
    const [newActivity, setNewActivity] = useState({
        nameActivity: "",
        timeActivity: ""
    })

    console.log(newActivity)
    console.log(selectDay)
    console.log(checkboxState)

    //nie działa checkboxState


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
                1: false, 2: false, 3: false, 4: false
            })
    }, [page])


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
        const { name } = e.target

        // setSelectDay(prev => {
        //     return [...prev, name]
        // })

        setCheckboxState(prev => {
            return {
                ...prev,
                [name]: !prev[name]
            }
        })
    }

    function handleCheckbox() {
        setSelectDay(prev => {
            return [...prev, name]
        })
    }

    function handleChangeInput(e) {
        const { name, value } = e.target
        setNewActivity(prevActivity => {
            return {
                ...prevActivity,
                [name]: value
            }

        })
    }

    function sendData(e) {
        e.preventDefault()

        console.log("send data")

        // przygotować obiekt na podstawie danych ze stanu, który będzie można wysłać na server
        axios.put(`http://localhost:3000/training-data-week/7`, {
            id: 7,
            day: selectDay[0],
            activity: [
                {
                    activityId: 1,
                    activityName: newActivity.nameActivity,
                    activityTime: newActivity.timeActivity,
                    markAsDone: false
                }
            ]
        })
            .then(response => console.log(response.data))
            //ponowne renderowanie strony



        //  axios.get("http://localhost:3000/training-data-week?day=sunday")
        //     .then((response) => {
        //          const source = response.data 
        //          return source
        // })
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
                    onChange={handleCheckbox}
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
                    onChange={(e) => handleChangeInput(e)}
                    ref={activityHourInput}
                />
            </div>
            <button onClick={(e) => sendData(e)}>Add to training plan</button>
        </form>
    )
}