import React from "react";
import { useOutletContext } from "react-router-dom";
import AddActivitySection from "./AddActivitySection";
import SaveDeleteButtons from "./SaveDeleteButtons";
import { useTrainingDataContext } from "./TrainingDataContext";

export default function WeekPage({view}) {

    const { selectedMonth, 
        setSelectedMonth, 
        formSumbit, 
        setFormSubmit, 
        markAsDone, 
        deleteSingleActivity, 
        savePlan, 
        deletePlan,
        savePlanData,
        setSavePlanData } = useOutletContext()
    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const { trainingData, setPage, setIsTopNavigationDisplay } = useTrainingDataContext()

    setPage("week")
    setIsTopNavigationDisplay(true)

    const weekElements = trainingData.map(day => {

        const activityElements = day.activity.length > 0 ?
            day.activity.map(activity => {
                return (
                    <p key={activity.activityId} className="activity">
                        {activity.markAsDone ?
                            <img
                                src={currentSysIsDark ? "/images/checkbox-checked-white.png" : "/images/checkbox-checked.png"}
                                className="checkbox"
                                id={activity.activityId}
                                onClick={markAsDone} /> :
                            <img
                                src={currentSysIsDark ? "/images/checkbox-unchecked-white.png" : "/images/checkbox-unchecked.png"}
                                className="checkbox"
                                id={activity.activityId}
                                onClick={markAsDone} />}
                        <span>{activity.activityTime} {activity.activityName}</span>
                        <img src="\images\remove.png" className="remove-icon" id={activity.activityId} onClick={deleteSingleActivity} />
                    </p>
                )
            }) : ""

        return (
            <div key={day.day} className="day-container" id={day.id}>
                <p className="day-name">{day.day}</p>
                <div className="day-square">
                    {activityElements}
                </div>
            </div>
        )
    })


    return (
        <main className="week-main-container">
            <AddActivitySection
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                formSumbit={formSumbit}
                setFormSubmit={setFormSubmit}
            />
            <div className="week-section-container">
                {weekElements}
                <SaveDeleteButtons
                view={view}
                deletePlan={deletePlan}
                savePlan={savePlan}
                savePlanData={savePlanData}
                setSavePlanData={setSavePlanData} />
            </div>
        </main>
    )
}