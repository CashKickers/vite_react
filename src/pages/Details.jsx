import PropTypes from 'prop-types'

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Image } from 'antd-mobile'

import MyButton from '../components/MyButton'
import Review from '../components/Review'
import Tag from '../components/Tag';
import MyCustomChart from '../components/MyCustomChart';

import { restaurantApi } from '../api/restaurant'
import { reviewSummaryApi } from '../api/reviewSummary'
import { reviewsApi } from '../api/reviews'
import { graphYM } from '../api/graphYM'
import { graphY } from '../api/graphY'

import { useAppSelector } from "../store/hooks";

import btnBackIcon from '../assets/btn-back.svg'
import addressIcon from '../assets/address.svg'
import flavorIcon from '../assets/flavor.svg'
import priceIcon from '../assets/price.svg'
import cleanIcon from '../assets/clean.svg'
import customerIcon from '../assets/customer.svg'
import moodIcon from '../assets/mood.svg'

import '../styles/global.css'
import '../styles/detail.css'

const Details = ( { id = null } ) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { state } = location;

  // redux
  const selectedId = useAppSelector(state => state.restaurant.selectedRestaurantId); // 현재 선택 식당 아이디값
  const selectedCategories = useAppSelector((state) => state.review.selectedCategories);

  const restaurantId = id !== null ? id : selectedId; // 선택된 식당 아이디
  const [isSelected, setIsSelected] = useState(false); // 선택된 식당이 my에 저장되어 있는지 확인

  // 식당 기본 정보
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [imageLinks, setImageLinks] = useState([]);
  // 리뷰 추세 버튼
  const [isMonth, setIsMonth] = useState(true);
  // 리뷰 변화
  const [yMGraphDate, setYMGraphDate] = useState([]);
  const [yMPositive, setYMPositive] = useState([]);
  const [yMNegative, setYMNegative] = useState([]);
  const [yGraphDate, setYGraphDate] = useState([]);
  const [yPositive, setYPositive] = useState([]);
  const [yNegative, setYNegative] = useState([]);
  // 리뷰 요약
  const reviewSumIcons = {
    '맛': flavorIcon,
    '가격': priceIcon,
    '청결도': cleanIcon,
    '고객응대': customerIcon,
    '분위기': moodIcon
  };
  const [reviewSums, setReviewSums] = useState([{ type: '', icon: '', content: ''}]);

  // 상세 리뷰 카테고리
  const [reviewCategories, setReviewCategories] = useState({
    flavor: { type: '맛', selected: false, },
    price: { type: '가격', selected: false, },
    clean: { type: '청결도', selected: false, },
    customer: { type: '고객응대', selected: false, },
    mood: { type: '분위기', selected: false, },
  })
  const [reviews, setReviews] = useState([{id: '', user_code: '', contents: '', write_date: '', categories: ''}])

  // 뒤로 가기 버튼
  const onClickBackBtn = () => {
    if (state === null)
      navigate('/map')
    else if (state.from == 'map')
      navigate('/map', {state: {modalOpen: true}})
    else if (state.from == 'my')
      navigate('/my')
  }

  // api
  // - 식당 정보
  const loadRestaurant = async () => {
    try {
      const data = await restaurantApi({ id: restaurantId }); // Call the function with the correct parameters
      console.log("restaurant: ", data);

      if (data && restaurantId === data.id) {
        setName(data.name);
        setAddress(data.address);
        setImageLinks(data.images);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };
  // - 그래프
  const loadYMGraphData = async () => {
    try {
        const data = await graphYM({ id: restaurantId }); // Call the function with the correct parameters
        console.log(data);

        if (data) {
            console.log(data)
            const dates = data.data.map(item => item.date);
            const positives = data.data.map(item => item.positive);
            const negatives = data.data.map(item => item.negative);

            console.log(dates, positives, negatives)

            setYMGraphDate(dates);
            setYMPositive(positives);
            setYMNegative(negatives);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
  }
  const loadYGraphData = async () => {
    try {
        const data = await graphY({ id: restaurantId }); // Call the function with the correct parameters
        console.log(data);

        if (data) {
            console.log(data)
            const dates = data.data.map(item => item.date);
            const positives = data.data.map(item => item.positive);
            const negatives = data.data.map(item => item.negative);

            console.log(dates, positives, negatives)

            setYGraphDate(dates);
            setYPositive(positives);
            setYNegative(negatives);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
  }
  // - 리뷰 요약
  const loadReviewSummary = async () => {
    try {
      const data = await reviewSummaryApi({ id: restaurantId });
      console.log("review summary: ", data);

      if (data && data.length > 0  && restaurantId === data[0].retaurant_id) {
        const reviewSumData = data.map(value => (
          {
            type: value.category,
            icon: reviewSumIcons[value.category],
            content: value.contents,
          }
        ))
        setReviewSums(reviewSumData);
      }
      else if (data.length === 0) {
        setReviewSums([]);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
    }
  }
  // - 상세 리뷰
  const loadReviews = async () => {
    try {
      const data = await reviewsApi({ id: restaurantId });
      console.log("all reviews: ", data);

      if (data && data.length > 0 && restaurantId === data[0].retaurant_id) {
        const reviewData = data.map(value => (
          {
            id: value.id,
            user_code: value.user_code,
            contents: value.contents,
            write_date: value.write_date,
            categories: value.categories,
          }
        ))
        setReviews(reviewData);
      }
      else if (data.length === 0) {
        setReviews([]);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
    }
  }

  useEffect(()=> {
    loadRestaurant()
    loadReviewSummary()
    loadYMGraphData()
    loadYGraphData()
    loadReviews()
  }, [])

  // 로컬 스토리지에 있는 값 들고오기
  useEffect(() => {
    const myInLocal = localStorage.getItem('my');
    if (myInLocal) {
      try {
        const parsedList = JSON.parse(myInLocal);
        console.log(parsedList, parsedList.includes(selectedId));
        
        // parsedList가 배열인 경우
        if (Array.isArray(parsedList) && parsedList.includes(selectedId)) {
          console.log('change true!');
          setIsSelected(true);
        }
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
      }
    }
  }, [])

  const [filteredReviews, setFilteredReviews] = useState(reviews);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(
        reviews.filter(review => 
          review.categories.some(category => selectedCategories.includes(category))
        )
      );
    }
  }, [selectedCategories, reviews]);


  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: 'var(--bg-color)',
    }}>
    <div style ={{
      backgroundColor: 'var(--bg-color)',
      width: "100%",
      // height: "100%",
      height: "auto",
      padding: "20px 15px",
    }}>
      <div className="detail-header">
        <div className="detail-header-btn" onClick={onClickBackBtn}>
          <Image src={btnBackIcon} width="40px" />
        </div>
        <div className="detail-header-basicinfo">
          <div className="detail-header-name">
            {name}
          </div>
          <div className="detail-header-address">
            <Image src={addressIcon} width="13px" />
            <span style={{paddingLeft: "2px"}}>{address}</span>
          </div>
        </div>
        <div className="detail-header-btn">
          <MyButton setState={isSelected} id={restaurantId} />
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-content-images">
          <div className="detail-content-images-1">
            <Image src={imageLinks[0]} fit='fill' />
          </div>
          <div className="detail-content-images-2">
            <Image src={imageLinks[1]} fit='contain' />
            <Image src={imageLinks[2]} fit='contain' />
          </div>
        </div>

        {/* 리뷰 추세 그래프 */}
        <div className="detail-sub-content-title">
          리뷰 추세
        </div>
        <div className="detail-sub-content">
          {/* 버튼 */}
          <div style={{
            display: "flex",
          }}>
            <div className={`graph-btn-${isMonth ? 'active':'unactive'}`} onClick={()=>setIsMonth(true)}>월간</div>
            <div className={`graph-btn-${isMonth ? 'unactive':'active'}`} onClick={()=>setIsMonth(false)}>연간</div>
          </div>
          {/* 그래프 모듈 */}
          <div className="detail-sub-content-descript"><span style={{color:"#EDC55B"}}>ㅡ</span> 긍정 <span style={{color:"black"}}>ㅡ</span> 부정</div>
          <div className="detail-sub-content-descript">(단위: %)</div>
          {
            isMonth ? (
              <MyCustomChart date={yMGraphDate} positive={yMPositive} negative={yMNegative} />
            ) : (
              <MyCustomChart date={yGraphDate} positive={yPositive} negative={yNegative} />
            ) 
          }
        </div>

        {/* 리뷰 요약 정보 */}
        <div className="detail-sub-content-title">
          AI 리뷰 요약
        </div>
        <div className="detail-sub-content-descript">* 사용자 리뷰 전체를 생성형 AI가 요약한 자료입니다</div>
        <div className="detail-sub-content">
          {reviewSums.length > 0 ? (
            reviewSums.map((review) => (
                <div className='detail-content-reviews-sum' key={review.type}>
                    <Image src={review.icon} width={25} />
                    <div className='detail-content-reviews-sum-content'>
                        {review.content}
                    </div>
                </div>
            ))
          ) : (
            <div style={{textAlign: "center", padding: "5px 10px"}}>
              맛, 가격, 청결도, 고객응대, 분위기와 관련된 리뷰가 부족합니다.
            </div>
          )}
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
          {/* {reviews.length > 0 ? (
            reviews.map(review => (
              <Review
                key={review.id}
                userName={review.user_code}
                tags={review.categories}
                content={review.contents}
                date={review.write_date}
              />
            ))
          ) : (
            <div style={{textAlign: "center", padding: "5px 10px"}}>
              상세 리뷰가 없습니다.
            </div>
          )} */}
          {filteredReviews.length > 0 ? (
            filteredReviews.map(review => (
              <Review
                key={review.id}
                userName={review.user_code}
                tags={review.categories}
                content={review.contents}
                date={review.write_date}
              />
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "5px 10px" }}>
              선택된 카테고리에 해당하는 리뷰가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

Details.propTypes = {
  id: PropTypes.number,
}

export default Details 