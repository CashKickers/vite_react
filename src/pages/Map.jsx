import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk"
import { useState, useEffect } from "react"
import { Input, Button } from 'antd-mobile'
import { useLocation } from 'react-router-dom'

import Modal from "../components/Modal"

import markerUpIcon from '../assets/marker-up.svg'
import markerCommonIcon from '../assets/marker-common.svg'
import markerDownIcon from '../assets/marker-down.svg'

import { mapApi as fetchMapData } from '../api/map'

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectRestaurant, clearSelection } from "../store/restaurantSlice";

import '../styles/global.css'

const KakaoMap = ( ) => {
  const location = useLocation();
  const { state } = location;

  // redux
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(state => state.selectedRestaurantId);

  const [center, setCenter] = useState({
    lat: 37.5696765,
    lng: 126.9768121,
  })

  const [map, setMap] = useState(null) // 지도 객체 저장
  const [bounds, setBounds] = useState(null) // 지도 영역 정보 저장

  // const [isModalOpen, setIsModalOpen] = useState(state?.modalOpen || false) // 식당 간략 정보 모달 오픈 유무
  const [isModalOpen, setIsModalOpen] = useState(false) // 식당 간략 정보 모달 오픈 유무
  const [restaurantId, setRestaurantId] = useState(selectedId || null)
  const [isRestaurantMy, setIsRestaurantMy] = useState(false);

  const [isResearchBtnShow, setIsResearchBtnShow] = useState(false) // 이 지역 재검색 버튼 show 유무

  const [markers, setMarkers] = useState([]) // marker 정보 저장
                                             // lat, lng, type, id (식당 아이디) 저장 필요
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

  // 지도 이동 시 getBounds() 호출
  const handleBoundsChanged = (map) => {
    const newBounds = map.getBounds()
    setBounds(newBounds)
    console.log("지도 영역 변경됨:", bounds)
  }

  // useEffect(() => {
  //   // 현재 위치 가져오기
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCenter({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         })
  //       },
  //       (error) => {
  //         console.error('Geolocation error:', error)
  //       }
  //     )
  //   }

  //   console.log(isModalOpen, restaurantId);
  // }, [])

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

  useEffect(()=> {
    if (selectedId !== null) {
      dispatch(clearSelection(selectedId));
    }
  }, [selectedId])

  // 식당 간략 정보 모달 관련 함수
  const onCloseModal = () => {
    setIsModalOpen(false)
    setRestaurantId(null)
    setIsRestaurantMy(null)
  }

  const isMy = (id) => {
    const myList = localStorage.getItem('my'); // 로컬스토리지에서 가져옴
    if (myList) {
        try {
            const parsedSet = new Set(JSON.parse(myList));
            setIsRestaurantMy(parsedSet.has(id)); // 수정: parsedSet.has(id)를 정확히 반영
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
        }
    } else {
      setIsRestaurantMy(false);
    }
  }

  const onClickMarker = (id) => {
    setIsModalOpen(true)
    setRestaurantId(id); // api 불러오는 것에 따라 다르게 설정

    dispatch(selectRestaurant(id));
    isMy(id);
  }

  // useEffect(()=>{
  //   if (state && state.modalOpen) {
  //     setRestaurantId(selectedId)
  //     isMy(selectedId)
  //   }
  // }, [])
  
  // setIsResearchBtnShow(ture) 할 로직 구현
  // map-research-btn 클릭 시 로직 구현 -> api 불러서 마커 새로 뿌려야함 & setIsResearchBtnShow(false)

  const [searchValue, setSearchValue] = useState('');

  const handlePressEnter = () => {
    alert('추후 구현 예정')
    setSearchValue('')
  };

  return (
    <div className="map-container">
      <Input className="map-search" placeholder="식당명 검색" 
      
      value={searchValue}
      onChange={(value) => setSearchValue(value)}
      onEnterPress={handlePressEnter} // Enter 키를 눌렀을 때 이벤트 핸들러
      />
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
        {markers.length > 0 ? (
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={4} // 클러스터 할 최소 지도 레벨
        >
          {/* API에서 불러온 값을 아래와 같이 표현 / markers.map(mark => { .. }) 이용 */}
          {markers.map(mark => {
            // mark.state_id에 따라 다른 아이콘 설정
            const icon = mark.state_id === 1 || mark.state_id === 2 ? (markerUpIcon) : (mark.state_id === 3 ? (markerCommonIcon) : (markerDownIcon))
            return (
              <MapMarker
                key={`${mark.id}-${mark.latitude}-${mark.longitude}`} // 고유 키로 설정
                position={{ // 마커가 표시될 위치
                  lat: mark.latitude,
                  lng: mark.longitude,
                }}
                image={{
                  src: icon,
                  size: {
                    width: 44,
                    height: 52,
                  }, // 마커 이미지의 크기
                }}
                clickable={true} // 마커를 클릭 시, 지도의 클릭 이벤트가 발생 않게 함
                zIndex={30}
                onClick={() => onClickMarker(mark.id)}
              />
            );
          })}
        </MarkerClusterer>
      ) : (
        <></>
      )}
      </Map>
    </div>
  )
}

export default KakaoMap 