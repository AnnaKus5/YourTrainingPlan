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
    const { setFormSubmit,
            page, 
            trainingData,
            isTopNavigationDisplay } = useTrainingDataContext()

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
                savePlanInfo,
                setSavePlanInfo
            }} />
        </>
    )
}