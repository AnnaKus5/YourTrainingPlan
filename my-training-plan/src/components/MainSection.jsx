import { useState } from "react"
import { useTrainingDataContext } from "./TrainingDataContext"
import { DateObject } from "react-multi-date-picker"
import AddActivitySection from "./AddActivitySection"
import WeekPage from "./WeekPage"
import MonthPage from "./MonthPage"

export default function MainSection() {

    const [selectedMonth, setSelectedMonth] = useState(new DateObject())
    const [selectedDays, setSelectedDays] = useState(new Date())

    const dayInMonth = selectedMonth.month.length

    const { page } = useTrainingDataContext()

    return (
        <main className={ page == "month" ? "main-container month-main-container" : "main-container"}>
        <AddActivitySection 
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}/>
        {page === "week" ? 
          <WeekPage /> : 
          <MonthPage 
          dayInMonth={dayInMonth}/>
          }
      </main>
    )
}