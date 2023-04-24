import { useState } from "react"
import { useTrainingDataContext } from "./TrainingDataContext"
import { DateObject } from "react-multi-date-picker"
import axios from "axios";
import Header from "./Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function MainSection() {

    const [selectedMonth, setSelectedMonth] = useState(new DateObject())
    const [savePlanInfo, setSavePlanInfo] = useState({
        description: "",
        isInvalid: false,
        successfulSaveInfo: false
    })
    const { resourceUrl,
        setFormSubmit,
        page, trainingData,
        isTopNavigationDisplay,
        selectedArchiveId } = useTrainingDataContext()

    const dayInMonth = selectedMonth.month.length

    if(savePlanInfo.successfulSaveInfo) {
        setTimeout(() => {
            setSavePlanInfo(prev => {
                return {
                    ...prev,
                    successfulSaveInfo: false
                }

            })
        }, [5000])
    }

    function getFormatedDate() {
        const date = new Date()
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    async function savePlan() {

        if (savePlanInfo.description.length > 0) {
            const archiveData = {
                date: getFormatedDate(),
                description: savePlanInfo.description,
                trainingData: trainingData
            }

            await axios.post(`http://localhost:3000/training-data-${page}`, archiveData)

            setSavePlanInfo({
                description: "",
                isInvalid: false,
                successfulSaveInfo: true
            })
            deletePlan()
        } else {
            setSavePlanInfo(prev => {
                return {
                    ...prev,
                    isInvalid: true
                }
            })
        }

    }

    async function deletePlan() {
        const response = await axios.get(resourceUrl)
        const data = await response.data

        const emptyTrainingData = data.trainingData.map(day => {
            if (day.activity.length > 0) {
                return {
                    ...day,
                    activity: []
                }
            }
            return day;
        })

        const newData = {
            ...data,
            trainingData: emptyTrainingData
        }

        await axios.put(resourceUrl, newData)

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
                savePlanInfo,
                setSavePlanInfo
            }} />
        </>
    )
}