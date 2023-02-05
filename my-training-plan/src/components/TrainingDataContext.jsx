import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({ children }) => {

  const [page, setPage] = useState("month")
  const [trainingData, setTrainingData] = useState([])
  // const [formSumbit, setFormSubmit] = useState(false)



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
      // formSumbit, setFormSubmit,
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
