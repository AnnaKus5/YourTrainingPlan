import React from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import { useOutletContext } from "react-router-dom";
import AddActivitySection from "./AddActivitySection";
import Navigation from "./Navigation";


export default function MonthPage() {

    const { selectedMonth, setSelectedMonth, formSumbit, setFormSubmit, dayInMonth, markAsDone, deleteSingleActivity, savePlan, deletePlan} = useOutletContext()
    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const {trainingData, setPage} = useTrainingDataContext() 

    setPage("month")

    const monthElements =
        trainingData
            .filter(day => day.id <= dayInMonth)
            .map(day => {
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
                            </p>)
                    }) : ""

                return (
                    <div key={day.day} className="month-day-square" id={day.id}>
                        <p className="day-name">{day.day}</p>
                        <div>
                            {activityElements}
                        </div>
                    </div>
                )
            })


    return (
        <>
        <Navigation />
            <AddActivitySection
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                formSumbit={formSumbit}
                setFormSubmit={setFormSubmit}
            />
            <div className="month-section-container">
                {monthElements}
            </div>
            <button onClick={savePlan} className="save-button">Save plan</button>
            <button onClick={deletePlan}>Delete plan</button>
        </>
    )
}