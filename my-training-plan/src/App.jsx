import { useState, useEffect } from 'react'
import './App.css'
import AddActivitySection from './AddActivitySection'
import WeekPage from './WeekPage'
import MonthPage from "./MonthPage"

export default function App() {

  const [ site, setSite ] = useState("month")
  const [ trainingData, setTrainingData ] = useState(createTrainingData())
  const [ selectedMonthDays, setSelectedMonthDays ] = useState(null)
  const [ formSumbit, setFormSubmit ] = useState(false)

  useEffect(() => {
    setTrainingData(createTrainingData())
  }, [site])

  useEffect(() => {
      findInput("activity").value = ""
      findInput("activityHour").value = ""
  }, [formSumbit])

  //select nie czyści się po walidacji

  console.log(selectedMonthDays)

      
  function createTrainingData() {
    const days = site === "week" ? ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] :
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
    setSite(() => {
      if (event.target.id === "week-button") return "week"
      if (event.target.id === "month-button") return "month"
    })
  }

  function findInput(id) {
    return document.getElementById(id);
  } //useRef?


  function changeDataTraining (event) {

    event.preventDefault()

    if (site === "month") monthDayChecked()

    setTrainingData((prevTrainingData) => {
      let newActivity = findInput("activity").value
      let newActivityHour = findInput("activityHour").value 

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
    <main style={site === "week" ? styleWeek.mainContainer : styleMonth.mainContainer}
    // className="main-container"
    >
        <AddActivitySection 
        site={site}
        trainingData={trainingData} 
        weekDayChecked={weekDayChecked} 
        monthDayChecked={monthDayChecked}
        changeDataTraining={changeDataTraining}
        selectedMonthDays={selectedMonthDays}
        setSelectedMonthDays={setSelectedMonthDays}
        addToMonthState={addToMonthState}/>
      {site === "week" ? 
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


