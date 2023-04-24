import { useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { useOutletContext } from "react-router-dom";


export default function MonthInput({ setCheckboxState, setSelectedDaysInMonth, selectedDaysInMonth, validationInfo }) {

    const { selectedMonth, setSelectedMonth } = useOutletContext()

    useEffect(() => {
        if (selectedDaysInMonth instanceof Array) {
            selectedDaysInMonth.map(day => {
                setCheckboxState(prev => {
                    return {
                        ...prev,
                        [day.day]: true
                    }
                })
            })

        }
    }, [selectedDaysInMonth])

    return (
        <>
            <fieldset>
                <legend>Select month:</legend>
                <DatePicker
                    onlyMonthPicker
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    placeholder="Choose month"
                    format="MMMM YYYY" />
            </fieldset>
            <fieldset>
                <legend>Select days:</legend>
                <DatePicker
                    value={selectedDaysInMonth}
                    onChange={setSelectedDaysInMonth}
                    multiple={true}
                    weekStartDayIndex={1}
                    minDate={`${selectedMonth.year}/${selectedMonth.month.number}/1`}
                    maxDate={`${selectedMonth.year}/${selectedMonth.month.number}/${selectedMonth.month.length}`}
                    />
                    {validationInfo.emptySelectedDays && <p className="empty-activity-info">Select days!</p>}
            </fieldset>
        </>
    )
}