import { useState } from "react";
import { useTrainingDataContext } from "./TrainingDataContext";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";


export default function MonthInput({ checkboxState, setCheckboxState, selectedMonth, setSelectedMonth }) {

    const { trainingData } = useTrainingDataContext()

    const [selectedDays, setSelectedDays] = useState(new Date())

    console.log(selectedMonth)

    // ustawić min i max date na postawie otrzymanego obiektu selectedMonth

    return (
        <fieldset>
        <legend>Choose days</legend>
            <DatePicker 
                    value={selectedMonth} 
                    onChange={setSelectedDays}
                    multiple={true}
                    weekStartDayIndex={1}
                    minDate={selectedMonth}
                    maxDate={`${selectedMonth.year}/${selectedMonth.month.number}/${selectedMonth.month.length}`}
                    />
        </fieldset>
    )
}