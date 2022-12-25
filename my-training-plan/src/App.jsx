import { useState, useEffect } from 'react'
import './App.css'
import AddActivitySection from './AddActivitySection'
import WeekPage from './WeekPage'
import MonthPage from "./MonthPage"

export default function App() {

  const [ site, setSite ] = useState("month")

  const [ trainingData, setTrainingData ] = useState(createTrainingData())

  useEffect(() => {
    setTrainingData(createTrainingData())
  }, [site])

  useEffect(() => {
    findInput("activity").value = ""
    findInput("activityHour").value = ""
    // jak usunać wybrane opcje z Select ?
  }, [trainingData[0].activity, 
      trainingData[1].activity, 
      trainingData[2].activity,
      trainingData[3].activity,
      trainingData[4].activity,
      trainingData[5].activity,
      trainingData[6].activity]
      )
      // do poprawy ? jak inaczej usunać wartość inputu
      // funkcja, która zwraca wszystkie zmienne trainingData[x].activity ?

  // const clearInput = trainingData.map(day => {
  //   return [trainingData.activity]
  // })
      
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

  // function checkValidForm(event) {
  // event.preventDefault()
  //   if (findInput("activity").value === "") {
  //     console.log("Add activity")
  //   }
      // if (checkbox?)
    //  changeDataTraining();
  // }

  function changeDataTraining (event) {

    event.preventDefault()

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
  }

  function weekDayChecked(event) {
    const selectedDay = event.target.name;
    setTrainingData(prevTrainingData => {
      return prevTrainingData.map(day => {
        if (day.day === selectedDay) {
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

  function monthDayChecked(selected) {
    const lastAddedDay = selected[selected.length - 1].value
    setTrainingData(prevTrainingData => {
      return prevTrainingData.map(day => {
        if(day.day === lastAddedDay) {
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

  function deletePlan() {
    props.setTrainingData(props.createTrainingData())
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
    <main className="main-container">
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
      <AddActivitySection 
        trainingData={trainingData} 
        weekDayChecked={weekDayChecked} 
        monthDayChecked={monthDayChecked}
        changeDataTraining={changeDataTraining}
        site={site}/>
    </main>
    </>
  )
}


