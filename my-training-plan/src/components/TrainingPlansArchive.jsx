import { useEffect, useState } from "react"
import axios from "axios"
import { useTrainingDataContext } from "./TrainingDataContext"
import MonthPage from "./MonthPage"
import WeekPage from "./WeekPage"

export default function TrainingPlansArchive() {

    const [archiveData, setArchiveData] = useState()
    const [isPlanActive, setIsPlanActive] = useState(false)
    const { page, setPage, setTrainingData, setIsTopNavigationDisplay, selectedArchiveId} = useTrainingDataContext()
    
    
    useEffect(() => {
        setIsTopNavigationDisplay(true)
    }, [])

    //create global function getData
    async function getTrainingData(url) {
        const response = await axios.get(url)
        setArchiveData(response.data)

    }

    useEffect(() => {
        getTrainingData("http://localhost:3000/training-data-archive")
    }, [])

    const listOfTrainingPlans = 
        archiveData?.map(plan => {
            return (
                <tr key={plan.id} id={plan.id} onClick={handleClick} 
                    className={plan.id === selectedArchiveId.current ? "selected-plan" : undefined}>
                    <td className="table-item">{plan.description}</td>
                    <td className="table-item">{plan.length}</td>
                    <td className="table-item">{plan.date}</td>
                    <td className="table-item"><button onClick={handleClick}>Edit</button></td>
                </tr>
            )
        })

    async function updateResourceToEdit(url, data) {
        for (const day of data) {
            await axios.put(`${url}/${day.id}`, day)
        }
    }

    async function handleClick(e) {
        const id = e.target.parentElement.parentElement.id
        const response = await axios.get(`http://localhost:3000/training-data-archive/${id}`)
        const page = response.data.length
        setTrainingData(response.data.trainingData)
        await setPage(page)
        selectedArchiveId.current = response.data.id
        setIsPlanActive(true)
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