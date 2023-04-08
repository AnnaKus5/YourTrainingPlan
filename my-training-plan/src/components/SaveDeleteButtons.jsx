import { useOutletContext } from "react-router-dom"

export default function SaveDeleteButtons({ view, deletePlan, savePlan, savePlanData, setSavePlanData }) {

    const { updatePlan } = useOutletContext()

    const archiveView = (
        <button key={"upadate"} className="save-button" onClick={updatePlan}>Update plan</button>
    )
    const createPlanView = (
        <div className="save-plan-container">
        <fieldset className="save-button">
            <legend>Add plan's description</legend>
            <input
                type="text"
                placeholder="Add description"
                value={savePlanData.description}
                onChange={(e) => setSavePlanData(prev => (
                    {
                        ...prev,
                        description: e.target.value
                    }
                ))}>
            </input>
            {savePlanData.isInvalid && <p className="empty-activity-info">Add description!</p>}
        </fieldset>
        <button key={"save"} onClick={savePlan} className="save-button">Save plan</button>
    </div>
    )

    return (
        <>
        {view === "archive" && archiveView}
        {view !== "archive" && createPlanView}
            <button onClick={deletePlan}>Delete plan</button>
        </>
    )
}