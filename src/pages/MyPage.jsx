import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd-mobile'

import MyButton from '../components/MyButton';

import { restaurantApi } from '../api/restaurant'

import moreIcon from '../assets/more.svg'

import '../styles/my.css'

const MyPage = () => {
  const navigate = useNavigate();

  // localstorage에 저장된 값 불러와서 처리하기
  const [myList, setMyList] = useState([]);

  // 식당 기본 정보
  const [restaurants, setRestaurants] = useState([]); // [{id: , name: , address: , image: ,}, ...]

  // api
  // - 식당 정보
  const loadRestaurant = async ( id ) => {
    try {
      const data = await restaurantApi({ id }); // Call the function with the correct parameters
      console.log("restaurant: ", data);

      if (data && id === data.id) {
        setRestaurants(prev => [
          ...prev, {
            id: data.id,
            name: data.name,
            address: data.address,
            image: data.images[0] || null,
          }
        ])
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  // 로컬 스토리지에 있는 값 들고오기
  useEffect(() => {
    const myInLocal = localStorage.getItem('my')
    console.log(myInLocal)
    if (myInLocal) {
      try {
        const parsedList = JSON.parse(myInLocal);
        setMyList(parsedList);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
      }
    }

    return () => {
      setMyList([])
      setRestaurants([])
    }
  }, [])

  useEffect(()=> {
    console.log(myList)
    if (myList.length > 0) {
      myList.forEach(my => {
        loadRestaurant(my);
      });
    }
  }, [myList])

  // 상세 페이지 이동
  const onClickMore = ( id ) => {
    if (navigate) navigate('/details', {state: { id: id, from: 'my'}})
  }

  return (
    <div style ={{
      backgroundColor: 'var(--bg-color)',
      width: "100%",
      height: "100%",
      padding: "20px 15px",
    }}>
      {/* myList 반복할 것 */}
      {restaurants.map((restaurant) => (
        <div className="my-content" key={restaurant.id}>
          <Image 
            src={restaurant.image}
            width={65}
            height={65}
            fit='cover'
            style ={{
              flex: 1.3,
              borderRadius: 8
            }}
          />
          <div className="my-content-info">
            <div className="my-content-name">
            {restaurant.name}
            </div>
            <div className="my-content-address">
            {restaurant.address}
            </div>
          </div>
          {/* 버튼: 상세 페이지로 이동 */}
          <div
            style ={{
              flex: 1,
            }}
            onClick = {() => onClickMore(1)} // item.key 등처럼 상황에 맞게 변경
          >
            <Image src={moreIcon} height={15} />
          </div>
          <MyButton
            setState='true'
            id = {restaurant.id}
            style = {{
              flex: 1,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default MyPage 