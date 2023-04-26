import axios from "axios";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({ children }) => {

  const [page, setPage] = useState("week")
  const [trainingData, setTrainingData] = useState([])
  const [formSumbit, setFormSubmit] = useState(false)
  const [isTopNavigationDisplay, setIsTopNavigationDisplay] = useState(false)
  const selectedArchiveId = useRef()
  const [isArchiveView, setIsArchiveView] = useState(false)

  const resourceUrl = page === "week" ? "http://localhost:3000/training-data-week/1" : "http://localhost:3000/training-data-month/1"
  const archiveUrl = selectedArchiveId.current === undefined ? "" : `http://localhost:3000/training-data-${selectedArchiveId.current.plan}/${selectedArchiveId.current.id}`
  const url = isArchiveView ? archiveUrl : resourceUrl

  useEffect(() => {
    getData(url, setTrainingData)
  }, [page, formSumbit, url])


  async function getData(url, state) {
    const response = await axios.get(url)
    state(response.data.trainingData)
  }

  async function sendData(url, data) {
    await axios.put(url, data)
  }

  async function handleActivityChange(e, url, action) {

    const actionID = Number(e.target.id)
    const dayID = Number(e.target.parentElement.parentElement.parentElement.id)
    const response = await axios.get(url)
    const trainingData = response.data.trainingData
    const fullDay = trainingData[dayID - 1]
    const newActivitySection = updateActivitySection(fullDay, action, actionID)

    const newDay = {
      ...fullDay,
      activity: newActivitySection
    }

    const newTrainingData = [...trainingData]
    newTrainingData[dayID - 1] = newDay

    const newResource = {
      ...response.data,
      trainingData: newTrainingData
    }

    await sendData(url, newResource)
    getData(url, setTrainingData)
  }

  function updateActivitySection(day, action, id, newActivity) {
    const activitySection = day.activity;
    switch (action) {
        case "add": {
            return [
                ...activitySection,
                {
                    activityId: activitySection.length + 1,
                    activityName: newActivity.nameActivity,
                    activityTime: newActivity.timeActivity,
                    markAsDone: false
                }
            ]
        };
        case "done": {
            return activitySection.map(singleActivity => {
                if (singleActivity.activityId === id) {
                    return {
                        ...singleActivity,
                        markAsDone: !singleActivity.markAsDone
                    }
                } 
                return singleActivity;
            })
        };
        case "delete": {
            return activitySection.filter(activity => {
                return activity.activityId !== id
            })
        }
    }
}


  return (
    <TrainingDataContext.Provider value={{
      page, setPage,
      trainingData,
      setTrainingData,
      getData, sendData,
      handleActivityChange,
      updateActivitySection,
      url,
      formSumbit,
      setFormSubmit,
      isTopNavigationDisplay,
      setIsTopNavigationDisplay,
      selectedArchiveId, 
      isArchiveView, setIsArchiveView,
    }}>
      {children}
    </TrainingDataContext.Provider>
  )
}

const useTrainingDataContext = () => {
  return useContext(TrainingDataContext)
}

export { TrainingDataProvider, useTrainingDataContext }
