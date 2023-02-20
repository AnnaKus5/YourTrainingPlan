import { useState } from "react"
import { useTrainingDataContext } from "./TrainingDataContext"
import { DateObject } from "react-multi-date-picker"
import axios from "axios";
import AddActivitySection from "./AddActivitySection"
import WeekPage from "./WeekPage"
import MonthPage from "./MonthPage"
import WelcomePage from "./WelcomePage";
import Header from "./Header";
import { Outlet, useOutletContext } from "react-router-dom";

export default function MainSection() {

    const [selectedMonth, setSelectedMonth] = useState(new DateObject())
    // const [selectedDays, setSelectedDays] = useState(new Date())
    const [formSumbit, setFormSubmit] = useState(false)

    const dayInMonth = selectedMonth.month.length
    const { page, setTrainingData } = useTrainingDataContext()

    async function updateData(url, data) {
        await axios.put(url, data)
        const response = await axios.get(`http://localhost:3000/training-data-${page}`)

        setTrainingData(response.data)
    }

    async function markAsDone(e) {
        const checkboxId = Number(e.target.id)
        const dayId = e.target.parentElement.parentElement.parentElement.id

        const response = await axios.get(`http://localhost:3000/training-data-${page}/${dayId}`)
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
        const newData = {
            ...fullDay,
            activity: updatedActivity
        }
        updateData(`http://localhost:3000/training-data-${page}/${dayId}`, newData)
    }

    async function deleteSingleActivity(e) {
        const removeActivityId = Number(e.target.id)
        const dayId = e.target.parentElement.parentElement.parentElement.id

        const response = await axios.get(`http://localhost:3000/training-data-${page}/${dayId}`)
        const fullDay = response.data
        const activitySection = response.data.activity

        const updatedActivity = activitySection.filter(activity => {
            return activity.activityId !== removeActivityId
        })

        const newData = {
            ...fullDay,
            activity: updatedActivity
        }

        updateData(`http://localhost:3000/training-data-${page}/${dayId}`, newData)

    }

    async function savePlan() {
        const response = await axios.get(`http://localhost:3000/training-data-${page}`)
        const { data } = response

        const archiveData = {
            // jak ustawić kolejne id?
            id: 3,
            date: `${selectedMonth.month.name.toLocaleLowerCase()}${selectedMonth.year}`,
            trainingData: data
        }

        await axios.post(`http://localhost:3000/training-data-archive`, archiveData)
        deletePlan()
    }

    async function deletePlan() {
        const response = await axios.get(`http://localhost:3000/training-data-${page}`)
        const data = await response.data

        for (const day of data) {
            if (day.activity.length > 0) {
                const emptyActivitiySection = {
                    ...day,
                    activity: []
                }

                await axios.put(`http://localhost:3000/training-data-${page}/${day.id}`, emptyActivitiySection)
            }
        }

        setFormSubmit(prev => !prev)

    }

    return (
        <>
            <Header />
            <Outlet context={{selectedMonth, setSelectedMonth, formSumbit, setFormSubmit, dayInMonth, markAsDone, deleteSingleActivity, savePlan, deletePlan}}/>
        </>

        // <main className={page == "month" ? "main-container month-main-container" : "main-container"}>
        //     <WelcomePage />
        //     <AddActivitySection
        //         selectedMonth={selectedMonth}
        //         setSelectedMonth={setSelectedMonth}
        //         formSumbit={formSumbit}
        //         setFormSubmit={setFormSubmit}
        //     />
        //     {page === "week" ?
        //         <WeekPage
        //             markAsDone={markAsDone}
        //             deleteSingleActivity={deleteSingleActivity}
        //             savePlan={savePlan}
        //             deletePlan={deletePlan} /> :
        //         <MonthPage
        //             dayInMonth={dayInMonth}
        //             markAsDone={markAsDone}
        //             deleteSingleActivity={deleteSingleActivity}
        //             savePlan={savePlan}
        //             deletePlan={deletePlan} />
        //     }
        // </main>
    )
}