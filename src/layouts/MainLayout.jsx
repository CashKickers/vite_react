import { NavBar } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

// SVG를 일반 이미지로 import
import DetailsCheckIcon from '@/assets/Details_check.svg'
import DetailsUncheckIcon from '@/assets/Details_uncheck.svg'
import MapCheckIcon from '@/assets/map_check.svg'
import MapUncheckIcon from '@/assets/map_uncheck.svg'
import StarCheckIcon from '@/assets/star_check.svg'
import StarUncheckIcon from '@/assets/Star_uncheck.svg'

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  return (
    <div className="all-area">
      <div className="body-area">
        <Outlet />
      </div>
      <div className="bottom-area">
        <div className="nav-container">
          <div 
            className="nav-item" 
            onClick={() => navigate('/details')}
          >
            <img 
              src={pathname === '/details' ? DetailsCheckIcon : DetailsUncheckIcon} 
              alt="details" 
              className="nav-icon" 
            />
            <span className="nav-text">Details</span>
          </div>
          <div 
            className="nav-item"
            onClick={() => navigate('/map')}
          >
            <img 
              src={pathname === '/map' ? MapCheckIcon : MapUncheckIcon} 
              alt="map" 
              className="nav-icon" 
            />
            <span className="nav-text">Map</span>
          </div>
          <div 
            className="nav-item"
            onClick={() => navigate('/my')}
          >
            <img 
              src={pathname === '/my' ? StarCheckIcon : StarUncheckIcon} 
              alt="my" 
              className="nav-icon" 
            />
            <span className="nav-text">My</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout 