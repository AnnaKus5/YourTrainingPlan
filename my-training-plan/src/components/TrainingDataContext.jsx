import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({children}) => {

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

    function deletePlan() {
        setTrainingData(createTrainingData())
    }
  
  
    function addDataToTrainingPlan (event) {
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

export {TrainingDataProvider, useTrainingDataContext}