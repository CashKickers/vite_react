import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd-mobile'

import MyButton from '../components/MyButton';

import moreIcon from '../assets/more.svg'

import '../styles/my.css'

const MyPage = () => {
  const navigate = useNavigate();

  // localstorage에 저장된 값 불러와서 처리하기
  const [myList, setMyList] = useState([]);

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
      <div className="my-content">
        <Image 
          src={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JTIzaW1hZ2V8ZW58MHx8MHx8fDA%3D"}
          width={65}
          height={65}
          fit='cover'
          style ={{
            flex: 1,
            borderRadius: 8
          }}
        />
        <div className="my-content-info">
          <div className="my-content-name">
            이름
          </div>
          <div className="my-content-address">
            주소
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
          style = {{
            flex: 1,
          }}
        />
      </div>
    </div>
  )
}

export default MyPage 