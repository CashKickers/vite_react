import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useState, useEffect } from "react"
import { Input, Button } from 'antd-mobile'

import Modal from "../components/Modal"

import markerUpIcon from '../assets/marker-up.svg'
import markerCommonIcon from '../assets/marker-common.svg'
import markerDownIcon from '../assets/marker-down.svg'

import '../styles/global.css'

const KakaoMap = () => {
  const [result, setResult] = useState("")
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  })

  const [map, setMap] = useState(null) // 지도 객체 저장
  const [bounds, setBounds] = useState(null) // 지도 영역 정보 저장

  const [isModalOpen, setIsModalOpen] = useState(false) // 식당 간략 정보 모달 오픈 유무
  const [restaurantId, setRestaurantId] = useState(null)

  const [isResearchBtnShow, setIsResearchBtnShow] = useState(false) // 이 지역 재검색 버튼 show 유무

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

  // 식당 간략 정보 모달 관련 함수
  const onCloseModal = () => {
    setIsModalOpen(false)
    setRestaurantId(null)
  }
  const onClickMarker = () => {
    setIsModalOpen(true)
    setRestaurantId(1); // api 불러오는 것에 따라 다르게 설정
  }
  
  // setIsResearchBtnShow(ture) 할 로직 구현
  // map-research-btn 클릭 시 로직 구현 -> api 불러서 마커 새로 뿌려야함 & setIsResearchBtnShow(false)

  return (
    <div className="map-container">
      <Input className="map-search" placeholder="식당명 검색" />
      {
        isResearchBtnShow ? (
          <Button
            block
            shape='rounded'
            className='map-research-btn'
          >이 지역 재검색</Button>
        ) : null
      }
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
        <Modal isOpen={isModalOpen} onClose={onCloseModal} id={restaurantId} />
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
          clickable={true} // 마커를 클릭 시, 지도의 클릭 이벤트가 발생 않게 함
          onClick={onClickMarker}
        />
      </Map>
    </div>
  )
}

export default KakaoMap 