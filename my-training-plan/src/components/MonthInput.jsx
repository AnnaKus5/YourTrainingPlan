import { useEffect } from "react";
import DatePicker from "react-multi-date-picker";


export default function MonthInput({ setCheckboxState, selectedMonth, setSelectedMonth, selectedDays, setSelectedDays }) {


    useEffect(() => {
        if (selectedDays instanceof Array) {
            selectedDays.map(day => {
                setCheckboxState(prev => {
                    return {
                        ...prev,
                        [day.day]: true
                    }
                })
            })

        }
    }, [selectedDays])

    return (
        <>
            <fieldset>
                <legend>Choose month:</legend>
                <DatePicker
                    onlyMonthPicker
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    placeholder="Choose month"
                    format="MMMM YYYY" />
            </fieldset>
            <fieldset>
                <legend>Choose days:</legend>
                <DatePicker
                    value={selectedDays}
                    onChange={setSelectedDays}
                    multiple={true}
                    weekStartDayIndex={1}
                    minDate={`${selectedMonth.year}/${selectedMonth.month.number}/1`}
                    maxDate={`${selectedMonth.year}/${selectedMonth.month.number}/${selectedMonth.month.length}`}
                />
            </fieldset>
        </>
    )
}