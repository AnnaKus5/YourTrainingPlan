import React, { createContext, useContext, useState } from "react";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({ children }) => {

  const [page, setPage] = useState("month")
  const [trainingData, setTrainingData] = useState([])


  function changePlan(event) {
    setPage(() => {
      if (event.target.id === "week-button") return "week"
      if (event.target.id === "month-button") return "month"
    })
  }


  return (
    <TrainingDataContext.Provider value={{
      page, setPage,
      trainingData, setTrainingData,
      changePlan,
    }}>
      {children}
    </TrainingDataContext.Provider>
  )
}

const useTrainingDataContext = () => {
  return useContext(TrainingDataContext)
}

export { TrainingDataProvider, useTrainingDataContext }
