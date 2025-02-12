import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import google from '@/assets/google.png'
import naver from '@/assets/naver.png'
import kakao from '@/assets/kakao.png'

const Login = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      background: '#FEF8ED',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{ position: 'absolute', top: '25%'}}>
        <img 
          src={logo} 
          alt="Logo" 
          style={{
            width: '80vw',
            height: 'auto'
          }}
        />
      </div>

      <div style={{
        width: '100%',
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: 'auto',
        justifyContent: 'flex-end',
        marginBottom: '25%'
      }}>
        <div 
          onClick={() => navigate('/map')}
        >
          <img src={google} alt="Google" style={{ width: '100%' }} />
        </div>
        <div 
          onClick={() => navigate('/map')}
        >
          <img src={naver} alt="Naver" style={{ width: '100%' }} />
        </div>
        <div 
          onClick={() => navigate('/map')}

        >
          <img src={kakao} alt="Kakao" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  )
}

export default Login 