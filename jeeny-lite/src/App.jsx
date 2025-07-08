// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PassengerDashboard from './pages/PassengerDashboard'
import DriverDashboard from './pages/DriverDashboard'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/passenger" element={<PassengerDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
