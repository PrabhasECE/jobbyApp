import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
