import { useOutletContext } from "react-router-dom"

export default function SaveDeleteButtons({ view }) {

    const { updatePlan,
            savePlan, 
            deletePlan,
            savePlanInfo,
            setSavePlanInfo } = useOutletContext()


    const archiveView = (
        <button key="upadate" className="save-button" onClick={updatePlan}>Update plan</button>
    )

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
        <button key="save" onClick={savePlan} className="save-button">Save plan</button>
    </div>
    )

    return (
        <>
        {view === "archive" && archiveView}
        {view !== "archive" && createPlanView}
        {savePlanInfo.successfulSaveInfo && <p className="green-info">Your plan has been saved! You can see it in MY PLANS</p>}
            <button onClick={deletePlan}>Delete plan</button>
        </>
    )
}