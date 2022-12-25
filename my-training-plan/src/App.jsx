import { useState, useEffect } from 'react'
import './App.css'
import WeekSection from './WeekSection'
import AddActivitySection from './AddActivitySection'

export default function App() {

  const [ trainingData, setTrainingData ] = useState(createTrainingData())

  useEffect(() => {
    findInput("activity").value = ""
    findInput("activityHour").value = ""
  }, [trainingData[0].activity, 
      trainingData[1].activity, 
      trainingData[2].activity,
      trainingData[3].activity,
      trainingData[4].activity,
      trainingData[5].activity,
      trainingData[6].activity]
      )
      //do poprawy ? jak usunać wartość inputu


  function createTrainingData() {
    const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const data = weekDays.map(day => {
      return {
        day: day, 
        activity: [],
        checked: false
      }
    })
    return data;
  }

  console.log(trainingData)

  function findInput(id) {
    return document.getElementById(id);
  }

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
      <WeekSection 
        trainingData={trainingData}
        setTrainingData={setTrainingData}
        createTrainingData={createTrainingData}
        />
      <AddActivitySection 
        trainingData={trainingData} 
        dayChecked={dayChecked} 
        changeDataTraining={changeDataTraining}/>
    </main>
    </>
  )
}


