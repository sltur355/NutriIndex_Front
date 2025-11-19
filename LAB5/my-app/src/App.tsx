import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BiomarkersPage from './pages/BiomarkersPage'
import BiomarkerDetailPage from './pages/BiomarkerDetailPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/biomarkers" element={<BiomarkersPage />} />
          <Route path="/biomarkers/:id" element={<BiomarkerDetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App