import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useTrainingDataContext } from "./TrainingDataContext";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";


export default function MonthPage({ selectedMonth, setSelectedMonth }) {

    const { trainingData, deletePlan } = useTrainingDataContext()

    const dayInMonth = selectedMonth ? selectedMonth.month.length : 28

    const monthPageStyles = {
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
        daySquare: {
            backgroundColor: "#EDF2F4",
            minWidth: "150px",
            maxWidth: "200px",
            minHeight: "80px",
            marginBottom: "1rem"
        }
    }

    const monthElements =
        trainingData
            .filter(day => day.id <= dayInMonth)
            .map(day => {
                const activityElements = day.activity.length > 0 ?
                    day.activity.map(activity => {
                        return (
                            <p key={nanoid()} className="activity">{activity.activityTime} {activity.activityName}</p>
                        )
                    }) : ""

                return (
                    <div key={day.day} className="day-container">
                        <p className="day-name">{day.day}</p>
                        <div style={monthPageStyles.daySquare}>
                            {activityElements}
                        </div>
                    </div>
                )
            })


    return (
        <>
            <div>
                <p>Choose month:</p>
                <DatePicker
                    onlyMonthPicker
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    placeholder="Choose month"
                    format="MMMM YYYY" />
            </div>
            <div style={monthPageStyles.monthSectionContainer}>
                {monthElements}
            </div>
            <button onClick={deletePlan}>Delete plan</button>
        </>
    )
}