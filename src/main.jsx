import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"

// Set lang attribute for accessibility
document.documentElement.lang = 'en'

// Initialize dark mode from localStorage (defaults to light)
const initializeDarkMode = () => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

initializeDarkMode()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>,
)