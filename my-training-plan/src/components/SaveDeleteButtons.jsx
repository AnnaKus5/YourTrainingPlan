import { useOutletContext } from "react-router-dom"
import { useTrainingDataContext } from "./TrainingDataContext"
import axios from "axios"

export default function SaveDeleteButtons({ view, setIsPlanActive }) {

    const { savePlanInfo,
        setSavePlanInfo } = useOutletContext()

    const { trainingData, page, isArchiveView, url, setFormSubmit } = useTrainingDataContext()

    function getFormatedDate() {
        const date = new Date()
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    async function deletePlan() {

        if (isArchiveView) {
            await axios.delete(url)
            setIsPlanActive(false)

        } else {
            const response = await axios.get(url)
            const data = await response.data

            const emptyTrainingData = data.trainingData.map(day => {
                if (day.activity.length > 0) {
                    return {
                        ...day,
                        activity: []
                    }
                }
                return day;
            })

            const newData = {
                ...data,
                trainingData: emptyTrainingData
            }

            await axios.put(url, newData)
        }

        setFormSubmit(prev => !prev)
    }

    async function savePlan() {

        if (savePlanInfo.description.length > 0) {
            const archiveData = {
                date: getFormatedDate(),
                description: savePlanInfo.description,
                trainingData: trainingData
            }

            await axios.post(`https://rattle-honorable-neon.glitch.me//training-data-${page}`, archiveData)

            setSavePlanInfo({
                description: "",
                isInvalid: false,
                successfulSaveInfo: true
            })
            deletePlan()
        } else {
            setSavePlanInfo(prev => {
                return {
                    ...prev,
                    isInvalid: true
                }
            })
        }

    }

    const createPlanView = (
        <div className="save-plan-container">
            <fieldset className="save-button">
                <legend>Add plan's description</legend>
                <input
                    type="text"
                    placeholder="Add description"
                    value={savePlanInfo.description}
                    onChange={(e) => setSavePlanInfo(prev => (
                        {
                            ...prev,
                            description: e.target.value
                        }
                    ))}>
                </input>
                {savePlanInfo.isInvalid && <p className="empty-activity-info">Add description!</p>}
            </fieldset>
            <button key="save" onClick={savePlan} className="save-button">Save in My Plans</button>
        </div>
    )

    return (
        <>
            {view !== "archive" && createPlanView}
            {savePlanInfo.successfulSaveInfo && <p className="green-info">Your plan has been saved! You can see it in MY PLANS</p>}
            <button onClick={deletePlan}>Delete plan</button>
        </>
    )
}