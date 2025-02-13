import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useState, useEffect } from "react"

import markerUpIcon from '../assets/marker-up.svg'
import markerCommonIcon from '../assets/marker-common.svg'
import markerDownIcon from '../assets/marker-down.svg'

const KakaoMap = () => {
  const [result, setResult] = useState("")
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  })

  const [map, setMap] = useState(null) // 지도 객체 저장
  const [bounds, setBounds] = useState(null) // 지도 영역 정보 저장

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

  // 지도 이동 시 getBounds() 호출
  const handleBoundsChanged = (map) => {
    const newBounds = map.getBounds()
    setBounds(newBounds)
    console.log("지도 영역 변경됨:", bounds)
  }

  // 지도가 생성된 후 실행
  useEffect(()=> {
    if (!map) return

    // 지도 객체가 존재하면 getBounds 호출 가능
    if (!map) return

    // 지도의 현재 영역
    const bounds = map.getBounds()
    setBounds(bounds)
    console.log("현재 지도 영역: ", bounds);
  }, [map])

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
        onCreate={setMap} // 지도가 생성되면 state에 저장
        onBoundsChanged={handleBoundsChanged} // 지도 이동 시 bounds 값 갱신
      >
        {/* api에서 불러온 값을 아래와 같이 표현 / 변수명.map(position => { .. }) 이용 */}
        <MapMarker
          position={{
            // 마커가 표시될 위치
            lat: center.lat,
            lng: center.lng,
          }}
          image={{
            src: markerUpIcon,
            size: {
              width: 44,
              height: 52,
            }, // 마커이미지의 크기
          }}
        />
      </Map>
    </div>
  )
}

export default KakaoMap 