import React from "react";
import { useOutletContext } from "react-router-dom";
import AddActivitySection from "./AddActivitySection";
import Navigation from "./Navigation";
import { useTrainingDataContext } from "./TrainingDataContext";

export default function WeekPage() {

    const {selectedMonth, setSelectedMonth, formSumbit, setFormSubmit, markAsDone, deleteSingleActivity, savePlan, deletePlan} = useOutletContext() 
    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const { trainingData, setPage } = useTrainingDataContext()

    setPage("week")

    const weekElements = trainingData.map(day => {

        const activityElements = day.activity.length > 0 ?
            day.activity.map(activity => {
                return (
                    <p key={activity.activityId} className="activity">
                        {activity.markAsDone ?
                            <img 
                                src={currentSysIsDark ? "src/images/checkbox-checked-white.png" : "src/images/checkbox-checked.png"} 
                                className="checkbox" 
                                id={activity.activityId} 
                                onClick={markAsDone} /> :
                            <img 
                                src={currentSysIsDark ? "src/images/checkbox-unchecked-white.png" : "src/images/checkbox-unchecked.png"} 
                                className="checkbox" 
                                id={activity.activityId} 
                                onClick={markAsDone} />}
                        <span>{activity.activityTime} {activity.activityName}</span>
                        <img src="src\images\remove.png" className="remove-icon" id={activity.activityId} onClick={deleteSingleActivity} />
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
        <>
        <Navigation />
        <main className="week-main-container">
             <AddActivitySection
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                formSumbit={formSumbit}
                setFormSubmit={setFormSubmit}
                 />
            <div className="week-section-container">
                {weekElements}
                <button onClick={savePlan} className="save-button">Save plan</button>
                <button onClick={deletePlan}>Delete plan</button>
            </div>
            </main>
        </>
    )
}