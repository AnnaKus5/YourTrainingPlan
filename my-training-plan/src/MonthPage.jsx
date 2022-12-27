import React from "react";
// import './App.css'
import "./MonthPage.css"
import { nanoid } from "nanoid";

export default function MonthPage(props) {

    const styleMonth = {
        monthSectionContainer: window.innerWidth > 670 ? 
        {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", 
            gridTemplateRows: "1fr 1fr 1fr 1fr", 
            gap: "10px 10px"
        } :
        {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr", 
            gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", 
            gap: "10px 10px",
            gridAutoFlow: "column"
        },
        // mobile grid 4x7
        daySquare: {
            backgroundColor: "#EDF2F4",
            minWidth: "150px",
            maxWidth: "200px",
            minHeight: "80px",
            marginBottom: "1rem"
        }
    }


    const monthElements = props.trainingData.map(day => {
        
        
        const activityElements = day.activity.length > 0 ?
            day.activity.map(activity => {
                return (
                    <p key={nanoid()} className="activity">{activity.newActivityHour} - {activity.newActivity}</p>
                )
            }) : ""

        return (
            <div key={day.day} className="day-container">
                <p className="day-name">{day.day}</p>
                <div style={styleMonth.daySquare} 
                // className="day-square"
                >
                    {activityElements}
                </div>
            </div>
        )
    })
    return (
        <>
        <div style={styleMonth.monthSectionContainer}>
            {monthElements}
        </div>
        <button onClick={props.deletePlan}>Delete plan</button>
        </>
    )
}