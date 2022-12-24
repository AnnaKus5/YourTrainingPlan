import { useState } from 'react'
import './App.css'
import WeekSection from './WeekSection'
import AddActivitySection from './AddActivitySection'

export default function App() {
  return (
    <>
    <header>
      <img className="logoImg" src="src\images\dumbbell-color.png" alt="logo" />
      <h1>Your Training Plan</h1>
      </header>
    <nav>
      <button className="nav-button" id="week-button">WEEK</button>
      <button className="nav-button" id="month-button">MONTH</button>
    </nav>
    <main className="main-container">
      <WeekSection />
      <AddActivitySection />
    </main>
    </>
  )
}

