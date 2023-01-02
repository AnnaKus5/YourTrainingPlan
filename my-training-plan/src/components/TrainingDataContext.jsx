import { createContext, useContext, useState } from "react";

export const TrainingDataContex = createContext();

export function TrainingDataProvider ({children, page}) {

    const [ trainingData, setTrainingData ] = useState(createTrainingData())
    const [ selectedMonthDays, setSelectedMonthDays ] = useState(null)
    const [ formSumbit, setFormSubmit ] = useState(false)

    
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
    const activityInput = useRef()
    const activityHourInput = useRef()
    
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
      const defaulValue = {trainingData, setTrainingData}

      return (
        <TrainingDataContex.Provider value={defaulValue}>
            {children}
        </TrainingDataContex.Provider>
      )
}
