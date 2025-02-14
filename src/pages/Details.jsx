import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd-mobile'

import PropTypes from 'prop-types'

import MyButton from '../components/MyButton'
import Review from '../components/Review'
import Tag from '../components/Tag';

import btnBackIcon from '../assets/btn-back.svg'
import addressIcon from '../assets/address.svg'
import flavorIcon from '../assets/flavor.svg'
import priceIcon from '../assets/price.svg'
import cleanIcon from '../assets/clean.svg'
import customerIcon from '../assets/customer.svg'
import moodIcon from '../assets/mood.svg'

import '../styles/global.css'
import '../styles/detail.css'

const Details = ( { id } ) => {
  const navigate = useNavigate();

  // 리뷰 요약
  const reviewSumIcons = [
      {type: 'flavor', icon: flavorIcon},
      {type: 'price', icon: priceIcon},
      {type: 'clean', icon: cleanIcon},
      {type: 'customer', icon: customerIcon},
      {type: 'mood', icon: moodIcon}
  ];
  const [reviewSums, setReviewSums] = useState([{ type: '', icon: '', content: ''}]);

  // 상세 리뷰 카테고리
  const [reviewCategories, setReviewCategories] = useState({
    flavor: { type: '맛', selected: false, },
    price: { type: '가격', selected: false, },
    clean: { type: '위생', selected: false, },
    customer: { type: '고객응대', selected: false, },
    mood: { type: '분위기', selected: false, },
  })

  // 뒤로 가기 버튼
  const onClickBackBtn = () => {
    navigate('/map', {state: {modalOpen: true, modalId: id}})
  }

  return (
    <div style ={{
      backgroundColor: 'var(--bg-color)',
      width: "100%",
      height: "100%",
      padding: "20px 15px",
    }}>
      <div className="detail-header">
        <div className="detail-header-btn" onClick={onClickBackBtn}>
          <Image src={btnBackIcon} width="40px" />
        </div>
        <div className="detail-header-basicinfo">
          <div className="detail-header-name">
            식당 이름
          </div>
          <div className="detail-header-address">
            <Image src={addressIcon} width="13px" />
            <span style={{paddingLeft: "2px"}}>서울특별시 종로구 새문안로5가길 7 세종클럽 지하 1층</span>
          </div>
        </div>
        <div className="detail-header-btn">
          {/* my 상태에 따라 true/false 값 수정 */}
          <MyButton setState={false} /> 
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-content-images">
          <div className="detail-content-images-1">
            <Image src={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JTIzaW1hZ2V8ZW58MHx8MHx8fDA%3D"} fit='fill' />
          </div>
          <div className="detail-content-images-2">
            <Image src={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JTIzaW1hZ2V8ZW58MHx8MHx8fDA%3D"} fit='contain' />
            <Image src={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JTIzaW1hZ2V8ZW58MHx8MHx8fDA%3D"} fit='contain' />
          </div>
        </div>

        {/* 리뷰 추세 그래프 */}
        <div className="detail-sub-content-title">
          리뷰 추세
        </div>
        <div className="detail-sub-content">
          {/* 버튼 */}
          {/* 그래프 모듈 */}
        </div>

        {/* 리뷰 요약 정보 */}
        <div className="detail-sub-content-title">
          AI 리뷰 요약
        </div>
        <div className="detail-sub-content-descript">* 사용자 리뷰 전체를 생성형 AI가 요약한 자료입니다</div>
        <div className="detail-sub-content">
          {/* map 써서 뽑기 */}
          <div className='detail-content-reviews-sum'
          // key={type}
          >
            <Image src={flavorIcon} width="50px" style={{flex: 1}}/>
            <div className='detail-content-reviews-sum-content'>
            feat: Add page navigation (from summary modal to detail)
            feat: Add page navigation (from summary modal to detail)
            </div>
          </div>
        </div>

        {/* 상세 리뷰 */}
        <div className="detail-sub-content-title">
          상세 리뷰
        </div>
        <div className="detail-content-reviews">
          {/* 카테고리 나누기 */}
          <div className="detail-review-category">
            <div>카테고리</div>
            {Object.entries(reviewCategories).map(([key, value]) => (
              <Tag title={value.type} size="big" isCategory={true} selected={value.selected} key={key} />
            ))}
          </div>
          <hr style={{color: "#D6D6D6"}}/>
          {/* 사용자 리뷰 리스트 출력 */}
          <Review userName="사용자1" tags={['맛']} content="내용" date="2025.02.14" />
        </div>
      </div>
    </div>
  )
}

Details.propTypes = {
  id: PropTypes.number.isRequired,
}

export default Details 