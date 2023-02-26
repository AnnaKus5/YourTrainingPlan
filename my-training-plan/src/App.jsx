import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WeekPage from './components/WeekPage'
import MonthPage from './components/MonthPage'
import WelcomePage from './components/WelcomePage'
import TrainingPlansArchive from './components/TrainingPlansArchive'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSection />}>
        <Route index element={<WelcomePage />}/>
        <Route path="week" element={<WeekPage /> }/>
        <Route path="month" element={<MonthPage />}/>
        <Route path="yourtrainingplans" element={<TrainingPlansArchive />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}