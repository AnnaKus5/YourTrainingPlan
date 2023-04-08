import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({ children }) => {

  const [page, setPage] = useState("week")
  const [trainingData, setTrainingData] = useState([])
  const [formSumbit, setFormSubmit] = useState(false)
  const [isTopNavigationDisplay, setIsTopNavigationDisplay] = useState(false)
  const [selectedArchiveId, setSelectedArchiveId] = useState()

  let resourceUrl = page === "week" ? "http://localhost:3000/training-data-week" : "http://localhost:3000/training-data-month" 


  async function updateTrainingData(url) {
    const response = await axios.get(url)
    setTrainingData(response.data)
  }
  
  useEffect(() => { 
    updateTrainingData(resourceUrl)
    }, [page, formSumbit])


  return (
    <TrainingDataContext.Provider value={{
      page, setPage,
      trainingData,
      setTrainingData,
      resourceUrl,
      formSumbit,
      setFormSubmit,
      updateTrainingData,
      isTopNavigationDisplay,
      setIsTopNavigationDisplay,
      selectedArchiveId, 
      setSelectedArchiveId
    }}>
      {children}
    </TrainingDataContext.Provider>
  )
}

const useTrainingDataContext = () => {
  return useContext(TrainingDataContext)
}

export { TrainingDataProvider, useTrainingDataContext }
