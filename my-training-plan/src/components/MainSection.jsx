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
    const { setFormSubmit, isTopNavigationDisplay } = useTrainingDataContext()

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

    return (
        <>
            <Header />
            {isTopNavigationDisplay && <Navigation />}
            <Outlet context={{
                selectedMonth,
                setSelectedMonth,
                setFormSubmit,
                dayInMonth,
                savePlanInfo,
                setSavePlanInfo
            }} />
        </>
    )
}