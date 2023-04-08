import { useEffect, useState } from "react"
import axios from "axios"
import { useTrainingDataContext } from "./TrainingDataContext"
import MonthPage from "./MonthPage"
import WeekPage from "./WeekPage"

export default function TrainingPlansArchive() {

    const [trainingDataArchive, setTrainingDataArchive] = useState()
    const [isPlanActive, setIsPlanActive] = useState(false)
    const { page, setPage, setTrainingData, setIsTopNavigationDisplay, selectedArchiveId, setSelectedArchiveId} = useTrainingDataContext()

    setIsTopNavigationDisplay(true)

    async function getTrainingData(url) {
        const response = await axios.get(url)
        setTrainingDataArchive(response.data)
    }

    useEffect(() => {
        getTrainingData("http://localhost:3000/training-data-archive")
    }, [])

    const listOfTrainingPlans = trainingDataArchive ? 
        trainingDataArchive.map(plan => {
            return (
                <tr key={plan.id} id={plan.id} onClick={handleClick} 
                    className={plan.id === selectedArchiveId && "selected-plan"}>
                    <td className="table-item">{plan.description}</td>
                    <td className="table-item">{plan.length}</td>
                    <td className="table-item">{plan.date}</td>
                    <td className="table-item"><button onClick={handleClick}>Edit</button></td>
                </tr>
            )
        }) : 
        <p>Loading data...</p>

    async function handleClick(e) {
        const id = e.target.parentElement.parentElement.id
        const response = await axios.get(`http://localhost:3000/training-data-archive/${id}`)
        await setPage(response.data.length)
        await setTrainingData(response.data.trainingData)
        await setSelectedArchiveId(response.data.id)
        await setIsPlanActive(true)
        // are all await nesessary?
    }

    return (
        <div>
            <h2>Your training plans</h2>
            <div className="training-plans-table">
            <table>
                <thead>
                    <tr>
                        <th colSpan={1}>Description</th>
                        <th colSpan={1}>Plan length</th>
                        <th colSpan={1}>Date</th>
                        <th colSpan={1}></th>
                    </tr>
                </thead>
                <tbody>
                    {listOfTrainingPlans}
                </tbody>
            </table>
            </div>
            {isPlanActive && page === "month" && <MonthPage view={"archive"} />}
            {isPlanActive && page === "week" && <WeekPage view={"archive"}/> }
        </div>
    )
}