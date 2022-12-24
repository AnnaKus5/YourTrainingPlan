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
        activity: "",
        activityHour: "",
        checked: false
      }
    })
    return data;
  }

  // function findDays () {

  // }

  // function changeDataTraining () {
  //   setTrainingData(() => {

  //   })
  // }

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
      <AddActivitySection trainingData={trainingData}/>
    </main>
    </>
  )
}


