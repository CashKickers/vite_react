import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'

const Splash = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 2000) // 2초 후 로그인 페이지로 이동

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div style={{
      background: '#FEF8ED',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img 
        src={logo} 
        alt="Logo" 
        style={{
          width: '80vw',
          height: 'auto'
        }}
      />
    </div>
  )
}

export default Splash 