import { useState } from "react"
import AddActivitySection from "./AddActivitySection"
import WeekPage from "./WeekPage"
import MonthPage from "./MonthPage"
import { useTrainingDataContext } from "./TrainingDataContext"

export default function MainSection() {

    const [selectedMonth, setSelectedMonth] = useState()


    const { page } = useTrainingDataContext()

    const styleMonth = {
        mainContainer: {
            display: "block"
        }
    }

    const styleWeek = window.innerWidth > 670 ? {
        mainContainer: {
            maxWidth: "1000px",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row-reverse"
        }
    } : {
        mainContainer: {
            margin: "4rem"
        }
    }

    return (
        <main style={page === "week" ? styleWeek.mainContainer : styleMonth.mainContainer}>
        <AddActivitySection 
            selectedMonth={selectedMonth}/>
        {page === "week" ? 
          <WeekPage /> : 
          <MonthPage 
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}/>
          }
      </main>
    )
}