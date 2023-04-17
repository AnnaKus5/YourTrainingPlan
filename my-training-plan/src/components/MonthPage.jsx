import React, { useEffect, useState } from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import { useOutletContext } from "react-router-dom";
import AddActivitySection from "./AddActivitySection";
import SaveDeleteButtons from "./SaveDeleteButtons";


export default function MonthPage({view}) {

    const { dayInMonth,
            markAsDone,
            deleteSingleActivity } = useOutletContext()
    const { trainingData, setPage, setIsTopNavigationDisplay } = useTrainingDataContext()
    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    useEffect(() => {
        setPage("month")
        setIsTopNavigationDisplay(true)
    }, [])

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

// is month-main-container styled?

    return (
        <main className="month-main-container"> 
            <AddActivitySection />
            <div className="month-section-container">
                {monthElements}
            </div>
            <SaveDeleteButtons view={view}/>
        </main>
    )
}