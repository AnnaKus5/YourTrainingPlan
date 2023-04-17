import { useState } from "react"
import { useTrainingDataContext } from "./TrainingDataContext"
import { DateObject } from "react-multi-date-picker"
import axios from "axios";
import Header from "./Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function MainSection() {

    const [selectedMonth, setSelectedMonth] = useState(new DateObject())
    //savePlanInfo maybe better name
    const [savePlanData, setSavePlanData] = useState({
        description: "",
        isInvalid: false
    })
    const { setTrainingData, 
            resourceUrl, 
            setFormSubmit, 
            page, trainingData, 
            isTopNavigationDisplay, 
            selectedArchiveId } = useTrainingDataContext()

    const dayInMonth = selectedMonth.month.length

//very similar func in TrainingDataContext
    async function updateData(url, data) {
        await axios.put(url, data)
        const response = await axios.get(resourceUrl)
        setTrainingData(response.data)
    }


    async function markAsDone(e) {
        const checkboxId = Number(e.target.id)
        const dayId = e.target.parentElement.parentElement.parentElement.id

        const response = await axios.get(`${resourceUrl}/${dayId}`)
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
        updateData(`${resourceUrl}/${dayId}`, newData)
    }

    async function deleteSingleActivity(e) {
        const removeActivityId = Number(e.target.id)
        const dayId = e.target.parentElement.parentElement.parentElement.id

        const response = await axios.get(`${resourceUrl}/${dayId}`)
        const fullDay = response.data
        const activitySection = response.data.activity

        const updatedActivity = activitySection.filter(activity => {
            return activity.activityId !== removeActivityId
        })

        const newData = {
            ...fullDay,
            activity: updatedActivity
        }

        updateData(`${resourceUrl}/${dayId}`, newData)

    }

    async function savePlan() {

        if (savePlanData.description.length > 0) {
            const archiveData = {
                date: `${selectedMonth.month.name.toLocaleLowerCase()}${selectedMonth.year}`,
                length: page,
                description: savePlanData.description,
                trainingData: trainingData
            }
    
            await axios.post(`http://localhost:3000/training-data-archive`, archiveData)
            setSavePlanData({
                description: "",
                isInvalid: false
            })
            deletePlan()
        } else {
            setSavePlanData(prev => {
               return { ...prev,
                isInvalid: true }
               })
        }
    }

    //change to update any data, put or remove
    async function deletePlan() {
        const response = await axios.get(resourceUrl)
        const data = await response.data

        for (const day of data) {
            if (day.activity.length > 0) {
                const emptyActivitiySection = {
                    ...day,
                    activity: []
                }

                await axios.put(`${resourceUrl}/${day.id}`, emptyActivitiySection)
            }
        }

        setFormSubmit(prev => !prev)
    }

    async function updatePlan() {
        const id = selectedArchiveId.current
        const response = await axios.get(`http://localhost:3000/training-data-archive/${id}`)
        const data = await response.data

        const updatedData = {
            ...data,
            trainingData: trainingData
        }
        await axios.put(`http://localhost:3000/training-data-archive/${id}`, updatedData)
    }

    return (
        <>
            <Header />
            {isTopNavigationDisplay && <Navigation />}
            <Outlet context={{
                selectedMonth, 
                setSelectedMonth,  
                setFormSubmit,
                dayInMonth, 
                markAsDone, 
                deleteSingleActivity, 
                savePlan, 
                deletePlan, 
                updatePlan,
                savePlanData, 
                setSavePlanData
            }} />
        </>
    )
}