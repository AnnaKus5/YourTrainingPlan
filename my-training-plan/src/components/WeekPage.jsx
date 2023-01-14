import React from "react";
import {nanoid} from "nanoid"
import { useTrainingDataContext } from "./TrainingDataContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function WeekPage() {

    const { trainingData, trainingData2, deletePlan} = useTrainingDataContext()

    // const {isLoading, error, weekDays} = useQuery({
    //     queryKey: ["weekData"], 
    //     queryFn: () => {
    //         fetch("http://localhost:3000")
    //         .then(res => res.json())
    //     }
    // })

    // const query = useQuery(["days"], async () => {
    //     const response = await fetch("http://localhost:3000/trainingData")
    //     const data = await response.json()
    //     return data.week
    // })

    // const weekDays = query.data
    //dane pobierane z serwera zamiast ze stanu

        
        const weekElements = trainingData.map(day => {
        
        const activityElements = day.activity.length > 0 ?
            day.activity.map(activity => {
                return (
                    <p key={nanoid()} className="activity">{activity.newActivityHour} - {activity.newActivity}</p>
                )
            }) : ""

        return (
            <div key={day.day} className="day-container">
                <p className="day-name">{day.day}</p>
                <div className="day-square">
                    {activityElements}
                </div>
            </div>
        )
    })




    return (
        <div className="week-section-container">
            { weekElements}
            <button onClick={deletePlan}>Delete plan</button>
        </div>
    )
}