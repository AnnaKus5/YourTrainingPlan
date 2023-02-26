import React, { createContext, useContext, useEffect, useState } from "react";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({ children }) => {

  const [page, setPage] = useState("week")
  const [trainingData, setTrainingData] = useState([])
  const [url, setUrl] = useState(`http://localhost:3000/training-data-${page}`)

  useEffect(() => {
    setUrl(`http://localhost:3000/training-data-${page}`)
  }, [page])


  return (
    <TrainingDataContext.Provider value={{
      page, setPage,
      trainingData, setTrainingData,
      url, setUrl
    }}>
      {children}
    </TrainingDataContext.Provider>
  )
}

const useTrainingDataContext = () => {
  return useContext(TrainingDataContext)
}

export { TrainingDataProvider, useTrainingDataContext }
