import axios from "axios";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const TrainingDataContext = createContext()

const TrainingDataProvider = ({ children }) => {

  const [page, setPage] = useState("week")
  const [trainingData, setTrainingData] = useState([])
  const [formSumbit, setFormSubmit] = useState(false)
  const [isTopNavigationDisplay, setIsTopNavigationDisplay] = useState(false)
  const selectedArchiveId = useRef()

  let resourceUrl = page === "week" ? "http://localhost:3000/training-data-week" : "http://localhost:3000/training-data-month"
  //url must be global, url is the actual render data

  useEffect(() => {
    getData(resourceUrl, setTrainingData)
  }, [page, formSumbit])


  async function getData(url, state) {
    const response = await axios.get(url)
    state(response.data.trainingData)
  }

  async function sendData(url, data) {
    await axios.put(url, data)
  }

  async function handleActivityChange(url, action, arrayOfDays) {

    const actionID = Number(e.target.id)
    const dayID = e.target.parentElement.parentElement.parentElement.id

    const response = await axios.get(url)
    const trainingData = response.data.trainingData
    const fullDay = trainingData.filter(day => day.id === dayID)
    const newActivitySection = updateActivitySection(fullDay, action, actionID)

    const newDay = {
      ...fullDay,
      activity: newActivitySection
    }

    const newResource = {
      ...response.data,
      trainingData: [
        ...response.data.trainingData,
        ...response.data.trainingData[dayID - 1] = newDay
      ]
    }

    sendData(url, newResource)
    getData(url, setTrainingData)
  }

  function updateActivitySection(day, action, id) {
    const activitySection = day.activity;
    switch (action) {
        case "add": {
          //it can't works because we have to update many days with the same data
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
      resourceUrl,
      formSumbit,
      setFormSubmit,
      updateTrainingData,
      isTopNavigationDisplay,
      setIsTopNavigationDisplay,
      selectedArchiveId,
    }}>
      {children}
    </TrainingDataContext.Provider>
  )
}

const useTrainingDataContext = () => {
  return useContext(TrainingDataContext)
}

export { TrainingDataProvider, useTrainingDataContext }
