import { useState, useEffect, useRef } from 'react'
import './App.css'
import AddActivitySection from './components/AddActivitySection'
import WeekPage from './components/WeekPage'
import MonthPage from "./components/MonthPage"

export default function App() {

  const [ page, setPage ] = useState("week")
  const [ trainingData, setTrainingData ] = useState(createTrainingData())
  const [ selectedMonthDays, setSelectedMonthDays ] = useState(null)
  const [ formSumbit, setFormSubmit ] = useState(false)

  const activityInput = useRef()
  const activityHourInput = useRef()

  useEffect(() => {
    setTrainingData(createTrainingData())
  }, [page])

  useEffect(() => {
      activityInput.current.value = ""
      activityHourInput.current.value = ""
  }, [formSumbit])

      
  function createTrainingData() {
    const days = page === "week" ? ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] :
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    const data = days.map(day => {
      return {
        day: day, 
        activity: [],
        checked: false
      }
    })
    return data;
  }

  function changePlan(event) {
    setPage(() => {
      if (event.target.id === "week-button") return "week"
      if (event.target.id === "month-button") return "month"
    })
  }


  function changeDataTraining (event) {
    // inna nazwa ? addDataToTrainingPlan

    event.preventDefault()

    if (page === "month") monthDayChecked()

    setTrainingData((prevTrainingData) => {
      let newActivity = activityInput.current.value
      let newActivityHour = activityHourInput.current.value 

      return prevTrainingData.map(day => {
        if (day.checked) {
          return {
            ...day, 
            activity: day.activity.length > 0 ?
               [...day.activity, { newActivity, newActivityHour }] :
               [{ newActivity, newActivityHour }],
            checked: !day.checked
          } 
        } else {
          return day
        }
      })
    })

    setSelectedMonthDays(null)
    setFormSubmit(prevFormSumbit => !prevFormSumbit)
  }

  function weekDayChecked(event) {
    const selectDay = event.target.name;

    setTrainingData(prevTrainingData => {
      return prevTrainingData.map(day => {
        if (day.day === selectDay) {
          return {
            ...day,
            checked: !day.checked
          }
        } else {
          return day
        }
      })
    })
  }

  function addToMonthState(selected) {
    setSelectedMonthDays(() => {
      return selected
    })
  }

  function monthDayChecked() {

    const addedDay = selectedMonthDays.map(day => {
      return day.value;
    })

    addedDay.map(daynumber => {
      setTrainingData(prevTrainingData => {
        return prevTrainingData.map(day => {
          if(day.day === daynumber) {
            return {
              ...day, 
              checked: !day.checked
            }
          } else {
            return day
          }
        })
      })
    })
  }

  function deletePlan() {
    props.setTrainingData(props.createTrainingData())
}

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
    <>
    <header>
      <img className="logo-img" src="src\images\dumbbell-color.png" alt="logo" />
      <h1 className="logo">Your Training Plan</h1>
      </header>
    <nav>
      <button onClick={changePlan} className="nav-button" id="week-button">WEEK</button>
      <button onClick={changePlan} className="nav-button" id="month-button">MONTH</button>
    </nav>
    <main style={page === "week" ? styleWeek.mainContainer : styleMonth.mainContainer}
    // className="main-container"
    >
        <AddActivitySection 
        page={page}
        trainingData={trainingData} 
        weekDayChecked={weekDayChecked} 
        monthDayChecked={monthDayChecked}
        changeDataTraining={changeDataTraining}
        selectedMonthDays={selectedMonthDays}
        setSelectedMonthDays={setSelectedMonthDays}
        addToMonthState={addToMonthState}
        activityInput={activityInput}
        activityHourInput={activityHourInput}/>
      {page === "week" ? 
        <WeekPage 
        trainingData={trainingData}
        setTrainingData={setTrainingData}
        createTrainingData={createTrainingData}
        deletePlan={deletePlan}/> : 
        <MonthPage 
        trainingData={trainingData}
        setTrainingData={setTrainingData}
        createTrainingData={createTrainingData}
        deletePlan={deletePlan}/>
        }
    </main>
    </>
  )
}


// Training Data Context, useTrainingData()
// WeekPage, MonthPage, Add Activity Section

// trainingData={trainingData}
// setTrainingData={setTrainingData}
// createTrainingData={createTrainingData}
// deletePlan={deletePlan}


// SubmitFormContext, useSumbitFormContext
// AddActivitySection
 
// weekDayChecked={weekDayChecked} 
// monthDayChecked={monthDayChecked}
// selectedMonthDays={selectedMonthDays}
// setSelectedMonthDays={setSelectedMonthDays}
// addToMonthState={addToMonthState}
// activityInput={activityInput}
// activityHourInput={activityHourInput}
// changeDataTraining={changeDataTraining}
