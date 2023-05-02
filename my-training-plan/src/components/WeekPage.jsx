import React, {useEffect} from "react";
import { useOutletContext } from "react-router-dom";
import AddActivitySection from "./AddActivitySection";
import SaveDeleteButtons from "./SaveDeleteButtons";
import { useTrainingDataContext } from "./TrainingDataContext";

export default function WeekPage({view, setIsPlanActive}) {

    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const { trainingData, setPage, handleActivityChange, url, setIsTopNavigationDisplay, isArchiveView, setIsArchiveView } = useTrainingDataContext()

    useEffect(() => {
        setPage("week")
        setIsTopNavigationDisplay(true)

        if(view === "archive") {
            setIsArchiveView(true)
        } else {
            setIsArchiveView(false)
        }
    }, [])

    const weekElements = trainingData.map(day => {

        const activityElements = day.activity.length > 0 ?
            day.activity.map(activity => {
                return (
                    <span key={activity.activityId} className="activity">
                        {activity.markAsDone ?
                            <img
                                src={currentSysIsDark ? "/images/checkbox-checked-white.png" : "/images/checkbox-checked.png"}
                                className="checkbox"
                                id={activity.activityId}
                                onClick={(e) => handleActivityChange(e, url, "done")} /> :
                            <img
                                src={currentSysIsDark ? "/images/checkbox-unchecked-white.png" : "/images/checkbox-unchecked.png"}
                                className="checkbox"
                                id={activity.activityId}
                                onClick={(e) => handleActivityChange(e, url, "done")} />}
                        <span>{activity.activityTime} {activity.activityName}</span>
                        <img 
                            src="\images\remove.png" 
                            className="remove-icon" 
                            id={activity.activityId} 
                            onClick={(e) => handleActivityChange(e, url, "delete")} />
                    </span>
                )
            }) : ""

        return (
            <div key={day.day} className="day-container" id={day.id}>
                <p className="day-name-week">{day.day}</p>
                <div className="week-day-square">
                    {activityElements}
                </div>
            </div>
        )
    })


    return (
        <main className="week-main-container">
            <AddActivitySection url={url}/>
            <div className="week-section-container">
                {weekElements}
                <SaveDeleteButtons view={view} setIsPlanActive={setIsPlanActive}/>
            </div>
        </main>
    )
}