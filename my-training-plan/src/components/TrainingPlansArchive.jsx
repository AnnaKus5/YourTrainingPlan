import { useEffect, useState } from "react"
import axios from "axios"

export default function TrainingPlansArchive() {

    const [trainingDataArchive, setTrainingDataArchive] = useState()

    //get training data archives
    //map data to display saving plans
    //onClick event to display selected plan

    //how refactor code to display selected data on week and month page? now display only training-data${page}

    async function getTrainingArchive(url) {
        const response = await axios.get(url)
        setTrainingDataArchive(response.data)


    }

    useEffect(() => {
        getTrainingArchive("http://localhost:3000/training-data-archive")
    }, [])

    console.log(trainingDataArchive)

    const trainingPlans = trainingDataArchive ? trainingDataArchive.map(plan => {
        return (
            <li>{plan.date}</li>
        )
    }) : <p>Loading data...</p>

    console.log(trainingPlans)

    return (
        <div>
            <h2>Your training plans</h2>
            <ul>
                {trainingPlans}
            </ul>
        </div>
    )
}