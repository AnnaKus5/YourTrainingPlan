import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({ children }) => {

  const [page, setPage] = useState("week")
  const [trainingData, setTrainingData] = useState([])
  const [selectedMonthDays, setSelectedMonthDays] = useState(null)
  const [formSumbit, setFormSubmit] = useState(false)

  const activityInput = useRef()
  const activityHourInput = useRef()


  useEffect(() => {
    axios.get(`http://localhost:3000/training-data-${page}`)
    .then((response) => {
      setTrainingData(response.data)
    })
  }, [page])


  useEffect(() => {
    activityInput.current.value = ""
    activityHourInput.current.value = ""
  }, [formSumbit])



  function createTrainingData() {

  }


  function changePlan(event) {
    setPage(() => {
      if (event.target.id === "week-button") return "week"
      if (event.target.id === "month-button") return "month"
    })
  }

  function deletePlan() {
    setTrainingData(createTrainingData())
  }


  function addDataToTrainingPlan(event) {

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

  function monthDayChecked() {

    const addedDay = selectedMonthDays.map(day => {
      return day.value;
    })

    addedDay.map(daynumber => {
      setTrainingData(prevTrainingData => {
        return prevTrainingData.map(day => {
          if (day.day === daynumber) {
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


  return (
    <TrainingDataContext.Provider value={{
      page, setPage,
      trainingData, setTrainingData,
      selectedMonthDays, setSelectedMonthDays,
      formSumbit, setFormSubmit,
      activityInput, activityHourInput,
      createTrainingData,
      changePlan, deletePlan,
      addDataToTrainingPlan,
      weekDayChecked, monthDayChecked,
    }}>
      {children}
    </TrainingDataContext.Provider>
  )
}

const useTrainingDataContext = () => {
  return useContext(TrainingDataContext)
}

export { TrainingDataProvider, useTrainingDataContext }
