import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.jsx'
import koKR from 'antd-mobile/es/locales/ko-KR'
import { ConfigProvider } from 'antd-mobile'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ConfigProvider locale={koKR}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  // </StrictMode>,
)
