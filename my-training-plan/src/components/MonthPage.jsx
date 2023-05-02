import React, { useEffect, useState } from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import { useOutletContext } from "react-router-dom";
import AddActivitySection from "./AddActivitySection";
import SaveDeleteButtons from "./SaveDeleteButtons";


export default function MonthPage({view, setIsPlanActive}) {

    const { dayInMonth, selectedMonth } = useOutletContext()
    const { trainingData, setPage, setIsTopNavigationDisplay, handleActivityChange, url, setIsArchiveView, page } = useTrainingDataContext()
    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const year = selectedMonth.year
    const month = selectedMonth.month.number
    let firstDay = new Date(`${year}-${month}-01`).getDay()

    const weekDaysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => <th>{day}</th>)
    const weekDaysNameShort = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map(day => <th>{day}</th>)
    
    
    useEffect(() => {
        setPage("month")
        setIsTopNavigationDisplay(true)

        if(view === "archive") {
            setIsArchiveView(true)
        } else {
            setIsArchiveView(false)
        }
    }, [])

    const monthElements = []
    const emptyElements = []

    if (firstDay === 0) {
        for (let i = 0; i < 6; i++) {
            emptyElements.push(<th className="empty-month-elements">{""}</th>)
        }        
    } else {
        for (let i = 0; i < firstDay - 1; i++) {
            emptyElements.push(<th className="empty-month-elements">{""}</th>)
        }
    }


    monthElements.push(emptyElements)

    let row = []

    for (let i = 0; i < trainingData.length; i++) {

        const day = trainingData[i]

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
                                <span className="activity-name">{activity.activityTime} {activity.activityName}</span>
                                <img 
                                    src="\images\remove.png" 
                                    className="remove-icon" 
                                    id={activity.activityId} 
                                    onClick={(e) => handleActivityChange(e, url, "delete")} />
                            </span>)
                    }) : ""

        const content = (
            <th key={`${selectedMonth}-${day.day}`} className="month-day-square table-cell" id={day.id}>
                <span className="day-name">{day.day}</span>
                <div className="small-activity-icon">{activityElements.length > 0 ? <img src="/images/dumbbell-white.png"></img> : ""}</div>
                <div>
                    {activityElements}
                </div>
            </th>
        )

        if (monthElements[0].length < 7) {
            monthElements[0].push(content)
        } else  {
            row.push(content)
        }
        if (row.length === 7) {
            monthElements.push(row)
            row = []
        }

        if (i === trainingData.length - 1) {
            monthElements.push(row)
            row = []
        }

    }

    return (
        <main className="month-main-container"> 
            <AddActivitySection url={url}/>
            <table className="calendar-table">
                <thead>
                    <tr> 
                        {window.innerWidth > "640px" ? weekDaysName : weekDaysNameShort}
                    </tr>
                </thead>
                <tbody>
                    <tr className="calendar-row">{monthElements[0]}</tr>
                    <tr className="calendar-row">{monthElements[1]}</tr>
                    <tr className="calendar-row">{monthElements[2]}</tr>
                    <tr className="calendar-row">{monthElements[3]}</tr>
                    <tr className="calendar-row">{monthElements[4]}</tr>
                    {monthElements[5] && <tr className="calendar-row">{monthElements[5]}</tr>}
                </tbody>
            </table>

            <SaveDeleteButtons view={view} setIsPlanActive={setIsPlanActive}/>
        </main>
    )
}