import { useContext, useState } from 'react'
import './App.css'

import { Route, Routes, useNavigate, Navigate } from 'react-router'
import Layout from './components/layout/Layout'
import { HomePage } from './components/pages/HomePage'
import { GamePage } from './components/pages/GamePage'
import { LoginPage } from './components/pages/LoginPage'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { AuthProvider } from './contexts/AuthProvider'
import { AuthContext } from './contexts/AuthContext'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import {InstructionsPage} from './components/pages/InstructionsPage'
import { RankingsPage } from './components/pages/RankingsPage'

function App() {

  const {user} = useContext(AuthContext);

  return (
    <>

      <Routes>
        <Route element={<Layout />}>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/instructions" element={<InstructionsPage/>} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <LoginPage />}
          />

          
          <Route element={<ProtectedRoute />}>
            <Route path="/game" element={<GamePage />} />

            <Route path="/rankings" element={<RankingsPage />} />
          </Route>


          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
