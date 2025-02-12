import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Details from './pages/Details'
import Map from './pages/Map'
import MyPage from './pages/MyPage'
import Splash from './pages/Splash'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="details" element={<Details />} />
          <Route path="map" element={<Map />} />
          <Route path="my" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
