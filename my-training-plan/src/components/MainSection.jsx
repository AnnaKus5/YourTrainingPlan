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

    // func send all Plan
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
                return {
                    ...prev,
                    isInvalid: true
                }
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
                savePlan,
                deletePlan,
                updatePlan,
                savePlanData,
                setSavePlanData
            }} />
        </>
    )
}