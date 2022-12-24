import { useState } from 'react'
import './App.css'
import WeekSection from './WeekSection'
import AddActivitySection from './AddActivitySection'

export default function App() {

  const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const [ trainingData, setTrainingData ] = useState(createTrainingData())

  function createTrainingData() {
    const data = weekDays.map(day => {
      return {
        day: day, 
        activity: [],
        checked: false
      }
    })
    return data;
  }

  // day: "monday"
  // activity: [{"yoga", "18:00"}, {"running", 7:00}]
  // checked: false

  // function findDays () {

  // }

  function findInput(id) {
    return document.getElementById(id);
  }

  function changeDataTraining () {
    setTrainingData((prevTrainingData) => {
      return prevTrainingData.map(day => {
        let newActivity = findInput("activity").value
        let newActivityHour = findInput("activityHour").value
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

  function dayChecked(event) {
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

  console.log(trainingData)

  return (
    <>
    <header>
      <img className="logoImg" src="src\images\dumbbell-color.png" alt="logo" />
      <h1>Your Training Plan</h1>
      </header>
    <nav>
      <button className="nav-button" id="week-button">WEEK</button>
      <button className="nav-button" id="month-button">MONTH</button>
    </nav>
    <main className="main-container">
      <WeekSection trainingData={trainingData}/>
      <AddActivitySection 
        trainingData={trainingData} 
        dayChecked={dayChecked} 
        changeDataTraining={changeDataTraining}/>
    </main>
    </>
  )
}


