import './App.css'
import AddActivitySection from './components/AddActivitySection'
import WeekPage from './components/WeekPage'
import MonthPage from "./components/MonthPage"
import Navigation from './components/Navigation'
import { useTrainingDataContext } from './components/TrainingDataContext'

export default function App() {

  const { page } = useTrainingDataContext()

const styleMonth = {
  mainContainer: {
    display: "block"
  }
}

const styleWeek = window.innerWidth > 670 ? {
  mainContainer: {
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row-reverse"
  }
} : {
  mainContainer: {
    margin: "4rem"
  }
}

  return (
    <>
    <header>
      <img className="logo-img" src="src\images\dumbbell-color.png" alt="logo" />
      <h1 className="logo">Your Training Plan</h1>
    </header>
    <Navigation />
    <main style={page === "week" ? styleWeek.mainContainer : styleMonth.mainContainer}>
      <AddActivitySection />
      {page === "week" ? 
        <WeekPage /> : 
        <MonthPage />
        }
    </main>
    </>
  )
}

