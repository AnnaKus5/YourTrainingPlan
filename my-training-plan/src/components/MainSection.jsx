import { useState } from "react"
import { useTrainingDataContext } from "./TrainingDataContext"
import { DateObject } from "react-multi-date-picker"
import axios from "axios";
import AddActivitySection from "./AddActivitySection"
import WeekPage from "./WeekPage"
import MonthPage from "./MonthPage"

export default function MainSection() {

    const [selectedMonth, setSelectedMonth] = useState(new DateObject())
    const [selectedDays, setSelectedDays] = useState(new Date())
    const [formSumbit, setFormSubmit] = useState(false)


    const dayInMonth = selectedMonth.month.length

    const { page, setTrainingData } = useTrainingDataContext()

    function markAsDone(e) {
        const checkboxId = Number(e.target.id)
        const dayId = e.target.parentElement.parentElement.parentElement.id

        axios.get(`http://localhost:3000/training-data-${page}/${dayId}`)
            .then(response => {
                const fullDay = response.data
                const activitySection = response.data.activity
                const updatedActivity = activitySection.map(activity => {
                    if (activity.activityId === checkboxId) {
                        return {
                            ...activity,
                            markAsDone: !activity.markAsDone
                        }
                    } else {
                        return activity
                    }
                })
                const updatedData = {
                    ...fullDay,
                    activity: updatedActivity
                }

                axios.put(`http://localhost:3000/training-data-${page}/${dayId}`, updatedData)
                    .then(() => {
                        axios.get(`http://localhost:3000/training-data-${page}`)
                            .then((response) => {
                                setTrainingData(response.data)
                            })
                    })
            })
    }

    function removeActivity(e) {
        const removeActivityId = Number(e.target.id)
        const dayId = e.target.parentElement.parentElement.parentElement.id

        axios.get(`http://localhost:3000/training-data-${page}/${dayId}`)
        .then(response => {
            const fullDay = response.data
            const activitySection = response.data.activity

            const updatedActivity = activitySection.filter(activity => {
                return activity.activityId !== removeActivityId
            })

            const updatedData = {
                ...fullDay, 
                activity: updatedActivity
            }

            axios.put(`http://localhost:3000/training-data-${page}/${dayId}`, updatedData)
            .then(() => {
                axios.get(`http://localhost:3000/training-data-${page}`)
                    .then((response) => {
                        setTrainingData(response.data)
                    })
            })

        })
    }

    function deletePlan() {
        axios.get(`http://localhost:3000/training-data-${page}`)
            .then((response) => {
                const { data } = response

                data.map(day => {
                    if(day.activity.length > 0) {
                        const emptyActivitiySection = {
                            ...day,
                            activity: []
                        }
                    axios.put(`http://localhost:3000/training-data-${page}/${day.id}`, emptyActivitiySection)
                    }
                })
            })
            .then(() => {
                //get all resource training-data-${page} and set new data to render it
                setFormSubmit(prev => !prev)
            })
    }

    return (
        <main className={page == "month" ? "main-container month-main-container" : "main-container"}>
            <AddActivitySection
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                formSumbit={formSumbit}
                setFormSubmit={setFormSubmit} />
            {page === "week" ?
                <WeekPage
                    markAsDone={markAsDone}
                    removeActivity={removeActivity}
                    deletePlan={deletePlan} /> :
                <MonthPage
                    dayInMonth={dayInMonth}
                    markAsDone={markAsDone}
                    removeActivity={removeActivity}
                    deletePlan={deletePlan} />
            }
        </main>
    )
}