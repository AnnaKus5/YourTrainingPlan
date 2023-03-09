import { useEffect, useState } from "react"
import axios from "axios"
import { nanoid } from "nanoid"

export default function TrainingPlansArchive() {

    const [trainingDataArchive, setTrainingDataArchive] = useState()

    //get training data archives
    //map data to display saving plans
    //onClick event to display selected plan on the bottom

    //how refactor code to display selected data on week and month page? now display only training-data${page}

    async function getTrainingArchive(url) {
        const response = await axios.get(url)
        setTrainingDataArchive(response.data)
    }

    useEffect(() => {
        getTrainingArchive("http://localhost:3000/training-data-archive")
    }, [])

    const trainingPlans = trainingDataArchive ? 
        trainingDataArchive.map(plan => {
            return (
                <li key={nanoid()}>{plan.date}</li>
            )
        }) : 
        <p>Loading data...</p>

    return (
        <div>
            <h2>Your training plans</h2>
            <ul>
                {trainingPlans}
            </ul>
        </div>
    )
}