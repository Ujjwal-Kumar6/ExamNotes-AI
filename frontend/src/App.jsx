import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Hero from './pages/Auth'
import getCurrentUser from './hooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Notes from './pages/Notes'
import History from './pages/History'
import Current from './pages/Current'
import Price from './pages/price'
import PamentCancel from './pages/PamentCancel'
import PametSuccess from './pages/PammetnSucces'

export const url = import.meta.env.VITE_SERVER_URL

function App() {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)

  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        await getCurrentUser(dispatch)
      } catch (err) {
        console.log("User fetch failed")
      } finally {
        setAuthLoading(false)
      }
    }

    loadUser()
  }, [dispatch])

  // ✅ Global loader
  if (authLoading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 500
      }}>
        Loading user…
      </div>
    )
  }

  return (
    <Routes>
      {/* Public */}
      <Route
        path='/auth'
        element={userData ? <Navigate to="/" /> : <Hero />}
      />

      {/* Protected */}
      <Route
        path='/'
        element={userData ? <Home /> : <Navigate to="/auth" />}
      />
      <Route
        path='/create-note'
        element={userData ? <Notes /> : <Navigate to="/auth" />}
      />
      <Route
        path='/my-notes'
        element={userData ? <History /> : <Navigate to="/auth" />}
      />
      <Route
        path='/notes/:id'
        element={userData ? <Current /> : <Navigate to="/auth" />}
      />
      <Route
        path='/dashboard'
        element={userData ? <Price /> : <Navigate to="/auth" />}
      />

      {/* Payment routes */}
      <Route path='/cancel' element={<PamentCancel />} />
      <Route path='/success' element={<PametSuccess />} />
    </Routes>
  )
}

export default App;