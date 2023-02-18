import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WeekPage from './components/WeekPage'

export default function App() {

  return (
    <>
    <Header />
    <MainSection />
    </>
  )
}


// function App1() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Header />}>
//         <Route index element={<MainSection />}/>
//         {/* create welcome page at Main Section*/}
//         <Route path="week" element={<WeekPage /> }/>
//         <Route path="month" element={<MonthPage />}/>
//         {/* AddActivitySection - where? move to WeekPage and MonthPage? */}
//         <Route path="yourtrainingplans" element={<TrainingPlansArchive />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }