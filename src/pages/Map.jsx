import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk"
import { useState, useEffect } from "react"
import { Input, Button } from 'antd-mobile'
import { useLocation } from 'react-router-dom'

import Modal from "../components/Modal"

import markerUpIcon from '../assets/marker-up.svg'
import markerCommonIcon from '../assets/marker-common.svg'
import markerDownIcon from '../assets/marker-down.svg'

import { mapApi as fetchMapData } from '../api/map'

import '../styles/global.css'

const KakaoMap = ( ) => {
  const location = useLocation();
  const { state } = location;

  const [result, setResult] = useState("")
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  })

  const [map, setMap] = useState(null) // 지도 객체 저장
  const [bounds, setBounds] = useState(null) // 지도 영역 정보 저장

  const [isModalOpen, setIsModalOpen] = useState(state?.modalOpen || false) // 식당 간략 정보 모달 오픈 유무
  const [restaurantId, setRestaurantId] = useState(state?.modalId || null)
  const [isRestaurantMy, setIsRestaurnatMy] = useState(false)

  const [isResearchBtnShow, setIsResearchBtnShow] = useState(false) // 이 지역 재검색 버튼 show 유무

  const [markers, setMarkers] = useState([]) // marker 정보 저장
                                             // lat, lng, type, id (식당 아이디) 저장 필요
  const [positions, setPositions] = useState([]);
  // api 호출 함수
  const loadRestaurants = async () => {
    // bounds 객체가 null 또는 undefined인지 확인
    if (!bounds) {
      console.error('Bounds 객체가 올바르게 정의되지 않았습니다.', bounds);
      return;
    }

    const min_lat = bounds.getSouthWest().getLat();
    const min_lng = bounds.getSouthWest().getLng();
    const max_lat = bounds.getNorthEast().getLat();
    const max_lng = bounds.getNorthEast().getLng();

    console.log('api 호출: ', min_lat, min_lng, max_lat, max_lng);

    try {
      const data = await fetchMapData({ min_lat, min_lng, max_lat, max_lng }); // Call the function with the correct parameters
      console.log(data);

      if (data) {
        setMarkers(data); // 마커 데이터 업데이트
        setIsResearchBtnShow(false); // 데이터가 로드되면 버튼 숨김
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    // 현재 위치 가져오기
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

    console.log(isModalOpen, restaurantId);
  }, [])

  // 지도 이동 시 getBounds() 호출
  const handleBoundsChanged = (map) => {
    const newBounds = map.getBounds()
    setBounds(newBounds)
    console.log("지도 영역 변경됨:", bounds)
  }

  // 지도가 생성된 후 실행
  useEffect(()=> {

    // 지도 객체가 존재하면 getBounds 호출 가능
    if (!map) return

    // 지도의 현재 영역
    const bounds = map.getBounds()
    setBounds(bounds)
    console.log("현재 지도 영역: ", bounds);
  }, [map])

  // bounds 값이 변경될 때마다 loadRestaurants 함수 호출
  useEffect(() => {
    if (!bounds) return;

    loadRestaurants();
  }, [bounds]);

  useEffect(()=> {
    console.log(markers)
  }, [markers])

  // 식당 간략 정보 모달 관련 함수
  const onCloseModal = () => {
    setIsModalOpen(false)
    setRestaurantId(null)
    setIsRestaurnatMy(null)
  }
  const onClickMarker = (id) => {
    setIsModalOpen(true)
    setRestaurantId(id); // api 불러오는 것에 따라 다르게 설정

    console.log("모달이 열렸을 때 id:", id, isRestaurantMy);
    console.log("현재 localStorage my 값:", localStorage.getItem('my'));
    
    const myList = localStorage.getItem('my'); // 로컬스토리지에서 가져옴
    if (myList) {
        try {
            const parsedSet = new Set(JSON.parse(myList));
            console.log(parsedSet);
            console.log(parsedSet.has(id));
            setIsRestaurnatMy(parsedSet.has(id)); // 수정: parsedSet.has(id)를 정확히 반영
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
        }
    } else {
      setIsRestaurnatMy(false);
    }
  }
  
  // setIsResearchBtnShow(ture) 할 로직 구현
  // map-research-btn 클릭 시 로직 구현 -> api 불러서 마커 새로 뿌려야함 & setIsResearchBtnShow(false)


  const testMarker = [
    {id: 1, name: '이지현 정육점', contact: '112', address: '대구 어딘가', latitude: 33.45, longitude: 126.5698, },
  ]

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
        <Modal isOpen={isModalOpen} onClose={onCloseModal} id={restaurantId} my={isRestaurantMy}/>
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {/* api에서 불러온 값을 아래와 같이 표현 / markers.map(mark => { .. }) 이용 */}
          {/* <MapMarker
            // key={mark.id}
            position={{
              // 마커가 표시될 위치
              lat: center.lat, // mark.lat
              lng: center.lng, // mark.lng
            }}
            image={{
              src: markerUpIcon, // mark.type에 따라 다른 아이콘 설정
              size: {
                width: 44,
                height: 52,
              }, // 마커이미지의 크기
            }}
            clickable={true} // 마커를 클릭 시, 지도의 클릭 이벤트가 발생 않게 함
            onClick={() => onClickMarker(1)} // mark.id
          /> */}
          {markers.length > 0 ? (
            markers.map(mark => {
              console.log('마커 위치: ', mark.latitude, mark.longitude);
              console.log('마커 타입: ', typeof mark.latitude, typeof mark.longitude);
              return (
                <MapMarker
                  key={`${mark.id}-${mark.latitude}-${mark.longitude}`} // 고유 키로 설정
                  position={{ // 마커가 표시될 위치
                    lat: mark.latitude,
                    lng: mark.longitude,
                  }}
                  image={{
                    src: markerUpIcon, // mark.state_id에 따라 다른 아이콘 설정
                    size: {
                      width: 44,
                      height: 52,
                    }, // 마커이미지의 크기
                  }}
                  clickable={true} // 마커를 클릭 시, 지도의 클릭 이벤트가 발생 않게 함
                  zIndex={30}
                  onClick={() => onClickMarker(mark.id)}
                />
              )
            })
          ) : (
            <></>
          )}
        </MarkerClusterer>
      </Map>
    </div>
  )
}

export default KakaoMap 