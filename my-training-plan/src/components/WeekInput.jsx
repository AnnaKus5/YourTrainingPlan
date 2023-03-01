import { useTrainingDataContext } from "./TrainingDataContext";
import { nanoid } from "nanoid";

export default function WeekInput({checkboxState, setCheckboxState}) {
    
    const { trainingData } = useTrainingDataContext()
    
    function handleWeekCheckboxState(e) {
        const {name} = e.target

        setCheckboxState(prev => {
            return {
                ...prev, 
                [name]: !prev[name]
                }
        })
    }

    const weekCheboxes = trainingData.map(day => {
        const name = day.day
        return (
            <div key={nanoid()}>
                <input
                    type="checkbox"
                    id={day.id}
                    name={name}
                    checked={checkboxState[name]}
                    onChange={handleWeekCheckboxState}
                />
                <label htmlFor={name}>{name}</label>
            </div>
        )}
    )

    return (
        <>
            <fieldset>
                <legend>Choose days</legend>
                <div>
                    {weekCheboxes}
                </div>
            </fieldset>
        </>
    )
}