import { useState } from 'react'
import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import React from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './components/home/Homepage'
import Login from './components/Login'
import MentorLogin from './components/MentorLogin'
import RankPredictor from './components/home/RankPredictor'
import { RequestProvider } from './context/RequestContext'

function App() {
  return (
    <>
      <Header />
      <RequestProvider>
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/m" element={<MentorLogin />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/predictor" element={<RankPredictor />} />
        </Routes>
      </RequestProvider>
      <Footer />
    </>
  )
}

export default App
