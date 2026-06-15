import { useState } from 'react'
import './App.css'

import { Route, Routes, useNavigate, Navigate } from 'react-router'
import Layout from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RankingPage } from './pages/RankingPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {


  return (
    <>
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <LoginPage />}
          />

          
          <Route element={<ProtectedRoute />}>
            <Route path="/game" element={<GamePage />} />

            
            <Route path="/ranking" element={<RankingPage />} />
          </Route>

        
          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
