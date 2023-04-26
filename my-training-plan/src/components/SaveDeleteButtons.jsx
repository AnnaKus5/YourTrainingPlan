import { useOutletContext } from "react-router-dom"
import { useTrainingDataContext } from "./TrainingDataContext"
import axios from "axios"

export default function SaveDeleteButtons({ view, setIsPlanActive }) {

    const { savePlan, 
            savePlanInfo,
            setSavePlanInfo } = useOutletContext()

    const { isArchiveView, url, setFormSubmit } = useTrainingDataContext()

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


    const createPlanView = (
        <div className="save-plan-container">
        <fieldset className="save-button">
            <legend>Add plan's description</legend>
            <input
                type="text"
                placeholder="Add description"
                value={savePlanInfo.description}
                onChange={(e) => setSavePlanInfo(prev => (
                    {...prev,
                        description: e.target.value}
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