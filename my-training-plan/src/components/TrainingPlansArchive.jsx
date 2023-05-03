import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useTrainingDataContext } from "./TrainingDataContext"
import MonthPage from "./MonthPage"
import WeekPage from "./WeekPage"

export default function TrainingPlansArchive() {

    const [archiveWeeks, setArchiveWeeks] = useState([])
    const [archiveMonths, setArchiveMonths] = useState([])
    const [isPlanActive, setIsPlanActive] = useState(false)
    const { page, setPage, setTrainingData, setIsTopNavigationDisplay, selectedArchiveId} = useTrainingDataContext()
    const archivePlan = useRef()

    useEffect(() => {
        setIsTopNavigationDisplay(true)
        getArchiveData("https://rattle-honorable-neon.glitch.me/training-data-week", setArchiveWeeks)
        getArchiveData("https://rattle-honorable-neon.glitch.me/training-data-month", setArchiveMonths)
    }, [isPlanActive])
    
    async function getArchiveData(url, state) {
        const response = await axios.get(url)
        state(response.data)
    }

    function createList(data) {
        const listOfTrainingPlans =
            data.map(plan => {
                if (plan.description === "workspace") return

                const planLength = plan.trainingData.length === 7 ? "week" : "month"

                const planId = `${planLength}-${plan.id}`

                return (
                    <tr key={planId} id={planId}
                        className={isPlanActive && planId === `${selectedArchiveId.current.plan}-${selectedArchiveId.current.id}` ? "selected-plan" : undefined}>
                        <td className="table-item">{plan.description}</td>
                        <td className="table-item">{planLength}</td>
                        <td className="table-item">{plan.date}</td>
                        <td className="table-item">
                            <button onClick={handleClick} data-plan={planLength} data-id={plan.id}>Edit</button>
                        </td>
                    </tr>
                )
            })
        return listOfTrainingPlans
    }

    const weekPlans = archiveWeeks.length > 0 ? createList(archiveWeeks) : []
    const monthPlans = archiveMonths.length > 0 ? createList(archiveMonths) : []

    async function handleClick(e) {
        archivePlan.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
        const id = e.target.getAttribute("data-id")
        const planLength = e.target.getAttribute("data-plan")
        selectedArchiveId.current = {plan: planLength, id: id}
        const response = await axios.get(`https://rattle-honorable-neon.glitch.me/training-data-${planLength}/${id}`)
        setTrainingData(response.data.trainingData)
        setPage(planLength)
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
                        {weekPlans}
                        {monthPlans}
                    </tbody>
                </table>
            </div>
            <div ref={archivePlan}>
            {isPlanActive && page === "month" && <MonthPage view={"archive"} setIsPlanActive={setIsPlanActive}/>}
            {isPlanActive && page === "week" && <WeekPage view={"archive"} setIsPlanActive={setIsPlanActive}/>}

            </div>
        </div>
    )
}