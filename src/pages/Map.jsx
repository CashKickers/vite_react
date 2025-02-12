import { Map } from "react-kakao-maps-sdk"
import { useState, useEffect } from "react"

const KakaoMap = () => {
  const [result, setResult] = useState("")
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  })

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }, [])

  return (
    <div className="map-container">
      <Map 
        id="map"
        center={center}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
        draggable={true}
        zoomable={true}
        disableDoubleClick={true}
        disableDoubleClickZoom={true}
        gestureEnable={true}
      />
    </div>
  )
}

export default KakaoMap 