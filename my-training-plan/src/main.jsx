import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TrainingDataProvider } from './components/TrainingDataContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TrainingDataProvider>
      <App />
    </TrainingDataProvider>
  </React.StrictMode>,
)
